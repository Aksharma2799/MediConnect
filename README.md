# MediConnect - Healthcare Marketplace Platform

Complete healthcare marketplace application similar to Swiggy, Zomato, and Rapido for booking doctors, ordering medicines, and scheduling consultations.

## Project Structure

```
MediConnect/
├── backend/              # Node.js + Express API
├── frontend/             # React.js web application
├── docker-compose.yml    # Docker orchestration
├── .gitignore
└── README.md
```

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js v16+
- MongoDB
- Redis

### Development Setup

```bash
# 1. Clone repository (or navigate to project)
cd MediConnect

# 2. Start all services with Docker
docker-compose up -d

# 3. Access the application
Frontend: http://localhost:3000
Backend API: http://localhost:5000/api/v1
MongoDB: mongodb://localhost:27017
Redis: localhost:6379
```

### Manual Setup (without Docker)

**Backend:**

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

**Frontend:**

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

## Features

✅ Doctor Discovery & Booking
✅ Multi-type Consultations (online/in-clinic/home)
✅ Secure Payments (Razorpay)
✅ AI Chatbot & Auto-replies
✅ Real-time Tracking & Notifications
✅ Video Consultations
✅ Medicine Ordering
✅ Review & Rating System

## Tech Stack

- **Frontend**: React, Redux, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **Real-time**: Socket.io
- **Payment**: Razorpay
- **Testing**: Jest, Supertest, Cypress

## Documentation

- [ARCHITECTURE.md](../docs/ARCHITECTURE.md) - System design & APIs
- [QUICKSTART.md](../docs/QUICKSTART.md) - Detailed setup guide
- [API Documentation](../docs/API.md) - Endpoint specifications

## Development

### Backend Development

```bash
cd backend
npm run dev          # Start with hot reload
npm test             # Run tests
npm run lint         # Check code quality
```

### Frontend Development

```bash
cd frontend
npm start            # Start dev server
npm test             # Run tests
npm run build        # Production build
```

## Status

🚀 Currently in Phase 1: Core Setup

See `/docs/plan.md` for implementation roadmap.

## License

MIT
# MediConnect
