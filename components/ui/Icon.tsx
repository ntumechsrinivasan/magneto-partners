import {
  Magnet,
  Globe,
  Search,
  Zap,
  Recycle,
  Factory,
  BarChart3,
  Cpu,
  Car,
  Plane,
  Bot,
  Wind,
  Shield,
  Cog,
  Smartphone,
  Landmark,
  Lock,
  type LucideProps,
} from "lucide-react";

const ICON_MAP = {
  magnet: Magnet,
  globe: Globe,
  search: Search,
  zap: Zap,
  recycle: Recycle,
  factory: Factory,
  chart: BarChart3,
  cpu: Cpu,
  car: Car,
  plane: Plane,
  bot: Bot,
  wind: Wind,
  shield: Shield,
  cog: Cog,
  smartphone: Smartphone,
  landmark: Landmark,
  lock: Lock,
} as const;

export type IconKey = keyof typeof ICON_MAP;

export default function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = ICON_MAP[name as IconKey] ?? Magnet;
  return <Component {...props} />;
}
