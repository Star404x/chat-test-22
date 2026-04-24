FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Set environment and expose port
ENV NODE_ENV=production
EXPOSE 3000

# Start the app (ensure your entry point is index.js or adjust accordingly)
CMD ["node", "index.js"]
