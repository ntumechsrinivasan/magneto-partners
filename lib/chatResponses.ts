import type { ChatResponseRule } from "./types";

export const CHAT_RESPONSE_RULES: ChatResponseRule[] = [
  {
    keywords: ["ndfeb", "smco", "compare", "motor grade"],
    response: `**NdFeB vs SmCo — Dr Gopalan's Framework**

NdFeB (N48H–N52H): Highest energy density BHmax 52 MGOe, ~$60–80/kg sintered, max 150–200°C with Dy/Tb. Dominant in EV traction globally. Dr Gopalan's research at ARCI has explored Dy-free grain boundary diffusion routes — critical given Dy's own supply concentration risk.

SmCo (2:17): Superior thermal stability to 250–300°C, Br coeff. −0.03%/°C, ~$120–160/kg. Essential for aerospace and defence — sectors Dr Gopalan directly advised through DRDO and ISRO programmes for 22+ years.

Notably, Dr Gopalan also developed a novel Fe-P soft magnetic alloy (core loss 162W/kg) that outperforms conventional Si-steel for motor applications — offering a cost-effective import-substitute route.

→ [Book a grade selection session with Dr Gopalan]`,
  },
  {
    keywords: ["supply", "risk", "concentrat", "geopolit"],
    response: `**Rare-Earth Supply Chain Risk**

China controls ~85% of global NdPr oxide output and ~90% of sintering capacity. Dr Gopalan has described this as a 'Monroe Doctrine for materials' — China's strategy began with Program 863 in the 1980s and gradually absorbed even US intellectual property and facilities.

Key risk vectors: Export quota manipulation; Myanmar civil conflict disrupting ~30% of China's heavy RE feedstock; ESG traceability scrutiny.

India's emerging role: Kerala, Odisha, Andhra Pradesh, and Tamil Nadu hold significant monazite-rich deposits — an area Dr Gopalan has directly addressed through ARCI's national mission programmes, with IREL and BARC forming the processing ecosystem.

Japan's response model (reducing RE import dependency from 83% to much lower levels via recycling, substitution, and NIMS-TOYOTA joint ventures) is instructive.

→ [Book a supply chain strategy session with Dr Gopalan]`,
  },
  {
    keywords: ["recycl", "circular", "hpms", "urban mining"],
    response: `**Magnet Recycling — Techno-Economic Analysis**

Dr Gopalan has directly researched urban mining and closed-loop magnet recovery at ARCI. Key pathways:

HPMS: 85–92% NdPr recovery from clean EV motor streams, CapEx ~$8–12M per 500t/yr.
Short-loop (scrap): 95%+ recovery — already commercial at several tier-1 facilities.
Hydrometallurgy: 75–85% from mixed/contaminated WEEE streams.

Urban mining could address 10–20% of the rare earth supply gap. EU CRMA and US IRA recycled content targets create commercial pull by 2027. India's urban mining policy framework is actively developing.

Dr Gopalan estimates 13 billion particles of plastic dust, 10,000 litres of gas emissions, and 75 litres of toxic water per tonne of REE mined — underscoring why recycling is both economically and environmentally essential.

→ [Explore a recycling strategy with Dr Gopalan]`,
  },
  {
    keywords: ["temperature", "thermal", "hot", "heat", "derat", "180", "200"],
    response: `**High-Temperature Magnet Grade Selection**

From Dr Gopalan's research on magnets for demanding environments (wind turbines at 200°C, EV motors, aerospace, MRI machines):

• Up to 120°C — Standard NdFeB N38–N52
• 120–180°C — NdFeB + Dy (N38H, N42H, N48H); 1–3% Dy raises Hcj ~20 kOe/wt%
• 180–250°C — NdFeB 35EH/38EH or SmCo 2:17
• 250–350°C — SmCo 2:17 gold standard (Br coeff. −0.03%/°C)
• Above 350°C — AlNiCo or electromagnet systems

Watch: Dy-free NdFeB routes via grain boundary diffusion — Dr Gopalan's team at ARCI demonstrated high coercivity of ~1 T at 150°C via Nb-assisted grain boundary pinning in Nd-Cu diffused NdFeB, validated by 3D atom probe characterisation.

→ [Discuss thermal requirements with Dr Gopalan]`,
  },
  {
    keywords: ["china", "price", "pricing", "ndpr", "neodymium", "praseodymium", "cost"],
    response: `**China's Rare-Earth Dominance — Dr Gopalan's Assessment**

~85% global NdPr oxide, ~90% sintering capacity. China's Program 863 (1980s onward) was a deliberate state-directed accumulation that eventually absorbed US IP and facilities — Dr Gopalan likens this to a modern 'Monroe Doctrine for materials'.

NdPr price: 2021 peak $175/kg → 2023 trough $48/kg → 2024–25 avg $65–80/kg.

Magneto models $80–120/kg through 2027 as EV acceleration resumes, with upside tail risk from export restriction escalation — China's gallium/germanium restrictions provide the policy template.

India's Atmanirbhar Bharat response: Dr Gopalan's ARCI programmes directly address the national mission to build a domestic rare-earth magnet ecosystem.

→ [Get Dr Gopalan's market outlook briefing]`,
  },
];

export const DEFAULT_CHAT_RESPONSE = `Thank you for your query. The AI Advisor draws on frameworks developed through Dr Gopalan's 35+ years at DRDO, ARCI, NIMS Japan, and IISc — but for a comprehensive strategic assessment specific to your application, I'd recommend a direct session.

→ [Book directly with Dr R Gopalan, Chief Advisor]

Can you share more about your application, operating environment, or procurement volumes?`;

export const CHAT_WELCOME_MESSAGE = `Welcome to the Magneto AI Advisor — built on the research and frameworks of Dr Raghavan Gopalan, INAE Chair Professor and one of India's foremost authorities on rare-earth permanent magnets. Ask me about magnet grades, supply chains, or recycling. For deeper strategic work, [book directly with Dr Gopalan →]`;

export function getChatResponse(input: string): string {
  const normalized = input.toLowerCase();
  for (const rule of CHAT_RESPONSE_RULES) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return rule.response;
    }
  }
  return DEFAULT_CHAT_RESPONSE;
}
