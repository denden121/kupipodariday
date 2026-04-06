# Stage 1: Build
FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

RUN npm install -g pm2

COPY --from=builder /app/dist ./dist
COPY ecosystem.config.js ./

EXPOSE 4000

CMD ["pm2-runtime", "ecosystem.config.js"]
