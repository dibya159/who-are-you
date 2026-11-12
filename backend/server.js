// Dosto ka Chat - Optional Node.js Backend Server
// Can run as standalone API server or with Firebase Admin SDK

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Dosto ka Chat Backend',
    version: '1.0.0',
    time: new Date().toISOString()
  });
});

// Mock database schema overview
app.get('/api/schema', (req, res) => {
  res.json({
    description: 'Firebase Realtime Database schema for Dosto ka Chat',
    collections: {
      messages: 'Public group chat messages { uid, username, text, voice, ts }',
      dmRequests: 'Pending friend requests { [toUid]: { [fromUid]: { fromName, username, ts } } }',
      dmFriends: 'Confirmed friends list { [myUid]: { [friendUid]: { name, username, addedAt } } }',
      dmThreads: 'Direct chat threads { [pairId]: { messages: { [msgId]: { uid, name, text, voice, ts, unsent } } } }',
      presence: 'Realtime online presence { [uid]: { online: boolean, state: "online"|"offline", username, name, lastSeen } }',
      stories: '24h Stories feed { [storyId]: { uid, username, name, mediaUrl, text, ts } }'
    }
  });
});

// Start static/API server
app.listen(PORT, () => {
  console.log(`🚀 Dosto ka Chat server running on http://localhost:${PORT}`);
});
