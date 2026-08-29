import Link from "next/link";
import { MarkdownViewer } from "../shared/MarkdownViewer";

interface EjercicioLinkProps {
  id_ejercicio: string;
  id_examen: string;
  consigna: string;
  index: number
}

function EjercicioLink({ id_ejercicio, id_examen, consigna, index }: EjercicioLinkProps) {
  return (
    <Link href={`/${id_examen}/${id_ejercicio}`}>
      <div className={`flex flex-col gap-1 rounded-sm py-5 px-5 hover:bg-white/3 border-t-3 border-t-border1  ${index%2 ? 'bg-card' : 'bg-card2  '}`}>
        <h3 className="font-font1 text-2xl">Ejercicio {index}</h3>
        <div className="flex flex-col gap-5 text-sm sm:text-base ">
          <MarkdownViewer content={consigna} />
        </div>
      </div>
    </Link>
  );
}

export default EjercicioLink;
