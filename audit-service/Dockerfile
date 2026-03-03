FROM ghcr.io/puppeteer/puppeteer:latest

# Switch to root to install and copy files
USER root

WORKDIR /app

# Install dependencies first (helps with caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Environment variables
ENV PORT=3002
# Ensure Puppeteer knows to run without a sandbox in Docker
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

EXPOSE 3002

# The default command to start the server
CMD ["npm", "start"]
