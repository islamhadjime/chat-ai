import { useState, useEffect } from 'react';
import type { MessageType } from '@/lib/types';
import { API_URLS } from '@/lib/api';

export function useChat() {

  const [messages, setMessages] = useState<MessageType[]>(() => {

    try {
      const storedMessages = window.localStorage.getItem('chat_messages');
      return storedMessages ? JSON.parse(storedMessages) : [];
    } catch (error) {
      console.error("Ошибка чтения из localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('chat_messages', JSON.stringify(messages));
    } catch (error) {
      console.error("Ошибка записи в localStorage:", error);
    }
  }, [messages]);



  const [isLoading, setIsLoading] = useState(false);



  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: MessageType = {
      id: crypto.randomUUID(),
      role: 'user',
      text: text,
    };


    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch(API_URLS.chat, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: updatedMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка сети или сервера');
      }

      const data = await response.json();

      const aiMessage: MessageType = {
        id: crypto.randomUUID(),
        role: 'ai',
        text: data.reply,
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      const errorMessage: MessageType = {
        id: crypto.randomUUID(),
        role: 'ai',
        text: `Извините, произошла ошибка: ${(error as Error).message}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  return {
    messages,
    isLoading,
    handleSendMessage,
  };
}