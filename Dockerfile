FROM node:18-alpine

WORKDIR /app

# Install production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --only=production

# Copy source
COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
