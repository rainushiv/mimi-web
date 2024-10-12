FROM node:alpine AS build

WORKDIR /react-app

COPY package.json . 

RUN npm install

ARG ENV REACT_APP_MIMI_API_KEY=mimi.shivalry.dev

ENV REACT_APP_MIMI_API_KEY=mimi.shivalry.dev

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /react-app

COPY --from=build /react-app/build ./build

RUN npm install -g serve

# Starting our application
CMD ["serve","-s","build"]

EXPOSE 3000