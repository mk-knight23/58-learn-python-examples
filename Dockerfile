# Multi-stage build for Python Examples React app
FROM node:18-alpine AS frontend

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Python stage
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy Python requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy built frontend
COPY --from=frontend /app/dist ./dist

# Copy Python examples
COPY skills/ ./skills/

EXPOSE 3000

# Serve the static files
CMD ["python", "-m", "http.server", "3000", "--directory", "dist"]