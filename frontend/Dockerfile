# frontend/Dockerfile.dev

FROM node:18-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# Paket dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./

RUN npm install
RUN npm install framer-motion

# Geliştirme sırasında kodu volume ile monte edeceğiz
# COPY . .

# Uygulamanın çalıştırılacağı portu belirt
EXPOSE 3000

# Geliştirme sunucusunu başlat (hot-reloading etkin)
CMD ["npm", "run", "dev"]