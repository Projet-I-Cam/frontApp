# Stage 1: Compile and Build angular codebase
FROM node:18.20.4 as build
LABEL maintainer="Ismael Foletia alias XmaelXD <xmael@keepsec.ca>"

# Set the working directory
WORKDIR /usr/local/app

# Copy only package files first (for better caching)
COPY package.json  ./

# Install dependencies
RUN npm i -f

# Copy the rest of the application
COPY . .

# Optional: add sass if you need it before the build
# RUN npm install -g sass && sass src/assets:src/assets --no-source-map

# Build the app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose the app port
EXPOSE 80

# Run the app
CMD ["serve", "-s", "dist/template/browser", "-l", "80"]
