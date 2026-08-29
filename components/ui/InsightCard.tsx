import type { Insight } from "@/lib/types";

export default function InsightCard({ insight }: { insight: Insight; index?: number }) {
  return (
    <article className="rv group grid cursor-pointer grid-cols-1 items-start gap-4 border-t border-[var(--line)] py-[34px] last:border-b lg:grid-cols-[180px_1fr_150px] lg:gap-10">
      <div className="mono pt-1.5 text-[var(--nd)]">{insight.category}</div>
      <div>
        <h3
          className={`display-tight mb-2.5 leading-[1.28] transition-colors duration-200 group-hover:text-[var(--nd)] ${
            insight.featured ? "text-[32px]" : "text-[23px]"
          }`}
        >
          {insight.title}
        </h3>
        <p className="max-w-[62ch] text-[15.5px] font-light leading-[1.65] text-[var(--mute)]">
          {insight.excerpt}
        </p>
      </div>
      <div className="mono pt-1.5 leading-[1.9] text-[var(--dim)] lg:text-right">
        {insight.source}
        <br />
        {insight.date}
        <br />
        {insight.readTime}
      </div>
    </article>
  );
}
