ARG CACHE_BUST=1

FROM alpine:3.19

RUN apk add --no-cache busybox-extras

CMD sh -c '
  echo "DEBUG START";
  echo "PORT=$PORT";
  echo "Starting HTTP server on port $PORT";
  nc -lk -p $PORT -e echo "OK";
'
