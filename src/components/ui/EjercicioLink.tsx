import Link from "next/link";
import { MarkdownViewer } from "../shared/MarkdownViewer";

interface EjercicioLinkProps {
  id_ejercicio: string;
  id_examen: string;
  consigna: string;
}

function EjercicioLink({ id_ejercicio, id_examen, consigna }: EjercicioLinkProps) {
  return (
    <Link href={`/${id_examen}/${id_ejercicio}`}>
      <div className=" rounded-lg py-5 px-2 hover:bg-white/5 transition-colors duration-200s">
        <MarkdownViewer content={consigna} />
      </div>
    </Link>
  );
}

export default EjercicioLink;
