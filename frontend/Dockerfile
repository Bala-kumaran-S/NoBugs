# ---------- build ----------
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

# ---------- runtime ----------
FROM nginx:alpine

COPY nginx.conf /nginx.conf
COPY --from=build /app/dist/frontend /usr/share/nginx/html

EXPOSE 8080

CMD sh -c '\
  echo "PORT=$PORT"; \
  envsubst < /nginx.conf > /etc/nginx/conf.d/default.conf; \
  nginx -g "daemon off;" \
'
