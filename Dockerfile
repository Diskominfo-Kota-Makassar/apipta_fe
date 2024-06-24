# Use an official Node runtime as a parent image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build your app
RUN npm run build

# Install serve package globally to serve your app
RUN npm install -g serve

# Command to run the app
CMD ["serve", "-s", "dist"]
