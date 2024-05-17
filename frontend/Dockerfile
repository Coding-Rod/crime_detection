FROM node:lts-alpine

# install yarn
RUN npm install -g yarn

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'yarn.lock' (if available)
COPY package*.json yarn.lock ./

# install project dependencies leaving out dev dependencies
RUN yarn install --production

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "run", "start" ]