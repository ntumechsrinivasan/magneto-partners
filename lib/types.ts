export interface Service {
  icon: string;
  tag: string;
  title: string;
  description: string;
}

export interface Industry {
  icon: string;
  name: string;
  cagr: string;
  bars: number[];
  description: string;
}

export interface Insight {
  featured?: boolean;
  category: string;
  title: string;
  excerpt: string;
  source: string;
  date: string;
  readTime: string;
}

export interface Award {
  year: string;
  text: string;
}

export interface Credential {
  value: string;
  label: string;
}

export interface ConsultationTier {
  id: string;
  badge: string;
  featuredBadge?: string;
  price: string;
  sub: string;
  name: string;
  features: string[];
  buttonLabel: string;
  variant: "standard" | "featured" | "gold";
}

export interface GovernmentRole {
  role: string;
}

export interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  sub: string;
}

export interface QuickQuery {
  label: string;
  query: string;
}

export interface ChatMessageData {
  id: string;
  role: "user" | "bot";
  text: string;
}

export interface ChatResponseRule {
  keywords: string[];
  response: string;
}

export interface ValueCardData {
  icon: string;
  title: string;
  description: string;
}

export interface FellowshipTag {
  label: string;
}
