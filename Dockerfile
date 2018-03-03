FROM node:8.0-wheezy

RUN apt-get update && apt-get install -y curl apt-transport-https && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y yarn

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN mkdir -p /client

# copy client folder
COPY ./client ./client

WORKDIR /client

RUN yarn production

RUN cd .. && mkdir -p /server && cd server

COPY ./server/webpack.config.js .
COPY ./server/package.json .

RUN yarn install

COPY ./server .

RUN yarn build

EXPOSE 3030

CMD ["yarn", "prod-start"]