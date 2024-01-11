FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev
RUN npm i @nestjs/cli

COPY prisma/ ./prisma

RUN npx prisma generate --schema prisma/schema.prisma

COPY . .
RUN npm run build

EXPOSE 443

CMD [ "node", "dist/main.js" ]
