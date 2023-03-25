import axios from 'axios';

const API_KEY = "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";
const GPT_API_URL = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';

export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}
  
export async function generateResponse(
    userMessage: string,
    chatHistory: Message[]
): Promise<string> {
    try {
        // Add the user's message to the chat history
        chatHistory.push({ role: 'user', content: userMessage });

        const response = await axios.post(
        GPT_API_URL,
        {
            model: 'gpt-3.5-turbo',
            messages: chatHistory,
        },
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
            },
        }
        );

        const assistantResponse = response.data.choices[0].message.content.trim();
        return assistantResponse;
    } catch (error) {
        console.error('Error generating response:', error);
        return 'An error occurred while generating a response.';
    }
}