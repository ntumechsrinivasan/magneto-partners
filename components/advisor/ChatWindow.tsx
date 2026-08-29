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
    <div className="flex h-[560px] flex-col border border-[var(--line)] bg-[var(--panel)]">
      <div className="flex items-center gap-3.5 border-b border-[var(--line)] px-[22px] py-[18px]">
        <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[var(--nd-line)] text-[var(--nd)]">
          <Magnet className="h-4 w-4" strokeWidth={1.5} />
        </span>
        <div>
          <div className="text-[17px] font-semibold">Twin Pole AI Advisor</div>
          <div className="mono text-[var(--flux)]">● Online · industrial intelligence model</div>
        </div>
      </div>

      <div ref={scrollRef} className="flex flex-1 flex-col gap-4 overflow-y-auto p-[22px]">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-[5px] border border-l-2 border-[var(--line)] border-l-[var(--nd)] bg-[var(--panel2)] px-[17px] py-[15px]">
              <i className="pip h-[5px] w-[5px] rounded-full bg-[var(--nd)]" />
              <i className="pip h-[5px] w-[5px] rounded-full bg-[var(--nd)]" />
              <i className="pip h-[5px] w-[5px] rounded-full bg-[var(--nd)]" />
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex gap-2.5 border-t border-[var(--line)] p-[18px]"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about grades, supply chains, recycling…"
          aria-label="Message"
          className="flex-1 rounded-[2px] border border-[var(--line)] bg-[var(--void)] px-[15px] py-[13px] text-[16.5px] text-[var(--bone)] transition-colors focus:border-[var(--nd)]"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex w-11 items-center justify-center rounded-[2px] bg-[var(--nd)] text-[var(--void)] transition-colors hover:bg-[var(--nd-hi)]"
        >
          <ArrowUp className="h-[15px] w-[15px]" />
        </button>
      </form>
    </div>
  );
});

export default ChatWindow;
