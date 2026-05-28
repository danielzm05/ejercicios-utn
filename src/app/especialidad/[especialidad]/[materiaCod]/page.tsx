import { createClient } from "@/lib/supabase/client";
import { User } from "lucide-react";

type Props = {
  params: Promise<{ materiaCod: string }>;
};

export default async function MateriaPage({ params }: Props) {
  const { materiaCod } = await params;

  const supabase = await createClient();

  const { data: examen, error } = await supabase.from("examen").select("*, materia(*), examen_categoria(*)").eq("materia.acronimo", materiaCod);

  if (error) {
    return <p>Error al cargar la materia</p>;
  }

  return (
    <main className="w-full grid md:grid-cols-3 md:grid-rows-2 gap-10">
      {examen?.map((ex: any) => (
        <article className="rounded-r-lg transition-all duration-300 transform-gpu flex gap-8 relative md:border-r-[1.2px] border-t-[1.2px] border-white/10 bg-linear-to-br from-blue-300/1 to-blue-300/4 hover:from-blue-300/2 hover:to-blue-300/10 h-full delay-150">
          <div className="w-0.5" style={{ backgroundColor: ex.examen_categoria.color }}></div>
          <div className="flex flex-col gap-3 py-8 ">
            <h2 className="font-heading text-lg sm:text-xl text-text-2">{ex.nombre}</h2>
            <p className="flex items-center gap-2 font-p uppercase text-text-3">
              <User size={20} /> PROF.MARTINEZ
            </p>
            <p className="flex items-center gap-2 font-p uppercase text-text-3">{ex.año}2002</p>
          </div>
        </article>
      ))}
    </main>
  );
}
