FROM node

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install -g typescript
RUN npm install
RUN tsc -p .

EXPOSE 3000

CMD [ "node", "dist/index.js" ]
