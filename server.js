const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5180",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "http://127.0.0.1:5180",
      /https?:\/\/.+\.ngrok-free\.app$/,
      /https?:\/\/.+\.trycloudflare\.com$/,
      /https?:\/\/.+\.loca\.lt$/
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5180",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5180",
    /https?:\/\/.+\.ngrok-free\.app$/,
    /https?:\/\/.+\.trycloudflare\.com$/,
    /https?:\/\/.+\.loca\.lt$/
  ],
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Simple API endpoints
app.post('/api/meetings', (req, res) => {
  const { userName } = req.body;
  const meetingId = Math.random().toString(36).substring(2, 8);

  res.json({
    meetingId,
    host: userName,
    message: 'Meeting created successfully'
  });
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-meeting', (data) => {
    console.log('User joining meeting:', data);
    socket.join(data.meetingId);
    socket.to(data.meetingId).emit('user-joined', data);
  });

  socket.on('chat-message', (data) => {
    socket.to(data.meetingId).emit('chat-message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Serve built frontend (dist) when available
const distPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distPath));

// SPA fallback (exclude API routes)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  try {
    return res.sendFile(path.join(distPath, 'index.html'));
  } catch (e) {
    return res.status(404).send('Build not found. Run "npm run build" in project root.');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 API base: http://localhost:${PORT}`);
  console.log(`🔧 Frontend: http://localhost:5173`);
});
