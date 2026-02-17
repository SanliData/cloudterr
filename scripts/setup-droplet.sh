#!/usr/bin/env bash
# DigitalOcean Droplet üzerinde cloudtelc.com için tek seferlik kurulum.
# Kullanım:
#   Sunucuda proje klasöründeyken: ./scripts/setup-droplet.sh
#   Veya repo'yu clone edip kurulum: ./scripts/setup-droplet.sh https://github.com/KULLANICI/REPO.git
set -e

GIT_REPO="${1:-}"
APP_DIR="${APP_DIR:-/var/www/cloudtelc}"

# GIT_REPO verilmişse clone edip aynı script'i orada çalıştır
if [[ -n "$GIT_REPO" ]] && [[ "$GIT_REPO" =~ ^(https?|git@) ]]; then
  echo "[setup] Repo clone ediliyor: $GIT_REPO -> $APP_DIR"
  sudo mkdir -p "$(dirname "$APP_DIR")"
  if [[ -d "$APP_DIR/.git" ]]; then
    sudo chown -R "$USER" "$APP_DIR"
    (cd "$APP_DIR" && git fetch origin && git reset --hard origin/main)
  else
    sudo rm -rf "$APP_DIR"
    git clone --depth 1 -b main "$GIT_REPO" "$APP_DIR" || git clone --depth 1 "$GIT_REPO" "$APP_DIR"
  fi
  sudo chown -R "$USER" "$APP_DIR"
  cd "$APP_DIR"
  exec bash "./scripts/setup-droplet.sh"
fi

# Proje kökü (script scripts/ içinde)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"
APP_DIR="$ROOT_DIR"

echo "[setup] Uygulama dizini: $APP_DIR"

# Node.js 20.x
if ! command -v node &>/dev/null; then
  echo "[setup] Node.js kuruluyor..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "[setup] Node $(node -v)"

# Nginx
if ! command -v nginx &>/dev/null; then
  echo "[setup] Nginx kuruluyor..."
  sudo apt-get update
  sudo apt-get install -y nginx
  sudo systemctl enable nginx
fi

# PM2
if ! command -v pm2 &>/dev/null; then
  echo "[setup] PM2 kuruluyor..."
  sudo npm install -g pm2
fi

# Bağımlılıklar ve build (devDependencies gerekli: tailwindcss, postcss, autoprefixer)
echo "[setup] npm install & build..."
npm install
npm run build

# Nginx site config
echo "[setup] Nginx yapılandırılıyor..."
sudo cp "$ROOT_DIR/nginx/cloud-communications.conf" /etc/nginx/sites-available/cloud-communications
sudo ln -sf /etc/nginx/sites-available/cloud-communications /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# PM2 ile çalıştır
cd "$ROOT_DIR"
pm2 delete cloudtelc 2>/dev/null || true
pm2 start npm --name cloudtelc -- start
pm2 save
pm2 startup systemd -u "$USER" --hp "$HOME" 2>/dev/null || true

echo "[setup] Bitti. Site http://cloudtelc.com (DNS doğruysa) üzerinden yayında."
echo "[setup] SSL için: sudo certbot --nginx -d cloudtelc.com -d www.cloudtelc.com"
