FROM node:alpine AS development

ENV NODE_ENV development

WORKDIR /react-app

COPY package.json . 
RUN npm install

COPY . .

RUN npm install -g serve

EXPOSE 3000

# Starting our application
CMD ["serve","-s","npm","start"]