'use client';
import { usePathname } from "next/dist/client/components/navigation";
import { User } from "lucide-react";
import Link from "next/link";

interface ExamenCardProps {
  id: string;
  nombre: string;
  año: number;
  profesor?: {
    nombre: string;
  };
  examen_categoria: {
    color: string;
  };
}

export function ExamenCard({ id, nombre, año, profesor, examen_categoria }: ExamenCardProps) {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/examen/${id}`} className="w-full">
      <article className="rounded-r-lg transition-all duration-300 transform-gpu flex gap-8 relative md:border-r-[1.2px] border-t-[1.2px] border-white/10 bg-linear-to-br from-blue-300/1 to-blue-300/4 hover:from-blue-300/2 hover:to-blue-300/10 h-full delay-150">
        <div className="w-0.5" style={{ backgroundColor: examen_categoria.color }}></div>
        <div className="flex flex-col gap-3 py-8 ">
          <h2 className="font-heading text-lg sm:text-xl text-text-2">{nombre}</h2>

          {profesor && (
            <p className="flex items-center gap-2 font-p uppercase text-text-3">
              <User size={16} />
              {profesor.nombre}
            </p>
          )}
          <p className="flex items-center gap-2 font-p uppercase text-text-3">{año}</p>
        </div>
      </article>
    </Link>
  )
}

