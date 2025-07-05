import { Button } from "../ui/button";
import { Plus, Sun, Moon, Bot } from "lucide-react";
import { Message } from "@/types/message";

interface TopBarProps {
  setMessages: (messages: Message[]) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

export default function TopBar({
  setMessages,
  toggleTheme,
  isDark,
}: TopBarProps) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex  items-center justify-center flex-shrink-0">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white flex-row">
            Assistente de Projetos
          </h1>
        </div>{" "}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setMessages([
                {
                  id: "1",
                  content:
                    "Olá! Sou o ProjectMind, seu assistente virtual para projetos. Como posso ajudá-lo hoje?",
                  sender: "bot",
                  timestamp: new Date(),
                },
              ]);
            }}
            className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova conversa
          </Button>
          <Button
            variant="outline"
            onClick={toggleTheme}
            className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 cursor-pointer"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
