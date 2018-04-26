FROM node:alpine

ENV CONTAINER_HOME=/usr/src/strimchat
WORKDIR $CONTAINER_HOME

COPY package*.json ./
RUN npm i pg
RUN npm install --only=production
COPY . ./
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]
