import { IconRenderer, ICON_MAP } from "./IconRenderer";
import Link from "next/link";

interface EspecialidadCardProps {
  nombre: string;
  duracion: number;
  color_bg: string;
  color_border: string;
  icon_name: keyof typeof ICON_MAP;
}

export function EspecialidadCard({ icon_name, nombre, duracion, color_bg, color_border }: EspecialidadCardProps) {
  return (
    <Link href={`/especialidad/${nombre.toLowerCase()}`}>
      <article 
        className="rounded-lg transition-all duration-300 transform-gpu flex items-center gap-3 sm:gap-8 p-3 sm:p-8 relative md:border-r-[1.2px] border-t-[1.2px] border-white/10 bg-linear-to-br from-blue-300/1 to-blue-300/4 hover:from-blue-300/2 hover:to-blue-300/10 h-full delay-150"
      >
        <div 
          className="rounded-lg border-3 w-15 h-15 p-1 flex justify-center items-center shrink-0" 
          style={{ backgroundColor: color_bg, borderColor: color_border }}
        >
          <IconRenderer iconName={icon_name} size={45} color={color_border} />
        </div>
        
        <div className="flex flex-col">
          <h2 className="font-heading text-2xl sm:text-3xl text-text-2 font-semibold">{nombre}</h2>
          {duracion && (
            <span className="font-p uppercase text-text-3">{duracion} Años</span>
          )}
        </div>
      </article>
    </Link>
  )
} 