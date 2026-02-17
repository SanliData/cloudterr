# DigitalOcean üzerinde cloudtelc.com ile yayınlama

Bu rehber, uygulamayı [DigitalOcean](https://cloud.digitalocean.com) üzerinde **cloudtelc.com** domain’i ile yayınlamanız için adım adım talimatları içerir.

---

## Önemli: Komutlar nerede çalışır?

Aşağıdaki **kurulum komutları** (`curl`, `cd /var/www/...`, `./scripts/setup-droplet.sh`) **Linux sunucuda** (DigitalOcean Droplet içinde) çalıştırılır. **Windows PowerShell’de çalışmaz** (PowerShell’de `curl` farklıdır, `/var/www` yolu yoktur, `.sh` script’i çalışmaz).

**Windows’tan yapmanız gerekenler:**

1. DigitalOcean’da bir **Droplet** oluşturun (Ubuntu 22.04).
2. **PowerShell**’de sunucuya bağlanın:
   ```powershell
   ssh root@DROPLET_IP
   ```
   *(DROPLET_IP yerine kendi sunucu IP’nizi yazın.)*
3. Bağlandıktan sonra komut satırı **Linux** olacaktır (`root@droplet:~#` gibi). **Bundan sonra** aşağıdaki “Otomatik kurulum” komutlarını bu Linux oturumunda çalıştırın.

---

## Otomatik kurulum (tek komut) — Sunucuda (Linux)

Droplet’e SSH ile bağlandıktan sonra, **sunucuda** tek komutla kurulum yapabilirsiniz (Node.js, nginx, PM2, build, nginx config hepsi otomatik):

```bash
# Repo’yu clone edip kur (GIT_REPO’yu kendi GitHub repo URL’inizle değiştirin)
curl -sSL https://raw.githubusercontent.com/SanliData/cloudterr/main/scripts/setup-droplet.sh | sudo bash -s -- https://github.com/SanliData/cloudterr.git
```

Veya sunucuda proje zaten varsa (git clone ile aldıysanız), proje klasörüne girip:

```bash
cd /var/www/cloudtelc   # veya projenin olduğu dizin
./scripts/setup-droplet.sh
```

Bundan sonra DNS’i Droplet IP’ye yönlendirdiyseniz site yayında olur.

---

## Otomatik deploy (her push’ta)

Repo GitHub’daysa, **main** branch’e her push’ta sunucu otomatik güncellenir (`.github/workflows/deploy.yml`).

**Bir kez yapmanız gereken:** GitHub repo → Settings → Secrets and variables → Actions → şu secret’ları ekleyin:

| Secret adı        | Değer |
|-------------------|--------|
| `SSH_HOST`        | Droplet IP (örn. `164.92.xxx.xxx`) |
| `SSH_USER`        | SSH kullanıcı adı (örn. `root`) |
| `SSH_PRIVATE_KEY` | Sunucuya bağlanmak için kullandığınız SSH private key’in **tüm içeriği** |

Sunucuda `/var/www/cloudtelc` bu repo’nun clone’u olmalı ve `scripts/setup-droplet.sh` ile en az bir kez kurulum yapılmış olmalı. Sonrasında her `git push origin main` deploy’u tetikler.

---

## 1. Domain’i DigitalOcean’a bağlama

1. [DigitalOcean Networking → Domains](https://cloud.digitalocean.com/networking/domains) sayfasına gidin.
2. **cloudtelc.com** domain’inizi ekleyin veya zaten ekliyse düzenleyin:
   - [Domains – cloudtelc.com](https://cloud.digitalocean.com/networking/domains/cloudtelc.com)
3. Domain’in **nameserver**’larını, domain satıcınızda (GoDaddy, Namecheap, vb.) DigitalOcean’ın verdiği NS kayıtlarına yönlendirin:
   - Örnek: `ns1.digitalocean.com`, `ns2.digitalocean.com`, `ns3.digitalocean.com`

---

## 2. DNS kayıtları (Droplet IP’ye yönlendirme)

Aynı Domains sayfasında **cloudtelc.com** için şu kayıtları ekleyin veya güncelleyin:

| Type | Hostname | Value | TTL |
|------|----------|--------|-----|
| **A**  | `@`   | **Droplet’inizin IP adresi** | 3600 |
| **A**  | `www` | **Droplet’inizin IP adresi** | 3600 |
| **CNAME** (opsiyonel) | `www` | `@` (root’a yönlendirir) | 3600 |

- **@** = cloudtelc.com  
- **www** = www.cloudtelc.com  

Droplet henüz yoksa önce bir Droplet oluşturup IP’yi alın, sonra bu A kayıtlarında o IP’yi kullanın.

---

## 3. Droplet oluşturma ve kurulum

### 3.1 Droplet oluşturma

- **Image:** Ubuntu 22.04 LTS
- **Plan:** Basic, en az 1 GB RAM (Next.js build için 2 GB önerilir)
- **Datacenter:** İstediğiniz bölge (örn. New York, Frankfurt)
- **Authentication:** SSH key veya password

Oluşturduktan sonra **Droplet IP adresini** not edin; DNS A kayıtlarında kullanacaksınız.

### 3.2 Sunucuya bağlanma

```bash
ssh root@DROPLET_IP
```

### 3.3 Node.js (LTS) kurulumu

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v   # v20.x
npm -v
```

### 3.4 Nginx kurulumu

```bash
sudo apt-get update
sudo apt-get install -y nginx
sudo systemctl enable nginx
```

### 3.5 Uygulama dizini ve proje

```bash
sudo mkdir -p /var/www/cloudtelc
sudo chown $USER:$USER /var/www/cloudtelc
cd /var/www/cloudtelc
```

Projeyi buraya kopyalayın (Git ile örnek):

```bash
git clone https://github.com/SanliData/cloudterr.git .
# veya rsync / scp ile bilgisayarınızdan yükleyin
```

### 3.6 Build ve production çalıştırma (PM2 ile)

```bash
cd /var/www/cloudtelc
npm install
npm run build
```

PM2 ile sürekli çalıştırma:

```bash
sudo npm install -g pm2
pm2 start npm --name "cloudtelc" -- start
pm2 save
pm2 startup   # açılışta otomatik başlatma (komutu çıktıda verilen gibi çalıştırın)
```

Next.js artık `http://127.0.0.1:3000` üzerinde çalışıyor olmalı.

### 3.7 Nginx yapılandırması (cloudtelc.com)

Projedeki nginx config’i sunucuya kopyalayıp etkinleştirin:

```bash
sudo cp /var/www/cloudtelc/nginx/cloud-communications.conf /etc/nginx/sites-available/cloud-communications
sudo ln -s /etc/nginx/sites-available/cloud-communications /etc/nginx/sites-enabled/
# Varsayılan site varsa devre dışı bırakın
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Tarayıcıda **http://cloudtelc.com** ve **http://www.cloudtelc.com** adreslerini açıp kontrol edin.

---

## 4. HTTPS (SSL) – Let’s Encrypt

Ücretsiz SSL için Certbot kullanın:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d cloudtelc.com -d www.cloudtelc.com
```

Sorguları yanıtlayın (e-posta, şartları kabul). Certbot nginx config’ini otomatik güncelleyecektir. Yenileme testi:

```bash
sudo certbot renew --dry-run
```

Bu adımlardan sonra site **https://cloudtelc.com** ve **https://www.cloudtelc.com** üzerinden yayında olur.

---

## 5. Güncelleme (yeni deploy)

- **GitHub Actions kullanıyorsanız:** Sadece `git push origin main` yeterli; deploy otomatik çalışır.
- **Elle güncelleme:** Sunucuda:

```bash
cd /var/www/cloudtelc
git pull
npm install
npm run build
pm2 restart cloudtelc
```

---

## Özet kontrol listesi

- [ ] DigitalOcean’da [cloudtelc.com](https://cloud.digitalocean.com/networking/domains/cloudtelc.com) domain’i ekli
- [ ] Domain nameserver’ları DigitalOcean’a yönlendirildi
- [ ] A kayıtları: `@` ve `www` → Droplet IP
- [ ] Droplet’te Node.js, nginx, PM2 kuruldu
- [ ] Proje `/var/www/cloudtelc` içinde, `npm run build` ve `pm2 start` çalışıyor
- [ ] Nginx `nginx/cloud-communications.conf` ile yapılandırıldı
- [ ] İsteğe bağlı: Certbot ile HTTPS açıldı

Sorun olursa: `pm2 logs cloudtelc` ve `sudo tail -f /var/log/nginx/error.log` ile loglara bakın.
