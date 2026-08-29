import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import ReferenceBrowser from "@/components/reference/ReferenceBrowser";
import Plate from "@/components/ui/Plate";
import Reveal from "@/components/ui/Reveal";
import { PLATES } from "@/lib/constants";
import { REFERENCE } from "@/lib/reference";

export const metadata: Metadata = {
  title: "Reference",
  description:
    "A working reference on permanent magnet selection, processing, supply and circularity — grade codes, operating points, coatings, second-source qualification, recycling routes and cost drivers.",
};

export default function ReferencePage() {
  return (
    <main className="px-6 py-24 lg:px-10">
      <Reveal />
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader
          tag="Reference"
          title="What we get asked, answered properly"
          description={`${REFERENCE.length} topics across grade selection, manufacturing, supply and circularity. Written and maintained by Twin Pole — not generated, and not a substitute for looking at your actual design.`}
        />

        <ReferenceBrowser />

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_1fr]">
          <Plate plate={PLATES.lab} className="h-[260px] lg:h-[360px]" />
          <Plate plate={PLATES.archive} className="h-[260px] lg:h-[360px]" />
        </div>
      </div>
    </main>
  );
}
