FROM node:alpine AS build


WORKDIR /react-app

COPY package.json . 

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /react-app

COPY --from=build /react-app/build ./build

RUN npm install -g serve

# Starting our application
CMD ["serve","-s","build"]

EXPOSE 80
EXPOSE 443