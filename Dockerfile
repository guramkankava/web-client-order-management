FROM node:13.3.0 AS compile-image
COPY /dist/web-client-order-management /usr/share/angular-apps
