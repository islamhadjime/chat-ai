import { cn } from "@/lib/utils";
import type { MessageType } from "@/lib/types";
import { ChatBotIcon } from "../icons/ChatBotIcon";

type ChatMessageProps = {
  message: MessageType;
};

export function ChatMessages({ message }: ChatMessageProps) {
  const isAi = message.role === 'ai';

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        !isAi && "flex-row-reverse" 
      )}
    >
      {isAi && (
        <div className="p-2 bg-white/10 rounded-lg">
          <ChatBotIcon className="h-5 w-5 text-white" />
        </div>
      )}
      <div
        className={cn(
          "p-4 rounded-lg max-w-[80%]",
          isAi ? "bg-white/10 text-white" : "bg-blue-500 text-white"
        )}
      >
        <p>{message.text}</p>
      </div>
    </div>
  );
}