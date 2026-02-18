# Manuel deploy adımları

**Canlı site:** https://www.cloudtelc.com/  
**Git repo:** https://github.com/SanliData/cloudterr

GitHub Actions SSH ile bağlanamıyorsa, sunucuya kendin bağlanıp aşağıdaki adımları uygula. Bu yöntemle canlıya alındı; güncellemeler için aynı yol kullanılacak.

---

## Güncelleme rutini (kod değişince)

1. Değişiklikleri GitHub’a push et: `git push origin main`
2. Sunucuya bağlan: `ssh root@138.68.24.211`
3. Sunucuda tek komut:
   ```bash
   cd /var/www/cloudtelc && git fetch origin && git reset --hard origin/main && npm install && npm run build && pm2 restart cloudtelc
   ```
4. Tarayıcıda https://www.cloudtelc.com/ kontrol et.

---

## Ön koşul: Sunucuya bağlan

### Windows’ta OpenSSH İstemcisi kurulumu

PowerShell’de `ssh` tanınmıyorsa (The term 'ssh' is not recognized...), OpenSSH İstemcisi’ni şöyle ekle:

1. **Windows Ayarlar**’ı aç: `Win + I` veya Başlat → Ayarlar.
2. **Uygulamalar** → **İsteğe bağlı özellikler** (Optional features).
3. **Özellik ekle** (Add a feature) butonuna tıkla.
4. Listede **OpenSSH İstemcisi** (OpenSSH Client) ara, seç, **Yükle** (Install).
5. Kurulum bitince **PowerShell’i kapatıp yeniden aç**.
6. Test et:
   ```powershell
   ssh -V
   ```
   Sürüm bilgisi görünüyorsa hazırsın.

**Alternatif (Komut satırından):** Yönetici olarak PowerShell açıp:
   ```powershell
   Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
   ```

---

Windows’ta **PowerShell** veya **Git Bash** aç:

```bash
ssh root@SUNUCU_IP
```

(SUNUCU_IP yerine 138.68.24.211 yaz. Şifre veya key ile giriş yapacaksın.)

Bağlandıktan sonra aşağıdaki komutların hepsi **sunucuda** çalışacak.

---

## Adım 1: Proje klasörü var mı?

```bash
ls -la /var/www/cloudtelc
```

- **Klasör yoksa** → Adım 2’ye geç (clone).
- **Klasör varsa** → Adım 3’e geç (güncelleme).

---

## Adım 2: İlk kez kurulum (klasör yoksa)

```bash
# Klasörü oluştur
sudo mkdir -p /var/www/cloudtelc
sudo chown $USER:$USER /var/www/cloudtelc

# Repo'yu clone et
cd /var/www/cloudtelc
git clone https://github.com/SanliData/cloudterr.git .

# Bağımlılıkları kur ve build al
npm install
npm run build
```

**Node.js yoksa** (örn. `node: command not found`):

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Sonra tekrar:

```bash
cd /var/www/cloudtelc
npm install
npm run build
```

**PM2 ile uygulamayı başlat (ilk kez):**

```bash
sudo npm install -g pm2
pm2 start npm --name "cloudtelc" -- start
pm2 save
pm2 startup
```

(`pm2 startup` çıktısında verilen komutu kopyalayıp çalıştır – açılışta otomatik başlasın diye.)

Bu adımdan sonra site `http://SUNUCU_IP:3000` üzerinde açılır (nginx yoksa).

---

## Adım 3: Güncelleme (proje zaten clone edilmişse)

Her yeni deploy için sunucuda sadece şunları çalıştır:

```bash
cd /var/www/cloudtelc

git fetch origin
git reset --hard origin/main

npm install
npm run build

pm2 restart cloudtelc
```

Bitti. Site güncel koda göre yeniden çalışır.

---

## Adım 4: Nginx (isteğe bağlı – 80/443 portu)

Siteyi 80 (HTTP) veya 443 (HTTPS) portunda yayınlamak için:

```bash
sudo apt-get update
sudo apt-get install -y nginx

sudo cp /var/www/cloudtelc/nginx/cloud-communications.conf /etc/nginx/sites-available/cloud-communications
sudo ln -sf /etc/nginx/sites-available/cloud-communications /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

sudo nginx -t
sudo systemctl reload nginx
```

`server_name` satırını kendi domain’ine göre düzenle (örn. `cloudtelc.com`).

---

## Özet: Sadece güncelleme yaparken

Sunucuya SSH ile bağlandıktan sonra:

```bash
cd /var/www/cloudtelc && git fetch origin && git reset --hard origin/main && npm install && npm run build && pm2 restart cloudtelc
```

Tek satırda da çalıştırabilirsin.

---

## GitHub Actions SSH hatası giderme

Hata: `ssh: handshake failed: unable to authenticate, attempted methods [none publickey], no supported methods remain`

**Sebep:** GitHub’daki private key ile sunucudaki `authorized_keys` eşleşmiyor. appleboy/ssh-action sadece **public key** ile çalışır, şifre ile çalışmaz.

### Çözüm: Yeni key üretip eşleştir

**1. Bilgisayarında yeni SSH key üret**

```bash
ssh-keygen -t ed25519 -C "github-deploy" -f "$HOME/.ssh/cloudterr_deploy" -N ""
```

Oluşan dosyalar: `cloudterr_deploy` (private), `cloudterr_deploy.pub` (public).

**2. Public key’i sunucuya ekle**

Sunucuya (şifre veya mevcut key ile) bağlan:

```bash
ssh root@138.68.24.211
```

Sunucuda:

```bash
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
```

`cloudterr_deploy.pub` dosyasının **tüm içeriğini** (tek satır) yapıştır, kaydet. Sonra:

```bash
chmod 600 ~/.ssh/authorized_keys
```

**3. Private key’i GitHub Secret’a koy**

- Repo → **Settings** → **Secrets and variables** → **Actions**
- **SSH_PRIVATE_KEY** secret’ını düzenle (Update)
- `cloudterr_deploy` dosyasının **tam içeriğini** yapıştır (`-----BEGIN OPENSSH PRIVATE KEY-----` … `-----END OPENSSH PRIVATE KEY-----` dahil)
- Kaydet

**4. Diğer secret’lar**

- **SSH_HOST:** `138.68.24.211`
- **SSH_USER:** `root`

**5. Test**

- **Actions** → son workflow → **Re-run all jobs**

**Kontrol:** Bilgisayarında `ssh -i ~/.ssh/cloudterr_deploy root@138.68.24.211` ile bağlanabiliyorsan, GitHub Actions da aynı key ile bağlanır.
