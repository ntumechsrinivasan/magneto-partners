import Link from "next/link";
import type { ChatMessageData } from "@/lib/types";

function renderInline(text: string, key: string, isUser: boolean) {
  return text
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\])/g)
    .filter(Boolean)
    .map((part, i) => {
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
            className={`border-b ${
              isUser
                ? "border-[rgba(10,13,18,0.4)] text-[var(--void)]"
                : "border-[var(--nd-line)] text-[var(--nd)]"
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

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[86%] rounded-[2px] px-[17px] py-3.5 text-[15px] leading-[1.62] ${
          isUser
            ? "bg-[var(--nd)] text-[var(--void)]"
            : "border border-l-2 border-[var(--line)] border-l-[var(--nd)] bg-[var(--panel2)] text-[var(--bone)]"
        }`}
      >
        {message.text.split("\n").map((line, i) =>
          line.trim() === "" ? (
            <div key={i} className="h-1.5" />
          ) : (
            <p key={i} className={`mb-2 last:mb-0 ${isUser ? "font-normal" : "font-light"}`}>
              {renderInline(line, `${message.id}-${i}`, isUser)}
            </p>
          ),
        )}
      </div>
    </div>
  );
}
