# 1. Node.js tabanlı imaj kullan
FROM node:20-alpine AS builder

# 2. Çalışma dizinini oluştur
WORKDIR /app

# 3. package.json ve lock dosyalarını kopyala
COPY package.json package-lock.json* ./

# 4. Bağımlılıkları yükle
RUN npm install --omit=dev

# 5. Uygulama dosyalarını kopyala
COPY . .

# 6. Prisma generate
RUN npx prisma generate

# 7. Next.js projesini build et
RUN npm run build

# 8. Çalışma ortamı için hafif bir Node.js imajı kullan
FROM node:20-alpine AS runner
WORKDIR /app

# 9. Node_modules ve build dosyalarını kopyala
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# 10. Uygulamayı başlat
CMD ["npm", "run", "start"]
