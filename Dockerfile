FROM node:18

WORKDIR /app

# Copy everything including node_modules
COPY . .

# Expose port and define start
EXPOSE 3000
CMD ["npm", "run", "dev"]
