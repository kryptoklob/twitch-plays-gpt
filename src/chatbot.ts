import { WebSocket } from 'ws';
import { generateResponse, Message } from './gpt';

let chatHistory: Message[] = [
    { role: 'system', content: 'You are a helpful assistant.' },
];

export async function processInput(
  input: string,
  socket: WebSocket
): Promise<void> {
    // Add your chatbot logic here, e.g., parse input, generate prompts, etc.
    const response = await generateResponse(input, chatHistory);

    // Add the assistant's response to the chat history
    chatHistory.push({ role: 'assistant', content: response });

    // Limit chat history length to a certain number of messages if needed
    if (chatHistory.length > 100) {
        chatHistory = chatHistory.slice(-100);
    }

    // Send the response to the WebSocket client
    socket.send(response);
}
