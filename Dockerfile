FROM node

WORKDIR /usr/lib/app

COPY package*.json ./

RUN npm install -g nodemon && npm install

COPY . .

EXPOSE 39901

CMD [ "npm", "start" ]