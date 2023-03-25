import express from 'express';
import path from 'path';
import { WebSocketServer } from 'ws';

// HTTP server
const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});

// WebSocket server
const wss = new WebSocketServer({ port: 3000 });

export default wss;
