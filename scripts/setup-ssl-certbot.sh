#!/usr/bin/env bash
# cloudtelc.com + www.cloudtelc.com için Let's Encrypt SSL (Certbot + Nginx).
# Sunucuda çalıştırın: sudo bash scripts/setup-ssl-certbot.sh
# İsteğe bağlı: CERTBOT_EMAIL=you@example.com ortam değişkeni verirseniz etkileşimsiz çalışır.
set -e

echo "[1/8] System packages güncelleniyor..."
sudo apt-get update

echo "[2/8] Certbot ve nginx eklentisi kuruluyor..."
sudo apt-get install -y certbot python3-certbot-nginx

echo "[3/8] Nginx yapılandırması kontrol ediliyor..."
sudo nginx -t

echo "[4/8] Nginx durumu..."
sudo systemctl status nginx --no-pager || true

echo "[5/8] Certbot çalıştırılıyor (cloudtelc.com, www.cloudtelc.com)..."
if [[ -n "${CERTBOT_EMAIL:-}" ]]; then
  sudo certbot --nginx -d cloudtelc.com -d www.cloudtelc.com \
    --non-interactive --agree-tos -m "$CERTBOT_EMAIL"
else
  sudo certbot --nginx -d cloudtelc.com -d www.cloudtelc.com
fi

echo "[6/8] Nginx config tekrar kontrol ve reload..."
sudo nginx -t
sudo systemctl reload nginx

echo "[7/8] HTTPS yanıtı kontrol ediliyor..."
curl -sI https://cloudtelc.com | head -5

echo "[8/8] Otomatik yenileme testi (dry-run)..."
sudo certbot renew --dry-run

echo "SSL kurulumu tamamlandı. https://cloudtelc.com adresini kontrol edin."
