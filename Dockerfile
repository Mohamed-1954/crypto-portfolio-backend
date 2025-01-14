# Use the official Node.js LTS image as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml* ./

# Install pnpm globally
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port your application will run on (change if necessary)
EXPOSE 3000

# Set the command to start your application
CMD ["pnpm", "run", "dev"]
