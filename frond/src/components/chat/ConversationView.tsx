import type { MessageType } from "@/lib/types";
import { ChatMessages } from "./ChatMessage";
import { useRef, useEffect } from "react";



type ConversationViewProps = {
  messages: MessageType[];
  isLoading: boolean;
};

export function ConversationView({ messages,isLoading }: ConversationViewProps) {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  if(isLoading) {
    return <>
      <div className="flex-grow space-y-6 overflow-y-auto pr-4 w-full h-[600px] scrollbar scrollbar-thin">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-100"></div>
        </div>
      </div>
    </>
  }

  return (
    <div className="flex-grow space-y-6 overflow-y-auto pr-4 w-full h-[600px] scrollbar scrollbar-thin">
      {messages.map((msg) => (
        <ChatMessages key={msg.id} message={msg} />
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
}
