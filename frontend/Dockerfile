# Use the official Node.js base image
FROM node:18.4.0-slim as build

WORKDIR /usr/app
COPY . /usr/app
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html