# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY . .

# Install all dependencies (including dev dependencies like Vite)
RUN npm install

# Build the project using Vite
RUN npm run build

# Expose port (adjust according to your project)
EXPOSE 3000

# Run the app (you can replace with 'npm run start' or 'serve dist' as needed)
CMD ["npm", "run", "preview"]
