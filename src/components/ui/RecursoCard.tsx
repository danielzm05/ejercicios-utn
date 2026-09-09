import { Recurso } from "@/types/database"
import Link from "next/link"

export interface RecursoCardProps{
  nombre: string;
  descripcion: string;
  link: string;
  color_bg: string;
  color_border: string;
  categoria_nombre: string;
}

function RecursoCard({nombre, descripcion, link, categoria_nombre, color_bg, color_border}:RecursoCardProps) {
  return (
    <article className="rounded-sm bg-card h-full shadow-bs1 py-3 px-5 border-2 border-border1 flex flex-col gap-1" 
    >
      <h2 className="text-t1 font-font1 text-2xl">{nombre}</h2>
      <p className="text-t2 font-font2 text-sm">"{descripcion}"</p>
      <div className="mt-2 flex justify-between">
        <span className="mt-2 uppercase max-w-fit px-2 rounded-sm text-sm font-font2 border" style={{background: color_bg, color: color_border}}>{categoria_nombre}</span>
        {link && <Link href={link} className="text-xl px-2 border-2 border-r-border2 border-b-border2 border-t-white border-l-white text-t2 font-font1 shadow-bs1 ">Ver más</Link> }
      </div>
    </article>
  )
}

export default RecursoCard