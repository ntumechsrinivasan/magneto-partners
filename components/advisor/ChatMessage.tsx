import Link from "next/link";
import type { ChatMessageData } from "@/lib/types";

function renderInline(text: string, key: string, isUser: boolean) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\])/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${key}-${i}`} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("[") && part.endsWith("]")) {
      return (
        <Link
          key={`${key}-${i}`}
          href="/contact"
          className={`font-medium underline underline-offset-2 ${
            isUser ? "text-white" : "text-[var(--accent)] hover:text-[var(--accent-dark)]"
          }`}
        >
          {part.slice(1, -1)}
        </Link>
      );
    }
    return <span key={`${key}-${i}`}>{part}</span>;
  });
}

export default function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";
  const lines = message.text.split("\n");

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-[10px] px-4 py-3 text-[13px] leading-[1.6] ${
          isUser
            ? "bg-[var(--ink)] text-white"
            : "border border-[var(--border)] bg-[var(--bg-alt)] text-[var(--text)]"
        }`}
      >
        {lines.map((line, i) => (
          <p key={i} className={line.trim() === "" ? "h-2" : "mb-1.5 last:mb-0 font-light"}>
            {renderInline(line, `${message.id}-${i}`, isUser)}
          </p>
        ))}
      </div>
    </div>
  );
}
