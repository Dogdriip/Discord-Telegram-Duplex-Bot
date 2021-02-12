FROM alpine:latest

RUN apk add --no-cache nodejs npm
WORKDIR /usr/src/app
COPY . .
RUN npm i
CMD npm start