import { useCallback } from "react";

export default function useChatApi() {
  const sendQuestion = useCallback(
    async (pergunta: string): Promise<string | null> => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pergunta }),
        });
        if (!response.ok) {
          throw new Error("Erro ao chamar a API");
        }
        const data = await response.json();
        return data.resposta ?? null;
      } catch (error) {
        console.error("Erro ao enviar pergunta:", error);
        return null;
      }
    },
    []
  );

  return { sendQuestion };
}
