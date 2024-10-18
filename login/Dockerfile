# Use a base image with Node.js
FROM node:14

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 3006

# Run the application
CMD ["npm","run","start:standalone"]
