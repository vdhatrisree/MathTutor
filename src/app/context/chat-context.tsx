"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ChatContextType {
  problemContext: {
    title: string;
    htmlContent: string;
  } | null;
  setProblemContext: (context: { title: string; htmlContent: string } | null) => void;
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [problemContext, setProblemContext] = useState<{ title: string; htmlContent: string } | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ChatContext.Provider value={{ problemContext, setProblemContext, isChatOpen, setIsChatOpen }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
