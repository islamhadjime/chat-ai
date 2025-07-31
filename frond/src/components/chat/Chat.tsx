import { useChat } from "@/hooks/useChat";
import { ChatInput } from "./ChatInput";
import { ChatLogo } from "./ChatLogo";
import { ChartStatrt } from "./ChartStart"; 
import { ConversationView } from "./ConversationView"; 

export function Chat() {

  const { messages, isLoading, handleSendMessage } = useChat();
  
  return (
    <div className="flex flex-col h-full bg-[#0E2A63] p-8">
      <div className="mb-6">
         <ChatLogo />
      </div>

      <div className="flex-grow flex flex-col overflow-hidden">
        {messages.length === 0 ? (
          <div className="flex-grow flex flex-col justify-center">
            
            <ChartStatrt /> 
          </div>
        ) : (
          <ConversationView messages={messages} isLoading={isLoading} />
        )}
      </div>

      <div className="mt-6">
        <ChatInput onSendMessage={handleSendMessage}  />
      </div>
    </div>
  );
}
