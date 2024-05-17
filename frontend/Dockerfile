# Use an official Node.js runtime as the base image
FROM node:19-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 80

# Start the application
CMD ["npm", "start"]