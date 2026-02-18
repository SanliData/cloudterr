# cloudtelc.com — HTTPS (Secure) Yapılandırması

Siteyi "Not secure" uyarısından çıkarıp HTTPS ile güvenli hale getirmek için iki yol.

---

## 1. Cloudflare ile (önerilen — hemen)

DNS Cloudflare'da ve kayıtlar **Proxied** (turuncu bulut) ise:

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **cloudtelc.com** seçin.
2. Sol menüden **SSL/TLS** → **Overview**.
3. **Encryption mode** kısmında:
   - **Full** seçin → Tarayıcı ile Cloudflare arası HTTPS, Cloudflare ile sunucu arası HTTP. Tarayıcıda hemen kilit (Secure) görünür.
   - İsterseniz sunucuda Let's Encrypt kurduktan sonra **Full (strict)** yapabilirsiniz.
4. **SSL/TLS** → **Edge Certificates** bölümünde:
   - **Always Use HTTPS** → On. Böylece `http://cloudtelc.com` otomatik `https://cloudtelc.com` adresine yönlenir.

Bu adımlardan sonra **https://cloudtelc.com** adresinde "Secure" görünür.

---

## 2. Sunucuda Let's Encrypt (isteğe bağlı)

Cloudflare **Full (strict)** kullanmak veya doğrudan sunucuya HTTPS ile bağlanmak istiyorsanız, Droplet'te sertifika kurun:

```bash
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d cloudtelc.com -d www.cloudtelc.com
```

E-posta girin, şartları kabul edin. Certbot nginx yapılandırmasını otomatik günceller (443, sertifika yolları, HTTP→HTTPS yönlendirme). Yenileme testi:

```bash
sudo certbot renew --dry-run
```

Sonrasında Cloudflare'da **SSL/TLS** → **Encryption mode** → **Full (strict)** seçebilirsiniz.
