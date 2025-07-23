FROM node:18-slim

WORKDIR /app

# Install Puppeteer dependencies with IPv4 enforced
RUN apt-get -o Acquire::ForceIPv4=true update && apt-get install -y --no-install-recommends \
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
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy package files and install with IPv4 npm
COPY package*.json ./
RUN npm config set registry http://registry.npmjs.org && npm install

# Copy rest of the code
COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
