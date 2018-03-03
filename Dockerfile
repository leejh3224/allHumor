FROM node:8.0-wheezy

RUN apt-get update && apt-get install -y curl apt-transport-https && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y yarn

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# client
COPY ./client/ ./client/

WORKDIR /usr/src/app/client

RUN yarn install && yarn production

COPY ./client/build/ /usr/src/app/server/build/client

WORKDIR /usr/src/app/server

COPY ./server/webpack.config.js .
COPY ./server/package.json .

RUN yarn install

COPY ./server .

RUN yarn build

EXPOSE 3030:3030

CMD ["yarn", "prod-start"]