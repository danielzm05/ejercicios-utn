import { Code, BookText, User2, CheckCircle2, Cpu, ChartSpline, Layers, MoveUpRight, Layout, Briefcase, Users, Brain, Activity, TrendingUp, MonitorCog, Scale, Terminal, Move3d,  EqualApproximately, FileCode,  BarChart2, LineChart, Calculator, Languages, Binary, Network, Zap, Laptop, ShieldCheck, Database, Radio} from 'lucide-react';

export const ICON_MAP = {
  BookText,
  User2,
  CheckCircle2, 
  ChartSpline, 
  Cpu,
  Layers, 
  MoveUpRight, 
  Layout, 
  Network, 
  Briefcase, 
  Users, 
  Brain, 
  Activity, 
  TrendingUp, 
  MonitorCog, 
  Scale, 
  Terminal, 
  Move3d, 
  EqualApproximately, 
  FileCode, 
  BarChart2, 
  LineChart, 
  Calculator, 
  Languages, 
  Binary, 
  Zap, 
  Laptop, 
  ShieldCheck, 
  Database, 
  Radio
};

interface IconRendererProps {
  iconName: keyof typeof ICON_MAP;
  size?: number; 
  color?: string;
}

export function IconRenderer({ iconName, size = 24, color }: IconRendererProps) {
  const IconComponent = ICON_MAP[iconName] || BookText; 
  
  return <IconComponent size={size} color={color} strokeWidth={1.5} />;
}