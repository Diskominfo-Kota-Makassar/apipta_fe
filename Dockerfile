# Multi-stage build for security & resource optimization
# Stage 1: Build application assets
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Minimal runtime container with non-root user
FROM node:18-alpine

WORKDIR /app

# Install serve package
RUN npm install -g serve

# Copy compiled assets and server configuration
COPY --from=builder /usr/src/app/dist ./dist
COPY serve.json ./serve.json

# Hardening: Run as non-root user
USER node

# Expose web server port
EXPOSE 3000

# Container healthcheck (verifies HTTP 200 without modifying state)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start static server
CMD ["serve", "-s", "dist", "-l", "3000", "-c", "serve.json"]
