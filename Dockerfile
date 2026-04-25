FROM node:18-alpine

WORKDIR /app

# copy package.json first to leverage Docker layer caching
COPY package.json ./

# install only production deps (there are none now, but keep pattern)
RUN npm install --production

# copy the rest of the files
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
