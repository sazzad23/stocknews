# Use Node.js 18 Alpine base image
FROM node:18-alpine

# Install necessary dependencies including Chromium
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for layer caching)
COPY package*.json ./

# Set environment variables before install
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Expose the app port (optional)
EXPOSE 3001

# Run the application
CMD ["node", "index.js"]
