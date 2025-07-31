
import { ChatIcon } from "../icons/ChatIcon";

export function ChartStatrt() {
  return (
    <div className="space-y-4">
        <div className="p-3 bg-white/5 rounded-lg w-fit mb-3">
           <div className="size-6 animate-bounce">
           <ChatIcon className="h-6 w-6 text-white" />
           </div>
          </div>
        <h2 className="text-3xl font-bold text-white">Hi there!</h2>
        <h1 className="text-5xl font-bold text-white">What would you like to know?</h1>
        <p className="text-lg text-gray-300">
            Use one of the most common prompts below or ask your own question
        </p>
    </div>
  )
}