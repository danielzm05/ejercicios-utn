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
    <main className="h-full flex flex-col gap-10 justify-left p-20">
      <article className="flex flex-col gap-3 bg-card rounded-sm border-2 border-border1 shadow-bs1 sm:text-2xl">
        <header className="px-5 pt-5">
          <Link href={`/${examenId}`} className="text-t2 text-2xl font-font1 hover:underline">
            {examen.examen_categoria.nombre} {examen.año}
          </Link>
        </header>
        <section className="px-5 py-7">
      
        <MarkdownViewer content={ejercicio.consigna} />

        {ejercicio.respuesta && (
          <details className="mt-4">
            <summary className="cursor-pointer text-text-2 font-semibold select-none">Ver respuesta</summary>
            <div className="mt-2 border-t pt-4">
              <MarkdownViewer content={ejercicio.respuesta} />
            </div>
          </details>
        )}
        </section>

        <footer className="flex justify-between items-center outline-2 outline-border1 border-t-3 border-border2">
          {prevEjercicio ? (
            <Link href={`/${examenId}/${prevEjercicio.id_ejercicio}`} className="flex items-center gap-1 text-t2 font-font1 hover:underline">
              <ChevronLeft size={18} />
              Ejercicio anterior
            </Link>
          ) : (
            <span />
          )}

          <span className="text-t2 text-xl font-font1">
            {ejercicioIndex + 1} / {examen.ejercicio.length}
          </span>

          {nextEjercicio ? (
            <Link href={`/${examenId}/${nextEjercicio.id_ejercicio}`} className="px-5 py-3 flex items-center gap-1 text-t2 font-font1 hover:underline border-l-2 border-border2">
              Siguiente ejercicio
              <ChevronRight size={18} />
            </Link>
          ) : (
            <span />
          )}
        </footer>
      </article>

      <section className="flex flex-col gap-4">
        <Comment />
        <Comment />
      </section>
    </main>
  );
}
