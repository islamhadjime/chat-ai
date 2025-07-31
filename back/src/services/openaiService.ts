import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

interface Message {
    role: 'user' | 'ai' | 'model';
    text: string;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); 

export const getAiResponse = async (history: Message[]): Promise<string> => {
    try {
        const chat = model.startChat({
            history: history.slice(0, -1).map(msg => ({
                role: msg.role === 'ai' ? 'model' : 'user',
                parts: [{ text: msg.text }],
            })),
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
            ],
        });
        
        const lastUserMessage = history[history.length - 1].text;
        const result = await chat.sendMessage(lastUserMessage);
        const response = result.response;
        
        if (!response) {
            throw new Error("AI не вернул ответ.");
        }
        
        return response.text();

    } catch (error) {
        console.error("Ошибка при запросе к Gemini API:", error);
        throw new Error("Произошла ошибка при обращении к AI сервису.");
    }
};