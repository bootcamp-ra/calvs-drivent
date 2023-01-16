FROM node:15-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./app

ENV PORT=4002

EXPOSE 4002
RUN npx prisma generate --schema=./prisma/schema.prisma

CMD ["npm", "run", "dev:migrate"]