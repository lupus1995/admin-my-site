FROM node:18.17.0
WORKDIR /public
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]