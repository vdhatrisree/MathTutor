"use client";

import { useEffect } from "react";
import { useChatContext } from "../context/chat-context";

interface ChatContextSetterProps {
  title: string;
  htmlContent: string;
}

export function ChatContextSetter({ title, htmlContent }: ChatContextSetterProps) {
  const { setProblemContext } = useChatContext();

  useEffect(() => {
    // Set the context when the component mounts (when user enters the page)
    setProblemContext({ title, htmlContent });

    // Clear the context when the component unmounts (when user leaves the page)
    return () => {
      setProblemContext(null);
    };
  }, [title, htmlContent, setProblemContext]);

  // This component doesn't render anything visible
  return null;
}
