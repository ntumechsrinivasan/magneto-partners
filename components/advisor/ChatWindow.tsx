"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { getChatResponse, CHAT_WELCOME_MESSAGE } from "@/lib/chatResponses";
import type { ChatMessageData } from "@/lib/types";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

export interface ChatWindowHandle {
  sendMessage: (text: string) => void;
}

const ChatWindow = forwardRef<ChatWindowHandle>(function ChatWindow(_props, ref) {
  const [messages, setMessages] = useState<ChatMessageData[]>([
    { id: nextId(), role: "bot", text: CHAT_WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { id: nextId(), role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    const delay = 1000 + Math.random() * 600;
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: nextId(), role: "bot", text: getChatResponse(trimmed) }]);
    }, delay);
  };

  useImperativeHandle(ref, () => ({ sendMessage }));

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="flex h-[510px] flex-col overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--card)]">
      <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3a6fff,#00b8ff)] text-base">
          🧲
        </div>
        <div className="flex flex-col">
          <span className="font-[family-name:var(--font-heading)] text-[12.5px] font-bold text-white">
            Magneto AI Advisor
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--accent3)]">
            ● ONLINE · INDUSTRIAL INTELLIGENCE MODEL
          </span>
        </div>
      </div>

      <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-[12px] border border-[var(--border)] bg-[var(--card2)] px-4 py-3">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--text2)]" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--text2)]" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--text2)]" />
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-center gap-2 border-t border-[var(--border)] p-4"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about magnet grades, supply chains, recycling..."
          className="flex-1 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[13px] text-[var(--text)] transition-colors focus:border-[var(--border2)]"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[var(--accent)] text-white transition-transform hover:-translate-y-0.5"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
});

export default ChatWindow;
