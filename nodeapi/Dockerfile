FROM node

EXPOSE 3000
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api
COPY . /usr/src/api
RUN npm install -g typescript
RUN npm install
RUN tsc -p .
RUN ls
ENTRYPOINT [ "node", "dist/index.js" ]
