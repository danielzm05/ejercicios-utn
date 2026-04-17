import React from "react";
import { Move3d, ChartSpline } from "lucide-react";
import Link from "next/link";

type IconName = "Move3d" | "ChartSpline";

interface MateriaCardProps {
  acronym: string;
  title: string;
  level: number;
}

function MateriaCard({ acronym, title, level }: MateriaCardProps) {
  return (
    <Link href={`/materias/${acronym}`}>
      <article className="bg-card rounded-lg p-5 h-full flex flex-col gap-3 ">
        <header className="flex flex-col gap-2">
          <div className="bg-[#123456] rounded-lg w-10 h-10 p-1 flex justify-center items-center">{/* <Move3d size={38} color='#FFF' /> */}</div>
          <h2 className="font-heading text-xl text-text-1 font-semibold">{title}</h2>
          <span className="font-p uppercase text-text-3">Nivel {level}</span>
        </header>
      </article>
    </Link>
  );
}

export default MateriaCard;
