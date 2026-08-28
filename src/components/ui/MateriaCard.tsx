'use client'
import Link from "next/link";
import {IconRenderer, ICON_MAP} from "./IconRenderer";
import { usePathname } from "next/dist/client/components/navigation";
interface MateriaCardProps {
  acronym: string;
  title: string;
  level: number;
  colorBg: string;
  colorBorder: string;
  icon_name: keyof typeof ICON_MAP;
}

function MateriaCard({ acronym, title, level, colorBg, colorBorder, icon_name }: MateriaCardProps) {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/${acronym}`}>
      <article className="bg-card rounded-sm p-4 h-full flex items-center gap-4 border-2 border-border1 shadow-bs1">
          <span className={`w-12 h-12 p-1 flex justify-center items-center outline-2 rounded-xs border-t-2 border-l-2 border-black`} style={{backgroundColor: colorBg, outlineColor: colorBorder}}>
            <IconRenderer iconName={icon_name} size={40} color={colorBorder} />
          </span>
          <span >
            <h2 className="font-font1 text-xl sm:text-2xl" >{title}</h2>
            <span className="font-font1 text-lg sm:text-xl text-t2">{acronym} - Nivel {level}</span>
          </span>
      </article>
    </Link>
  );
}

export default MateriaCard;
