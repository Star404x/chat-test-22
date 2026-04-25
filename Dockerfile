FROM node:18-alpine

WORKDIR /app

# Copy package definition and install production dependencies
COPY package.json ./
RUN npm install --production --no-audit --no-fund

# Copy app source
COPY src ./src

EXPOSE 3000
ENV NODE_ENV=production

CMD ["node", "src/index.js"]
