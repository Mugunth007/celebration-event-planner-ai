# Stage 1: Build the Vite React TypeScript application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install clean dependencies
RUN npm ci

# Copy source code and config
COPY . .

# Run test suite and build production bundle
RUN npm test
RUN npm run build

# Stage 2: Serve via Nginx
FROM nginx:alpine

# Copy custom Nginx configuration for Cloud Run (port 8080)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build artifacts
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose Cloud Run default port
EXPOSE 8080

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
