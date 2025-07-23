# Use node base image
FROM node:18-alpine

# Install required packages (Chromium etc.)
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set working directory
WORKDIR /app

# Copy package files separately so Docker caches them
COPY package*.json ./

# Install dependencies (recreates node_modules in container)
RUN npm install

# Copy remaining app code
COPY . .

# Set Puppeteer env
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Start the app
CMD ["node", "index.js"]
