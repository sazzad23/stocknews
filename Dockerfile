FROM ghcr.io/browserless/chrome:latest

WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install --registry=http://registry.npmjs.org

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
