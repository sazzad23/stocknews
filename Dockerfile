# Base image with Chrome pre-installed
FROM ghcr.io/browserless/chrome:latest

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy app files
COPY . .

# Expose app port
EXPOSE 3001

# Run the app
CMD ["node", "index.js"]
