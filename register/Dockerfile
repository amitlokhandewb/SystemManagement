# Use Nginx as the base image for serving the static files
FROM nginx:stable-alpine

# Set the working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx config (if you have one)
COPY nginx.conf /etc/nginx/conf.d/

# Copy the pre-built React app from the local `dist` directory to Nginx's HTML directory
COPY ./dist .

# Expose port 3008 for the container
EXPOSE 3007

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
