# Build image
FROM node:16.13-alpine as api-gateway-docker-builder
WORKDIR /app

COPY package*.json ./
RUN npm install --ignore-scripts --omit=dev

COPY ./build build
COPY .env .
ENV HOST="0.0.0.0"
EXPOSE 8000
CMD ["npm", "start"]
