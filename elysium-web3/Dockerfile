FROM node:16-alpine

# Create app directory

WORKDIR /usr/node-app

COPY . .

RUN npm install

RUN npm run build

ENTRYPOINT ["npm", "run", "start"]
