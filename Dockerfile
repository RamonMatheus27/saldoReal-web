# =============================================================
# Stage 1: Build do Angular com Node + pnpm
# =============================================================
FROM node:20-alpine AS builder

# Números do WhatsApp injetados via --build-arg pelo CI/CD ou docker-compose
ARG WHATSAPP_BOT_NUMBER=5500000000000
ARG WHATSAPP_SUPPORT_NUMBER=5500000000001

RUN npm install -g pnpm@10.29.3

WORKDIR /app

# Copia apenas manifests primeiro para aproveitar o cache do Docker
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copia o restante do código-fonte
COPY . .

# Injeta os números no environment de produção antes do build
RUN sed -i "s/__WHATSAPP_BOT_NUMBER__/${WHATSAPP_BOT_NUMBER}/g" \
      src/environments/environment.prod.ts && \
    sed -i "s/__WHATSAPP_SUPPORT_NUMBER__/${WHATSAPP_SUPPORT_NUMBER}/g" \
      src/environments/environment.prod.ts

# Build de produção (usa environment.prod.ts via fileReplacements)
RUN pnpm ng build --configuration production

# =============================================================
# Stage 2: Servir os arquivos estáticos com nginx
# =============================================================
FROM nginx:1.27-alpine AS runtime

# Remove a config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa config customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o build gerado pelo stage anterior
COPY --from=builder /app/dist/saldoreal-web/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
