import { createClient } from "@/lib/supabase/server";
import { MarkdownViewer } from "@/components/shared/MarkdownViewer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Comment from "@/components/shared/comment";
import Link from "next/link";

interface Ejercicio {
  id_ejercicio: string;
  id_examen: string;
  consigna: string;
  respuesta: string | null;
  numero: number | null;
  video: string | null;
  created_at: string;
}

interface Examen {
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
  ejercicio: Ejercicio[];
}

interface PageProps {
  params: Promise<{ examenId: string; ejercicioId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { examenId, ejercicioId } = await params;
  const supabase = await createClient();

  const { data: examen, error } = await supabase.from("examen").select("*, examen_categoria(*), ejercicio(*)").eq("id_examen", examenId).single<Examen>();

  if (error || !examen) {
    return <p>Error al cargar el ejercicio</p>;
  }

  const ejercicioIndex = examen.ejercicio.findIndex((e) => e.id_ejercicio === ejercicioId);

  if (ejercicioIndex === -1) {
    return <p>Ejercicio no encontrado</p>;
  }

  const ejercicio = examen.ejercicio[ejercicioIndex];
  const prevEjercicio = examen.ejercicio[ejercicioIndex - 1] ?? null;
  const nextEjercicio = examen.ejercicio[ejercicioIndex + 1] ?? null;

  return (
    <main className="h-full flex flex-col gap-10 justify-left p-8 sm:p-20">
      <article className="flex flex-col gap-3 bg-card rounded-xl border-2 border-border1 shadow-bs1 sm:text-2xl">
        <header className="font-font1">
          <div className="rounded-t-xl font-font1 text-t1 text-3xl px-5 py-1 border-t-6 border-t-amber-50/50 border-b-6 border-b-black/50" style={{backgroundColor: examen.examen_categoria.color}}>
            <Link href={`/${examenId}`} className="text-t1 hover:underline">
              {examen.examen_categoria.nombre} {examen.año}
            </Link>
          </div>
          <p className="text-2xl bg-card2 border-b-2 border-border1 text-t2 px-5 ">Ejercicio {ejercicioIndex+1}</p>
        </header>
        <section className="flex flex-col gap-5 p-5 text-base">
      
          <MarkdownViewer content={ejercicio.consigna} />

          {ejercicio.respuesta && (
            <details className="flex flex-col gap-3">
              <summary className="text-2xl cursor-pointer text-t1 font-font1 select-none">Ver respuesta</summary>
              <div className="text-t2">
                <MarkdownViewer content={ejercicio.respuesta} />
              </div>
            </details>
          )}
        </section>

        <footer className="flex justify-end items-center">

          {prevEjercicio &&
            <Link href={`/${examenId}/${prevEjercicio.id_ejercicio}`} title={`Ejercicio ${ejercicioIndex}`} className="p-3 text-t2 ">
              <ChevronLeft size={22} />
            </Link>}


            <Link href={`/${examenId}/${nextEjercicio?.id_ejercicio}`} title={`Ejercicio ${ejercicioIndex+2}`} className={`p-3 text-t2 border-border2 ${nextEjercicio ? 'visible' : 'invisible'}`}>
              <ChevronRight size={22} />
            </Link>
        </footer>
      </article>
    </main>
  );
}
