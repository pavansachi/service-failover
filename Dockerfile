FROM node:alpine

COPY . .
RUN npm install

RUN rm -rf node_modules/

RUN npm install --save

CMD ["npm", "run", "prod"]

EXPOSE 3000