# Use node base image
FROM node:18-alpine

# Install dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set working directory
WORKDIR /app

# Copy only package.json first
COPY package*.json ./

# Install node dependencies
RUN npm install

# Copy app source code
COPY . .

# Set environment variables
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Expose port (optional, if using containerized access)
EXPOSE 3001

# Run app
CMD ["node", "index.js"]
