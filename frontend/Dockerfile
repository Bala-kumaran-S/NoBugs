FROM alpine:3.19

RUN apk add --no-cache busybox-extras

# Cache-buster so Railway rebuilds
ARG CACHE_BUST=1

CMD ["sh", "-c", "echo DEBUG_START && echo PORT=$PORT && echo Starting HTTP server on port $PORT && nc -lk -p $PORT -e echo OK"]
