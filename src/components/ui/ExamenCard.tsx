import { User } from "lucide-react";
import Link from "next/link";
interface ExamenCardProps {
  id: string;
  descripcion: string;
  año: number;
  profesor?: {
    nombre: string;
  };
  examen_categoria: {
    nombre: string;
    color: string;
  };
}

export function ExamenCard({ id, descripcion, año, profesor, examen_categoria }: ExamenCardProps) {

  return (
    <Link href={`/${id}`} className="w-full">
      <article className="flex flex-col rounded-sm bg-card h-full shadow-bs1 py-3 px-5 outline-2 outline-border1 border-l-4" style={{borderColor: examen_categoria.color}}>
          <h2 className="font-font1 text-xl sm:text-2xl text-t1">{examen_categoria.nombre} {año}</h2>
          <p className="font-font1 text-lg sm:text-xl text-t2">{descripcion}</p>

          {profesor && (
            <p className="flex items-center gap-1 font-font1 text-lg sm:text-xl text-t2">
              <User size={14}/>
              {profesor.nombre}
            </p>
          )}
      </article>
    </Link>
  )
}

