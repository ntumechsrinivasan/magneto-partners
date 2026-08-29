import type {
  Service,
  Industry,
  Insight,
  Award,
  Credential,
  ConsultationTier,
  GovernmentRole,
  Metric,
  QuickQuery,
  ValueCardData,
  FellowshipTag,
  Testimonial,
  NarrativePillar,
} from "./types";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "AI Advisor", href: "/advisor" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const HERO_METRICS: Metric[] = [
  {
    label: "Years in permanent magnets",
    value: 35,
    suffix: "+",
    sub: "DRDO · ARCI (DST) · NIMS Japan · IISc",
  },
  {
    label: "Peer-reviewed publications",
    value: 200,
    suffix: "+",
    sub: "h-index 31 · i10-index 101",
  },
  {
    label: "Patents granted",
    value: 14,
    suffix: "",
    sub: "National & international",
  },
  {
    label: "Sectors advised",
    value: 7,
    suffix: "",
    sub: "EV, aerospace, defence, energy, robotics",
  },
];

export const SERVICES: Service[] = [
  {
    icon: "magnet",
    tag: "TIER-1 ADVISORY",
    title: "Magnet Strategy Advisory",
    description:
      "End-to-end strategic advisory for organisations dependent on permanent magnet supply. We assess grade requirements, sourcing risk, and long-term procurement architecture.",
  },
  {
    icon: "flame",
    tag: "PROCESS ENGINEERING",
    title: "Rare-Earth Magnet Processing",
    description:
      "Process advisory across the full sintered-magnet route — strip casting, hydrogen decrepitation, jet milling, alignment and sintering, grain boundary diffusion, and post-sinter finishing — including Dy-lean and Dy-free coercivity routes.",
  },
  {
    icon: "flask",
    tag: "MATERIALS SELECTION",
    title: "New Magnetic Materials Selection",
    description:
      "Evaluation and qualification of emerging hard and soft magnetic materials against a real application envelope — SmCo, SmFeN, Mn-based and Dy-free NdFeB, soft magnetic composites and Fe-P alloys — with the trade-offs against cost, temperature and supply risk made explicit.",
  },
  {
    icon: "globe",
    tag: "MARKET INTELLIGENCE",
    title: "Rare-Earth Supply Intelligence",
    description:
      "Real-time market intelligence on rare-earth oxide pricing, trade flows, supply disruption signals, and concentration metrics across 47 jurisdictions.",
  },
  {
    icon: "search",
    tag: "DUE DILIGENCE",
    title: "Supplier Assessment & Due Diligence",
    description:
      "Proprietary due diligence frameworks for magnet producers, sintering facilities, and alloy manufacturers — covering technical capability, ESG compliance, and financial resilience.",
  },
  {
    icon: "zap",
    tag: "EV SECTOR",
    title: "EV Motor Materials Consulting",
    description:
      "Specialised advisory for EV powertrain engineers and procurement leads. Magnet grade selection, thermal derating analysis, cost modelling, and second-source qualification.",
  },
  {
    icon: "recycle",
    tag: "CIRCULAR ECONOMY",
    title: "Recycling & Circular Economy",
    description:
      "Techno-economic analysis of magnet recycling pathways — HPMS, hydrometallurgy, direct demagnetisation — with market sizing, policy mapping, and investment case development.",
  },
  {
    icon: "factory",
    tag: "LOCALISATION",
    title: "Manufacturing Localisation Strategy",
    description:
      "Feasibility and site selection for domestic and near-shore magnet production capacity — India, Vietnam, Europe, North America — with regulatory, logistics, and cost-parity modelling.",
  },
  {
    icon: "chart",
    tag: "RESEARCH",
    title: "Industrial Market Intelligence",
    description:
      "Bespoke research covering motor market sizing, demand segmentation, competitive landscape mapping, and technology adoption curves across global industrial sectors.",
  },
  {
    icon: "cpu",
    tag: "AI-POWERED",
    title: "AI-Driven Materials Insights",
    description:
      "Proprietary AI models for magnet material recommendation, supply disruption forecasting, cost sensitivity modelling, and automated technical specification matching.",
  },
];

export const INDUSTRIES: Industry[] = [
  {
    icon: "car",
    name: "Electric Vehicles",
    cagr: "+38% CAGR",
    bars: [40, 55, 65, 80, 100],
    description:
      "EVs require 5–8× the magnet content of ICE vehicles. Over 30 car components rely on magnets — from power steering to ABS. Dr Gopalan's research directly addresses the EV motor magnet supply challenge.",
  },
  {
    icon: "plane",
    name: "Aerospace",
    cagr: "+12% CAGR",
    bars: [50, 58, 70, 75, 85],
    description:
      "Actuation systems, turbine components, and defence electronics demand the highest-spec SmCo and NdFeB grades — materials Dr Gopalan developed for DRDO and ISRO programmes.",
  },
  {
    icon: "bot",
    name: "Industrial Robotics",
    cagr: "+29% CAGR",
    bars: [30, 45, 65, 80, 100],
    description:
      "Collaborative robots and servo motors require high-density, thermally-stable permanent magnets at scale.",
  },
  {
    icon: "wind",
    name: "Renewable Energy",
    cagr: "+22% CAGR",
    bars: [35, 50, 68, 82, 95],
    description:
      "Direct-drive wind turbines use 600kg+ of magnets per MW. For 2–5 GW turbines, over 2,000 kg of high-performance magnets may be needed.",
  },
  {
    icon: "shield",
    name: "Defence Manufacturing",
    cagr: "+16% CAGR",
    bars: [60, 65, 72, 80, 88],
    description:
      "SmCo₅ magnets in missile guidance (Prithvi), satellite servo accelerometers, momentum wheels — the most supply-chain-sensitive magnet consumer.",
  },
  {
    icon: "cog",
    name: "Industrial Automation",
    cagr: "+19% CAGR",
    bars: [45, 55, 68, 78, 90],
    description:
      "Conveyor systems, magnetic separators, and linear actuators — foundational to smart factory infrastructure globally.",
  },
  {
    icon: "smartphone",
    name: "Consumer Electronics",
    cagr: "+8% CAGR",
    bars: [75, 78, 80, 83, 88],
    description:
      "Miniaturised magnets in speakers, haptics, and wearables — volume-driven, ESG-scrutinised supply chains.",
  },
];

export const QUICK_QUERIES: QuickQuery[] = [
  { label: "NdFeB vs SmCo", query: "Compare NdFeB vs SmCo for EV motors" },
  {
    label: "Supply chain risks",
    query: "What are the supply chain risks for rare-earth magnets?",
  },
  { label: "Recycling viability", query: "Explain magnet recycling feasibility" },
  {
    label: "High-temp grades",
    query: "Best magnet grade for high-temperature applications above 180 degrees?",
  },
  {
    label: "Price outlook",
    query: "What is driving NdPr price volatility and where do prices go next?",
  },
];

export const ADVISOR_CAPABILITIES: string[] = [
  "Grade recommendation (NdFeB, SmCo, Ferrite, AlNiCo)",
  "Temperature resistance & derating analysis",
  "Supply-chain alternative sourcing",
  "Cost sensitivity & price trajectory",
  "Recycling feasibility assessment",
  "Supply risk scoring by origin",
  "ESG compliance guidance",
  "Motor application matching",
];

export const INSIGHTS: Insight[] = [
  {
    featured: true,
    category: "SUPPLY STRATEGY",
    title:
      "The Concentration Problem: Building Genuine Resilience Into Magnet Supply",
    excerpt:
      "As Beijing tightens controls on gallium, germanium, and heavy rare earths, the fragility of Western magnet dependency has come into sharp relief. This deep-dive examines the regulatory architecture, corporate exposure by sector, and the realistic timeline for supply-chain diversification.",
    source: "TWIN POLE RESEARCH DESK",
    date: "JAN 2025",
    readTime: "14 MIN READ",
  },
  {
    category: "EV STRATEGY",
    title: "IPM vs. Induction: The Motor Architecture Decision Reshaping EV Procurement",
    excerpt:
      "IPM motors dominate efficiency benchmarks, but induction alternatives are gaining ground among OEMs hedging supply-chain risk. We model the cost and performance crossover through 2028.",
    source: "TWIN POLE ANALYTICS",
    date: "DEC 2024",
    readTime: "9 MIN READ",
  },
  {
    category: "RECYCLING ECONOMICS",
    title: "Building the Circular Magnet Economy: Investment Landscape and Techno-Economic Realities",
    excerpt:
      "A rigorous assessment of HPMS, short-loop recycling, and hydrometallurgical routes — comparing CapEx, recovery rates, and regulatory tailwinds across EU, US, and India.",
    source: "TWIN POLE RESEARCH DESK",
    date: "NOV 2024",
    readTime: "11 MIN READ",
  },
  {
    category: "INDUSTRIAL AI",
    title: "How AI Is Transforming Magnet Quality Inspection and Predictive Sourcing",
    excerpt:
      "Computer vision, spectroscopic AI, and LLM-driven procurement systems are changing how tier-1 manufacturers manage magnet intake quality and supplier intelligence.",
    source: "TWIN POLE LABS",
    date: "OCT 2024",
    readTime: "7 MIN READ",
  },
  {
    category: "MARKET INTELLIGENCE",
    title: "Praseodymium-Neodymium Prices: Structural Drivers and a 24-Month Forward View",
    excerpt:
      "NdPr oxide has seen 40% price swings in 18 months. We decompose the drivers — export quota policy, EV demand acceleration, inventory cycles — and model the forward price range through 2026.",
    source: "TWIN POLE ANALYTICS",
    date: "SEP 2024",
    readTime: "10 MIN READ",
  },
];

export const ABOUT_STATS: Credential[] = [
  { value: "200+", label: "Peer-reviewed publications (h-index 31)" },
  { value: "14", label: "National & international patents" },
  { value: "35+", label: "Years research experience (DRDO, ARCI, NIMS)" },
  { value: "₹200Cr+", label: "Science & technology projects led" },
];

export const VALUE_CARDS: ValueCardData[] = [
  {
    icon: "cog",
    title: "Industrial Depth, Strategic Breadth",
    description:
      "Our advisory has operated inside DRDO's national mission programmes, ARCI's automotive energy labs, and NIMS Japan's magnet research — understanding engineering constraints, commercial pressures, and supply realities simultaneously.",
  },
  {
    icon: "globe",
    title: "Policy-Aware Market Intelligence",
    description:
      "Rare-earth supply is shaped as much by policy as by geology. We track incentive schemes, export and quota rules, recycled-content mandates and processing investment across India, the EU, the US, Japan and Australia, and translate them into procurement decisions you can act on.",
  },
  {
    icon: "landmark",
    title: "Government & National Mission Experience",
    description:
      "Dr Gopalan served 22+ years on national mission projects at DRDO and ISRO. He spearheaded the Technical Research Centre at IIT Madras Research Park and set up India's National Facility for Atom Probe Tomography. We understand what sovereign supply-chain security actually means in practice.",
  },
  {
    icon: "lock",
    title: "Client Confidentiality First",
    description:
      "We operate under strict information barriers between client engagements. Our clients trust us with their most sensitive supply-chain architectures. That trust is the foundation of everything we do.",
  },
];

export const NARRATIVE_PILLARS: NarrativePillar[] = [
  {
    eyebrow: "CLARITY",
    headline: "See the supply chain before it moves.",
    copy: "Materials markets don't wait for board approval. We give you the signal early enough to actually act on it.",
  },
  {
    eyebrow: "ACCESS",
    headline: "A direct line to 35 years in the field.",
    copy: "Not a report written by a junior analyst. Direct strategic counsel from the person who helped build India's magnet research programmes.",
  },
  {
    eyebrow: "FORESIGHT",
    headline: "Plan for the market you'll face, not the one you're in.",
    copy: "From localisation strategy to recycling economics, we help you position for where critical materials are headed next.",
  },
];

export const ARRIVAL_SIGNALS: string[] = [
  "Your motor is losing margin at temperature and you are being told to add dysprosium.",
  "You have been quoted a grade and have no independent way to tell whether it is the right one.",
  "You need a second source qualified before your current one becomes a single point of failure.",
  "The magnet is the largest bill-of-materials risk in a programme you are costing.",
  "You are weighing whether to bring magnet production in-house, or in-country.",
  "You are assessing a supplier, a recycling route, or an acquisition target and need technical due diligence.",
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Twin Pole gave us the confidence to renegotiate our sourcing contract six months before the market shifted. That's not something a market report gives you.",
    attribution: "VP, Global Procurement",
    role: "Tier-1 EV Supplier",
  },
  {
    quote:
      "Dr Gopalan doesn't just know the chemistry — he knows the politics behind it. That combination is rare, and it's exactly what our board needed.",
    attribution: "Chief Strategy Officer",
    role: "Renewable Energy Developer",
  },
  {
    quote:
      "We came in looking for a grade recommendation. We left with an entire localisation roadmap.",
    attribution: "Head of Materials Engineering",
    role: "Aerospace Manufacturer",
  },
];

export const CREDENTIAL_GRID: Credential[] = [
  {
    value: "200+",
    label: "Peer-reviewed publications in international journals (h-index 31, i10-index 101)",
  },
  { value: "14", label: "National & international patents granted" },
  {
    value: "35+",
    label: "Years of research: DRDO, ARCI (DST), NIMS Japan, IIT Madras, IISc",
  },
  { value: "5 yrs", label: "Visiting Scientist & Special Researcher, NIMS Tsukuba, Japan" },
];

export const AWARDS: Award[] = [
  { year: "2023", text: "INAE National Chair Professorship, Indian National Academy of Engineering" },
  { year: "2022", text: "Lifetime Achievement Award, Rare Earths Association of India" },
  { year: "2021", text: "National Project Excellence Award, Project Management Associates of India" },
  { year: "2019", text: "51 Most Impactful Green Leaders (Global List), World CSR" },
  { year: "2018", text: "National Excellence Award in Science & Technology, Indian Society of Analytical Scientists" },
  { year: "2017", text: "Vasvik Industrial Award in Material Engineering, Vasvik Trust, Mumbai" },
  { year: "2014", text: "MRSI Medal Award, Materials Research Society of India" },
  { year: "2013", text: "Metallurgist of the Year Award, Ministry of Steel, Government of India" },
  { year: "2008", text: "DMRL (DRDO) Technology Award — Development of Sm₂Co₁₇ Magnets" },
  { year: "2006", text: "National Science Day (Sir CV Raman Day) Medal Award, DMRL, DRDO" },
  { year: "2005", text: "Cited: One of 21 Achievements in the 21st Century, NIMS Japan (nanocomposite magnets)" },
  { year: "1996", text: "Best PhD Thesis Award in Physics (Prof. AL Laskar Memorial Prize), IIT Madras" },
  { year: "1988", text: "Best Paper Award for publication in 'Nature', DRDO" },
];

export const FELLOWSHIP_TAGS: FellowshipTag[] = [
  { label: "FELLOW · INAE (2018)" },
  { label: "FELLOW · TELANGANA ACADEMY OF SCIENCES (2015)" },
  { label: "FELLOW · CHENNAI ACADEMY OF SCIENCES (2016)" },
  { label: "FELLOW · INDIAN INSTITUTE OF METALS (2020)" },
  { label: "FELLOW · ISAS (2020)" },
  { label: "DISTINGUISHED AICTE-INAE VISITING PROFESSOR" },
  { label: "ADJUNCT PROFESSOR · IISc BANGALORE" },
  { label: "ADJUNCT PROFESSOR · IIT MADRAS" },
];

export const RESEARCH_DOMAIN_TAGS: string[] = [
  "NdFeB PERMANENT MAGNETS",
  "SmCo MAGNETS",
  "EV BATTERY MATERIALS",
  "THERMOELECTRIC MATERIALS",
  "PEM FUEL CELLS",
  "ATOM PROBE TOMOGRAPHY",
  "SPARK PLASMA SINTERING",
  "Fe-P SOFT MAGNETIC ALLOYS",
  "RARE EARTH SUPPLY STRATEGY",
  "URBAN MINING & RECYCLING",
  "TWIN POLECALORIC MATERIALS",
  "HIGH-Tc SUPERCONDUCTORS",
];

export const GOVERNMENT_ROLES: GovernmentRole[] = [
  { role: "Member Invitee — Rare Earth Magnets, NITI AAYOG, Govt. of India (2018)" },
  { role: "Member, Steering Committee on Energy Storage, TIFAC, New Delhi (2018–present)" },
  {
    role: 'Member Invitee — "The Consultative Group on Future Transportation System", PSA Office, Govt. of India (2018–present)',
  },
  { role: "Advisory Committee Member, TIDCO Nanoscience & Technology, Tamil Nadu Government (2017–present)" },
  { role: "International Advisory Committee for Rare Earth Magnets, REPM (USA, Europe, Asia)" },
  { role: "Executive Member, Rare Earth Association of India (2015–present)" },
  { role: "Joint Secretary, Magnetics Society of India (2005–present)" },
  { role: "Research Advisory Board Member, ICAT (Under Ministry of Heavy Industry) (2020)" },
];

export const DR_GOPALAN_BIO = `Dr Raghavan Gopalan is one of India's pre-eminent materials scientists, with over 35 years spanning rare-earth permanent magnets, Li-ion batteries for EV applications, thermoelectric materials, and fuel cell technology. He obtained his B.Sc and M.Sc (Physics) from Madurai Kamaraj University, ranked First in M.Tech (Materials Technology) at Banaras Hindu University (1983), and was awarded the Best PhD Thesis Prize (Prof. AL Laskar Memorial Prize) from IIT Madras for his work on High-Tc Superconductors (1996).

He joined DRDO's Defence Metallurgical Research Laboratory, Hyderabad in 1985, where he led national mission programmes for DRDO and ISRO for over 22 years — including development of Sm₂Co₁₇ magnets for missile guidance and space applications. From 2003–2010, he conducted research at Japan's National Institute for Materials Science (NIMS), Tsukuba — cited as one of the '21 Achievements in the 21st Century' by NIMS for his work on SmCo/Fe nanocomposite thin films achieving an energy product of 32 MGOe, surpassing the theoretical limit of SmCo₅.

As Regional Director at ARCI Chennai (Department of Science & Technology, Government of India, 2019–2023), he led programmes worth over ₹200 crore — establishing the Centre for Automotive Energy Materials at IIT Madras Research Park, India's National Facility for Atom Probe Tomography, and a pilot plant for Li-ion battery cell manufacturing. He developed a novel Fe-P soft magnetic alloy with core loss of 162W/kg, outperforming conventional Si-steel — demonstrated as a cost-effective import substitute for EV motor applications, with technology transfer to Lucas TVS and AQUASUB. He is currently INAE Chair Professor (2023–2026) and Adjunct Professor at IISc Bangalore.`;

export const CONSULTATION_TIERS: ConsultationTier[] = [
  {
    id: "discovery",
    badge: "FREE · 30 MINUTES",
    price: "Free",
    sub: "DISCOVERY CALL",
    name: "Introductory Session",
    features: [
      "Scope your challenge with Dr Gopalan",
      "Understand if Twin Pole is the right fit",
      "High-level strategic orientation",
      "No obligation, no pitch",
    ],
    buttonLabel: "BOOK FREE CALL →",
    variant: "standard",
  },
  {
    id: "expert",
    badge: "PAID · 60 MINUTES",
    featuredBadge: "MOST POPULAR",
    price: "$950",
    sub: "STRATEGY SESSION",
    name: "Expert Consultation",
    features: [
      "Deep-dive directly with Dr Gopalan",
      "Specific materials or sourcing challenge",
      "Grade selection or supply chain risk assessment",
      "Written summary of key outputs",
      "Recording provided on request",
    ],
    buttonLabel: "BOOK STRATEGY SESSION →",
    variant: "featured",
  },
  {
    id: "retainer",
    badge: "RETAINED · ONGOING",
    price: "Custom",
    sub: "ADVISORY RETAINER",
    name: "Retained Partnership",
    features: [
      "Monthly access to Dr Gopalan",
      "Priority intelligence briefings",
      "Ongoing procurement support",
      "Custom research deliverables",
      "Board & government presentation support",
    ],
    buttonLabel: "ENQUIRE ABOUT RETAINER →",
    variant: "gold",
  },
];

export const TIMEZONES = ["IST", "SGT", "GMT", "EST", "PST", "JST", "GST", "AEST"];

export const FOOTER_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Book Dr Gopalan", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/* Site identity                                                       */
/* ------------------------------------------------------------------ */

export const SITE = {
  name: "Twin Pole Partners",
  short: "Twin Pole",
  url: "https://twinpolepartners.com",
  description:
    "Strategic advisory for rare-earth permanent magnets, EV supply chains, and advanced manufacturing intelligence.",
  /* General enquiries. Anything that is not a booking lands here. */
  email: "info@twinpolepartners.com",
};

/* ------------------------------------------------------------------ */
/* Scheduling                                                          */
/*                                                                     */
/* Paste a Calendly / Cal.com / Google Appointment link against a tier */
/* and its button becomes live booking. Leave it empty and that tier   */
/* falls back to the request form, so the page works either way.       */
/* ------------------------------------------------------------------ */

export const SCHEDULING: Record<string, string> = {
  discovery: "", // e.g. https://calendly.com/twinpole/discovery-30min
  expert: "", //    e.g. https://calendly.com/twinpole/strategy-60min
  retainer: "", //  retainer stays an enquiry - no self-serve slot
};

/* ------------------------------------------------------------------ */
/* Demagnetisation curve — the three parameters every grade decision   */
/* comes back to.                                                      */
/* ------------------------------------------------------------------ */

export interface CurveParam {
  symbol: string;
  name: string;
  description: string;
}

export const CURVE_PARAMS: CurveParam[] = [
  {
    symbol: "Br",
    name: "Remanence",
    description:
      "How much field the magnet keeps once you stop driving it. Sets torque density — and therefore how much magnet mass your motor design actually needs.",
  },
  {
    symbol: "Hc",
    name: "Coercivity",
    description:
      "How hard it is to demagnetise. This is the parameter that fails first at temperature, and the one that quietly forces dysprosium into your bill of materials.",
  },
  {
    symbol: "BH",
    name: "Energy product",
    description:
      "Peak of the second quadrant — the honest measure of grade. It is also where cost, thermal headroom, and sourcing risk all collide.",
  },
];

/* ------------------------------------------------------------------ */
/* Photographic plates                                                 */
/*                                                                     */
/* Each plate names a local file under /public/plates/ and the remote  */
/* original it came from. `npm run plates` (which also runs as the     */
/* build's prebuild step) mirrors the remote into the local path, so a */
/* deployed site normally serves its own copies. If a local file is    */
/* missing the plate falls back to `remote`, and only if that fails    */
/* too does the reserved frame appear — so a slot cannot silently sit  */
/* empty the way it did before.                                        */
/*                                                                     */
/* NOTE ON PROVENANCE: every plate except the portrait is AI-generated */
/* illustrative imagery, not an archival photograph. The captions      */
/* describe the subject without asserting documentary provenance.      */
/* Replace them with licensed or commissioned photography before this  */
/* site carries real client weight.                                    */
/* ------------------------------------------------------------------ */

const CDN = "https://cdn.gamma.app/n3mmv9l056in4it/design-anything";

export interface Plate {
  id: string;
  src?: string;
  /** Origin the local file is mirrored from; also the runtime fallback. */
  remote?: string;
  caption: string;
  subject: string;
  /** "duotone" grades the image into the brand palette; "natural" leaves a
   *  face looking like a face. Portraits are the trust asset — a violet
   *  Dr Gopalan would undercut exactly what the photograph is there to do. */
  treatment?: "duotone" | "natural";
}

export const PLATES: Record<string, Plate> = {
  hero: {
    id: "hero",
    src: "/plates/filings.jpg",
    remote: `${CDN}/EwENhrDxr49In2PjYeMaM/a8UuALSsv4smM6JFPW1bW.jpg`,
    caption: "Iron filings on a dipole field",
    subject: "Iron filings, dipole field",
  },
  foundry: {
    id: "foundry",
    src: "/plates/foundry.jpg",
    remote: `${CDN}/ZkLnmMWbulq459iGJuBMC/qjxSf9A82t0cT75enEV2f.jpg`,
    caption: "Vacuum induction melting — permanent-magnet foundry",
    subject: "Vacuum induction furnace · magnet foundry",
  },
  lab: {
    id: "lab",
    src: "/plates/lab.jpg",
    remote: `${CDN}/wcj9WWIM5xEyNd6Hylhl9/eqh9tPXOa7WZ1J5yq5VB8.jpg`,
    caption: "Materials characterisation laboratory",
    subject: "Materials laboratory · magnetometry bench",
  },
  bench: {
    id: "bench",
    src: "/plates/bench.jpg",
    remote: `${CDN}/9dBxk9fBOgY2Gr6rpOSVu/arMzstnyBbAxEvf2oYecb.jpg`,
    caption: "Sintered block on the surface plate — dimensional check",
    subject: "Metrology bench · sintered block",
  },
  rotor: {
    id: "rotor",
    src: "/plates/rotor.jpg",
    remote: `${CDN}/IFBoiCk7mzqQqdQws0iHY/m0gBsXflKg4vtarU_s6Vj.jpg`,
    caption: "Traction rotor, laminated stack with magnet slots",
    subject: "EV traction rotor · assembly hall",
  },
  archive: {
    id: "archive",
    src: "/plates/archive.jpg",
    remote: `${CDN}/ii7lvi0hrmKrELvT66NzM/MJ60yBb-P2ZNrzeSBJ-eb.jpg`,
    caption: "The literature, read closely",
    subject: "Research reading room",
  },
  boardroom: {
    id: "boardroom",
    src: "/plates/boardroom.jpg",
    remote: `${CDN}/BUXJFj3gj5tSMs3M7FLOv/vh5sR_VioeOtwVr_tiz2Q.jpg`,
    caption: "Where the decision actually gets made",
    subject: "Boardroom at dusk",
  },
  terrain: {
    id: "terrain",
    src: "/plates/terrain.jpg",
    remote: `${CDN}/zz6F3NnJE3H71sR4UfpZV/XzT49gu_Zq190PC6bezpO.jpg`,
    caption: "Separation and settling — the upstream end of the chain",
    subject: "Rare-earth processing plant",
  },
  gap: {
    id: "gap",
    src: "/plates/gap.jpg",
    remote: `${CDN}/P1GBXjwQJ1XsHA4YZSkSh/9jX_350UgaE7scvnOqh8J.jpg`,
    caption: "Sample entering the pole gap",
    subject: "Electromagnet pole gap",
  },
  portrait: {
    id: "portrait",
    src: "/plates/gopalan.webp",
    caption: "Dr Raghavan Gopalan",
    subject: "Portrait",
    treatment: "natural",
  },
};
