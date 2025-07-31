import { Request, Response } from 'express';
import { getAiResponse } from '../services/openaiService'; 

export const handleChat = async (req: Request, res: Response) => {
  const { history } = req.body;

  if (!history || !Array.isArray(history) || history.length === 0) {
    return res.status(400).json({ error: 'Поле "history" должно быть непустым массивом' });
  }

  try {
    const aiMessage = await getAiResponse(history);
    res.status(200).json({ reply: aiMessage });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};