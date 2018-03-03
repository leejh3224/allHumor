FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install -g nodemon
RUN npm install

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["npm", "run", "prod-start"]