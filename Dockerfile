FROM node:alpine AS build

WORKDIR /react-app

COPY package.json . 

RUN npm install

COPY . .

ARG API_URL="http:localhost:4000"

ENV REACT_APP_API_URL ${API_URL}

RUN npm run build

FROM node:18-alpine

WORKDIR /react-app

COPY --from=build /react-app/build ./build

RUN npm install -g serve

# Starting our application
CMD ["serve","-s","build"]

EXPOSE 3000