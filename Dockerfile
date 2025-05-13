# Use Node base image with better native support
FROM node:18

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN npm install

# Build app (if needed)
# RUN npm run build

# Expose port and define start
EXPOSE 3000
CMD ["npm", "run", "dev"]
