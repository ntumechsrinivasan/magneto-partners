"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ArrowUp, Magnet } from "lucide-react";
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
    <div className="flex h-[520px] flex-col overflow-hidden border border-[var(--border)] bg-[var(--card)]">
      <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
          <Magnet className="h-4 w-4" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col">
          <span className="font-[family-name:var(--font-heading)] text-[14px] font-medium text-[var(--ink)]">
            Magneto AI Advisor
          </span>
          <span className="text-[11px] text-[var(--success)]">● Online · Industrial Intelligence Model</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[var(--card2)] px-5 py-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-[10px] border border-[var(--border)] bg-[var(--bg-alt)] px-4 py-3">
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
          className="flex-1 rounded-[4px] border border-[var(--border)] bg-[var(--bg-alt)] px-4 py-3 text-[13px] text-[var(--text)] transition-colors focus:border-[var(--border2)]"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] bg-[var(--accent)] text-white transition-colors hover:bg-[var(--accent-dark)]"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
});

export default ChatWindow;
