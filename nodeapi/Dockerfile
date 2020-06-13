FROM node

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api
COPY . /usr/src/api

RUN npm install -g typescript
RUN npm install
RUN tsc -p .

EXPOSE 3000

CMD forever -c 'node --harmony' ./dist/index.js

# FROM nginx
# COPY default.conf /etc/nginx/conf.d/