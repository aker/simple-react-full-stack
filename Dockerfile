FROM node:9.11.2-alpine
WORKDIR /app

COPY dist ./dist
COPY src/server ./src/server
COPY package.json .

RUN npm install --production

EXPOSE 8580
CMD [ "node", "src/server/index.js" ]