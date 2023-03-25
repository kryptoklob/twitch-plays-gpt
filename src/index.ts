import twitchClient from './twitch';
import { processInput } from './chatbot';
import wss from './server';
import { WebSocket } from 'ws';

wss.on('connection', (socket: WebSocket) => {
    twitchClient.on('message', async (channel, userstate, message, self) => {
        if (self) return;
  
        // Process the input message and send the AI response to the WebSocket client
        await processInput(message, socket);    
    });
});

twitchClient.connect();