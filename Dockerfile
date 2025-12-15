FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js, npm, and required tools
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    bc \
    lm-sensors \
    smartmontools \
    intel-gpu-tools \
    iproute2 \
    && rm -rf /var/lib/apt/lists/*

# Backend
WORKDIR /App/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN chmod +x src/test.sh

# Frontend
WORKDIR /App/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./

# Expose ports
EXPOSE 8000 5173

# Use concurrently (or a process manager) in root CMD
WORKDIR /App

# Start backend and frontend (development)
CMD ["sh", "-c", "cd backend && npm run main & cd ../frontend && npm run dev"]