# Stage 1: Build the React application
FROM node:18-alpine as build
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./
RUN npm install

# Copy all other project files and build
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the build stage to Nginx's serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 (Google Cloud Run's default port)
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
