# Logistics Transport Frontend

React + Vite + Tailwind CSS application for logistics management.

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and fill values.
3. Run dev server: `npm run dev`
4. Build: `npm run build`

## Environment Variables

- `VITE_API_URL` - Backend API URL
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `VITE_WEBSOCKET_URL` - WebSocket URL
- `VITE_APP_NAME` - Application name

## Features

- User authentication (JWT + Google OAuth)
- Order creation and tracking
- Admin dashboard with revenue charts
- Driver management
- Multi-language support (English, Yoruba, Hausa, Igbo)
- Dark/Light theme toggle
- Real-time notifications (WebSocket)
