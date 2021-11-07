FROM node:14-slim

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 7000

CMD npm run start