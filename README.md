# Radhe Server

Simple video conferencing server with Socket.IO.

## Quick Start

```bash
cd server
npm install
npm start
```

## API

- `GET /api/health` - Server status
- `POST /api/meetings` - Create meeting

## Socket Events

- `join-meeting` - Join video call
- `offer/answer/ice-candidate` - WebRTC signaling
- `chat-message` - Send chat message
