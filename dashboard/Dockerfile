FROM node AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN $(npm bin)/ng build --prod --aot

FROM nginx
WORKDIR /usr/share/nginx/html/
COPY --from=builder /usr/src/app/dist/dashboard/ /usr/share/nginx/html
WORKDIR /etc/nginx/conf.d/
COPY ../nodeapi/default.conf /etc/nginx/conf.d/
EXPOSE 80 443 3000
CMD nginx -g 'daemon off;'