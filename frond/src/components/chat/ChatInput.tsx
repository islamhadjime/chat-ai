import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MicrophoneIcon } from "../icons/MicrophoneIcon";
import { SendIcon } from "../icons/SendIcon";
import { cn } from "@/lib/utils";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  };


export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    startListening,
    stopListening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
    resetTranscript();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleMicClick = () => {
    if (listening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="relative">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите сообщение..."
          className="bg-white/5 border-none rounded-lg pl-4 pr-20 h-14 text-white placeholder:text-gray-400"
        />
        <Button
          onClick={handleSubmit}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg w-10 h-10 bg-white/10 hover:bg-white/20"
        >
          <SendIcon className="h-5 w-5 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleMicClick}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-1 focus:outline-none"
      >
        <MicrophoneIcon
          className={cn(
            "h-5 w-5 text-gray-400 transition-colors",
            listening && "text-red-500 animate-pulse"
          )}
        />
      </button>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={listening ? "Говорите..." : "Напишите или скажите..."}
        className="bg-white/5 border-none rounded-lg pl-12 pr-20 h-14 text-white placeholder:text-gray-400"
      />
      <Button
        onClick={handleSubmit}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg w-10 h-10 bg-white/10 hover:bg-white/20"
      >
        <SendIcon className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
}