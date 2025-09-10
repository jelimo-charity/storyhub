# Angular UI Dockerfile with Node.js server
FROM node:20.19-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build 

FROM node:20.19-alpine AS runner
WORKDIR /app
# Install a simple HTTP server to serve static content
RUN npm install -g serve

# Copy the build output from the builder stage
COPY --from=builder /app/dist/ui/browser /app

# Expose the port the app runs on
EXPOSE 4200

# Command to run the app
CMD ["serve", "-s", ".", "-l", "4200"]
