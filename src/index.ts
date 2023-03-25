import twitchClient from './twitch';
import { processInput } from './chatbot';
import { WebSocket } from 'ws';

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (socket: WebSocket) => {
    twitchClient.on('message', async (channel, userstate, message, self) => {
        if (self) return;
  
        // Process the input message and send the AI response to the WebSocket client
        await processInput(message, socket);    
    });
});

twitchClient.connect();