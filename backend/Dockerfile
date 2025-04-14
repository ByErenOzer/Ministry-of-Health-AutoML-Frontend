# backend/Dockerfile.dev

FROM python:3.9-slim

# Çalışma dizinini ayarla
WORKDIR /app

# Gereksinim dosyasını kopyala ve bağımlılıkları yükle
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Geliştirme sırasında kodu volume ile monte edeceğiz, bu yüzden kodu kopyalamaya gerek yok
# COPY . .

# Uygulamanın çalıştırılacağı portu belirt
EXPOSE 8000

# Geliştirme ortamında root kullanıcısı ile çalışıyoruz (dosya izinleri sorununu önlemek için)
# Üretim ortamında normal bir kullanıcıya geçmelisiniz

# Uygulamayı başlat (hot-reloading etkin)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
