FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files first (better cache usage)
COPY package.json ./

# Install dependencies (none by default)
RUN npm install --production --no-audit --no-fund || true

# Copy application source
COPY . ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "src/index.js"]
