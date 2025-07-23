# Use official Node.js LTS image
FROM node:18-slim

# Install Puppeteer dependencies
RUN apt-get update && apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libatk-1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libgbm1 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  wget \
  --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if you have)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port 3001
EXPOSE 3001

# Run the app
CMD ["node", "index.js"]
