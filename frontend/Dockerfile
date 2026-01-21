# ---------- build stage ----------
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

# ---------- runtime stage ----------
FROM nginx:alpine

ARG CACHE_BUST=1

# 🔴 REMOVE default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# ✅ COPY your nginx config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# ✅ COPY Angular build output
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
