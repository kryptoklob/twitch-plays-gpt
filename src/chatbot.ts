import { WebSocket } from 'ws';
import { generateResponse, Message } from './gpt';

let chatHistory: Message[] = [
    { role: 'system', content: 'you are TwitchPlaysGPTBot. like twitchplayspokemon lol. speak in the style of @eigenrobot (from twitter)'}]

export async function processInput(message: string, socket: WebSocket): Promise<void> {
    chatHistory.push({ role: 'user', content: message })
    const assistantResponse = await generateResponse(message, chatHistory);
    chatHistory.push({ role: 'assistant', content: assistantResponse });

    if (chatHistory.length > 50) {
        chatHistory = chatHistory.slice(chatHistory.length - 50);
    }
  
    // Send both user and assistant messages to the WebSocket client
    socket.send(JSON.stringify({ user: message, assistant: assistantResponse }));
}
  
