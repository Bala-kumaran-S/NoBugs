# ---------- build stage ----------
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

# ---------- runtime stage ----------
FROM nginx:alpine

# Force rebuilds when needed
ARG CACHE_BUST=1

# Copy Angular build output (matches angular.json)
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copy nginx config (NO templates, NO envsubst)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
