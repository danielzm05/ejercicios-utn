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
      <article className="bg-card rounded-lg p-5 h-full flex flex-col gap-3 border border-border-2 hover:border-border-1 transition-colors delay-150">
        <header className="flex flex-col gap-2">
          <div className={`bg-[${colorBg}] rounded-lg w-10 h-10 p-1 flex justify-center items-center `}>
            <IconRenderer iconName={icon_name} size={38} color={colorBorder} />
          </div>
          <h2 className="font-heading text-xl text-text-1 font-semibold">{title}</h2>
          <span className="font-p uppercase text-text-3">Nivel {level}</span>
        </header>
      </article>
    </Link>
  );
}

export default MateriaCard;
