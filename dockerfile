FROM node:18.17.0
WORKDIR /public
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "dev" ]