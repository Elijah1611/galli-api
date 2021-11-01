FROM node:14-slim

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN npm run schema:sync

EXPOSE 7000 80

CMD npm run start