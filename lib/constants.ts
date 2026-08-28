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
    label: "EV Motor Demand 2030E",
    value: 2.8,
    decimals: 1,
    suffix: "M t",
    sub: "↑ 38% CAGR vs. 2023",
  },
  {
    label: "China RE Supply Share",
    value: 85,
    suffix: "%",
    sub: "Critical concentration risk",
  },
  {
    label: "NdFeB Recycling Market",
    value: 24,
    prefix: "$",
    suffix: "B",
    sub: "Circular economy potential",
  },
  {
    label: "Industrial AI Adoption",
    value: 73,
    suffix: "%",
    sub: "Advanced mfg leaders",
  },
];

export const SERVICES: Service[] = [
  {
    icon: "🧲",
    tag: "TIER-1 ADVISORY",
    title: "Magnet Strategy Advisory",
    description:
      "End-to-end strategic advisory for organisations dependent on permanent magnet supply. We assess grade requirements, sourcing risk, and long-term procurement architecture.",
  },
  {
    icon: "🌐",
    tag: "MARKET INTELLIGENCE",
    title: "Rare-Earth Supply Intelligence",
    description:
      "Real-time market intelligence on rare-earth oxide pricing, trade flows, geopolitical disruption signals, and supply-chain concentration metrics across 47 jurisdictions.",
  },
  {
    icon: "🔍",
    tag: "DUE DILIGENCE",
    title: "Supplier Assessment & Due Diligence",
    description:
      "Proprietary due diligence frameworks for magnet producers, sintering facilities, and alloy manufacturers — covering technical capability, ESG compliance, and financial resilience.",
  },
  {
    icon: "⚡",
    tag: "EV SECTOR",
    title: "EV Motor Materials Consulting",
    description:
      "Specialised advisory for EV powertrain engineers and procurement leads. Magnet grade selection, thermal derating analysis, cost modelling, and second-source qualification.",
  },
  {
    icon: "♻️",
    tag: "CIRCULAR ECONOMY",
    title: "Recycling & Circular Economy",
    description:
      "Techno-economic analysis of magnet recycling pathways — HPMS, hydrometallurgy, direct demagnetisation — with market sizing, policy mapping, and investment case development.",
  },
  {
    icon: "🏭",
    tag: "LOCALISATION",
    title: "Manufacturing Localisation Strategy",
    description:
      "Feasibility and site selection for magnet production capacity outside China — India, Vietnam, Europe, North America — with regulatory, logistics, and cost-parity modelling.",
  },
  {
    icon: "📊",
    tag: "RESEARCH",
    title: "Industrial Market Intelligence",
    description:
      "Bespoke research covering motor market sizing, demand segmentation, competitive landscape mapping, and technology adoption curves across global industrial sectors.",
  },
  {
    icon: "🤖",
    tag: "AI-POWERED",
    title: "AI-Driven Materials Insights",
    description:
      "Proprietary AI models for magnet material recommendation, supply disruption forecasting, cost sensitivity modelling, and automated technical specification matching.",
  },
];

export const INDUSTRIES: Industry[] = [
  {
    icon: "🚗",
    name: "Electric Vehicles",
    cagr: "+38% CAGR",
    bars: [40, 55, 65, 80, 100],
    description:
      "EVs require 5–8× the magnet content of ICE vehicles. Over 30 car components rely on magnets — from power steering to ABS. Dr Gopalan's research directly addresses the EV motor magnet supply challenge.",
  },
  {
    icon: "✈️",
    name: "Aerospace",
    cagr: "+12% CAGR",
    bars: [50, 58, 70, 75, 85],
    description:
      "Actuation systems, turbine components, and defence electronics demand the highest-spec SmCo and NdFeB grades — materials Dr Gopalan developed for DRDO and ISRO programmes.",
  },
  {
    icon: "🤖",
    name: "Industrial Robotics",
    cagr: "+29% CAGR",
    bars: [30, 45, 65, 80, 100],
    description:
      "Collaborative robots and servo motors require high-density, thermally-stable permanent magnets at scale.",
  },
  {
    icon: "💨",
    name: "Renewable Energy",
    cagr: "+22% CAGR",
    bars: [35, 50, 68, 82, 95],
    description:
      "Direct-drive wind turbines use 600kg+ of magnets per MW. For 2–5 GW turbines, over 2,000 kg of high-performance magnets may be needed.",
  },
  {
    icon: "🛡️",
    name: "Defence Manufacturing",
    cagr: "+16% CAGR",
    bars: [60, 65, 72, 80, 88],
    description:
      "SmCo₅ magnets in missile guidance (Prithvi), satellite servo accelerometers, momentum wheels — the most supply-chain-sensitive magnet consumer.",
  },
  {
    icon: "⚙️",
    name: "Industrial Automation",
    cagr: "+19% CAGR",
    bars: [45, 55, 68, 78, 90],
    description:
      "Conveyor systems, magnetic separators, and linear actuators — foundational to smart factory infrastructure globally.",
  },
  {
    icon: "📱",
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
    label: "China pricing impact",
    query: "How does China dominance affect rare-earth pricing?",
  },
];

export const ADVISOR_CAPABILITIES: string[] = [
  "Grade recommendation (NdFeB, SmCo, Ferrite, AlNiCo)",
  "Temperature resistance & derating analysis",
  "Supply-chain alternative sourcing",
  "Cost sensitivity & price trajectory",
  "Recycling feasibility assessment",
  "Geopolitical risk scoring by origin",
  "ESG compliance guidance",
  "Motor application matching",
];

export const INSIGHTS: Insight[] = [
  {
    featured: true,
    category: "GEOPOLITICS",
    title:
      "The Rare-Earth Standoff: How China's Export Controls Are Reshaping Global Magnet Supply Chains",
    excerpt:
      "As Beijing tightens controls on gallium, germanium, and heavy rare earths, the fragility of Western magnet dependency has come into sharp relief. This deep-dive examines the regulatory architecture, corporate exposure by sector, and the realistic timeline for supply-chain diversification.",
    source: "MAGNETO RESEARCH DESK",
    date: "JAN 2025",
    readTime: "14 MIN READ",
  },
  {
    category: "EV STRATEGY",
    title: "IPM vs. Induction: The Motor Architecture Decision Reshaping EV Procurement",
    excerpt:
      "IPM motors dominate efficiency benchmarks, but induction alternatives are gaining ground among OEMs hedging supply-chain risk. We model the cost and performance crossover through 2028.",
    source: "MAGNETO ANALYTICS",
    date: "DEC 2024",
    readTime: "9 MIN READ",
  },
  {
    category: "RECYCLING ECONOMICS",
    title: "Building the Circular Magnet Economy: Investment Landscape and Techno-Economic Realities",
    excerpt:
      "A rigorous assessment of HPMS, short-loop recycling, and hydrometallurgical routes — comparing CapEx, recovery rates, and regulatory tailwinds across EU, US, and India.",
    source: "MAGNETO RESEARCH DESK",
    date: "NOV 2024",
    readTime: "11 MIN READ",
  },
  {
    category: "INDUSTRIAL AI",
    title: "How AI Is Transforming Magnet Quality Inspection and Predictive Sourcing",
    excerpt:
      "Computer vision, spectroscopic AI, and LLM-driven procurement systems are changing how tier-1 manufacturers manage magnet intake quality and supplier intelligence.",
    source: "MAGNETO LABS",
    date: "OCT 2024",
    readTime: "7 MIN READ",
  },
  {
    category: "MARKET INTELLIGENCE",
    title: "Praseodymium-Neodymium Prices: Structural Drivers and a 24-Month Forward View",
    excerpt:
      "NdPr oxide has seen 40% price swings in 18 months. We decompose the drivers — Chinese quotas, EV demand acceleration, inventory cycles — and model the forward price range through 2026.",
    source: "MAGNETO ANALYTICS",
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
    icon: "⚙️",
    title: "Industrial Depth, Strategic Breadth",
    description:
      "Our advisory has operated inside DRDO's national mission programmes, ARCI's automotive energy labs, and NIMS Japan's magnet research — understanding engineering constraints, commercial pressures, and geopolitical realities simultaneously.",
  },
  {
    icon: "🌐",
    title: "Geopolitically-Aware Intelligence",
    description:
      "Rare-earth markets are political markets. Dr Gopalan has tracked China's resource strategy since Program 863. We translate policy signals from China, India's IREL ecosystem, the US, EU, Japan, and Australia into actionable procurement intelligence.",
  },
  {
    icon: "🏛️",
    title: "Government & National Mission Experience",
    description:
      "Dr Gopalan served 22+ years on national mission projects at DRDO and ISRO. He spearheaded the Technical Research Centre at IIT Madras Research Park and set up India's National Facility for Atom Probe Tomography. We understand what sovereign supply-chain security actually means in practice.",
  },
  {
    icon: "🔒",
    title: "Client Confidentiality First",
    description:
      "We operate under strict information barriers between client engagements. Our clients trust us with their most sensitive supply-chain architectures. That trust is the foundation of everything we do.",
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
  "MAGNETOCALORIC MATERIALS",
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
      "Understand if Magneto is the right fit",
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
