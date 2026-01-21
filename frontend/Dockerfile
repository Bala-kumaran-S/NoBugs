# ---------- build stage ----------
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

# ---------- runtime stage ----------
FROM nginx:alpine

# Copy nginx config as TEMPLATE so env vars work
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy Angular build output (based on your angular.json)
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# --- DEBUG: show files we actually copied ---
RUN echo "==== Contents of /usr/share/nginx/html ====" \
 && ls -la /usr/share/nginx/html \
 && echo "========================================"

EXPOSE 8080

# --- DEBUG ENTRYPOINT ---
CMD sh -c '\
  echo "===== RUNTIME DEBUG START ====="; \
  echo "PORT=$PORT"; \
  echo "NGINX CONFIG AFTER SUBSTITUTION:"; \
  nginx -T; \
  echo "===== STARTING NGINX ====="; \
  nginx -g "daemon off;" \
'
