FROM node:21-alpine

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache python3 make g++ && npm install --omit=dev

COPY . .

EXPOSE 3000

RUN addgroup -S app && adduser -S app -G app
USER app

CMD ["node", "index.js"]
