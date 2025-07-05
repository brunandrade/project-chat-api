import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/custom/ThemeProvider";
import { Message } from "@/types/message";
import TopBar from "@/components/custom/top-bar";
import MessageContainer from "@/components/custom/message-container";
import InputContainer from "@/components/custom/input-container";
import useChatApi from "@/hooks/useChatApi";

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Olá! Sou o ProjectMind, seu assistente virtual para projetos. Como posso ajudá-lo hoje? Você pode perguntar sobre status, prazos, equipes ou qualquer aspecto dos seus projetos.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isDark, toggleTheme } = useTheme();
  const { sendQuestion } = useChatApi();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Chamada real à API Python
    const resposta = await sendQuestion(userMessage.content);
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: resposta || "Erro ao obter resposta do assistente.",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim()) {
        const userMessage: Message = {
          id: Date.now().toString(),
          content: inputValue,
          sender: "user",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        const resposta = await sendQuestion(userMessage.content);
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: resposta || "Erro ao obter resposta do assistente.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "dark" : "light"
      } bg-gray-50 dark:bg-gray-900`}
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <TopBar
          setMessages={setMessages}
          toggleTheme={toggleTheme}
          isDark={isDark}
        />
      </div>

      {/* Messages Container */}
      <div className="flex-1 min-h-0">
        <MessageContainer
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />
      </div>

      {/* Input Container */}
      <InputContainer
        handleSendMessage={handleSendMessage}
        inputRef={inputRef}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleKeyPress={handleKeyPress}
        isTyping={isTyping}
      />
    </div>
  );
}
