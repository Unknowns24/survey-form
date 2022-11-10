FROM node:16-alpine3.14

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm cache verify

RUN npm i --location=global serve

RUN npm ci --silent

RUN npm install react-scripts@3.4.1 --location=global --silent

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]