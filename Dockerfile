# Use Node base image with better native support
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port and define start
EXPOSE 3000
CMD ["npm", "run", "dev"]
