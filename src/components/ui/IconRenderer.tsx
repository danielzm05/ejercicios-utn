import { Code, Factory,  Move3d, CircuitBoard, Zap, FlaskConical, BookText, Ship, HardHat, Spool, Bold} from 'lucide-react';

export const ICON_MAP = {
  move3d: Move3d,
  factory: Factory,
  circuitBoard: CircuitBoard,
  zap: Zap,
  flaskConical: FlaskConical,
  code: Code,
  bookText: BookText,
  ship: Ship,
  hardHat: HardHat,
  spool: Spool,
  bold: Bold,
};

interface IconRendererProps {
  iconName: keyof typeof ICON_MAP;
  size?: number; 
  color?: string;
}

export function IconRenderer({ iconName, size = 24, color }: IconRendererProps) {
  const IconComponent = ICON_MAP[iconName] || BookText; 
  
  return <IconComponent size={size} color={color} />;
}