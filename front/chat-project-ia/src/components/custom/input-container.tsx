import { Send } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface InputContainerProps {
  handleSendMessage: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isTyping: boolean;
}

export default function InputContainer({
  handleSendMessage,
  inputRef,
  inputValue,
  setInputValue,
  handleKeyPress,
  isTyping,
}: InputContainerProps) {
  return (
    <div className="sticky bottom-0 z-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Mensagem para ProjectMind..."
              className="w-full pr-12 py-5 text-lg min-h-[56px] border-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 dark:bg-gray-700 dark:text-white rounded-xl resize-none"
              disabled={isTyping}
            />
          </div>
          <Button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-500 hover:bg-blue-600 min-h-[56px] min-w-[56px] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
