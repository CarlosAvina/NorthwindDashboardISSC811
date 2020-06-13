FROM node

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api
COPY . /usr/src/api

RUN npm install -g typescript
RUN npm install
RUN tsc -p .
RUN npm start