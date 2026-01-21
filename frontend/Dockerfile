# ---------- build stage ----------
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine


COPY nginx.conf /etc/nginx/templates/default.conf.template


COPY --from=build /app/dist/frontend /usr/share/nginx/html

RUN echo "==== Contents of /usr/share/nginx/html ====" \
 && ls -la /usr/share/nginx/html \
 && echo "========================================"

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

