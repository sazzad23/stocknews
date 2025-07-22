FROM node:20-slim

# Install necessary system dependencies for Chromium
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json files first
COPY package*.json ./

# Force Puppeteer to bundle Chromium inside node_modules
ENV PUPPETEER_SKIP_DOWNLOAD=false
ENV PUPPETEER_PRODUCT=chrome
RUN npm install

# Copy the rest of your code
COPY . .

# Expose the port
EXPOSE 3001

# Start the app
CMD ["node", "index.js"]
