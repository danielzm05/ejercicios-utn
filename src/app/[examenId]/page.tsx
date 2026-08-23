import { createClient } from "@/lib/supabase/server";
import EjercicioLink from "@/components/ui/EjercicioLink";

export default async function page({ params }: { params: { examenId: string } }) {
  const { examenId } = await params;

  const supabase = await createClient();
  const { data: examen, error } = await supabase.from("examen").select("*, ejercicio(*), examen_categoria(*), profesor(*)").eq("id_examen", examenId).single();

  console.log(examen)
  if (error) {
    console.error("Error al cargar el examen:", error);
    return <p>Error al cargar el examen</p>;
  }

  interface Ejercicio {
    id_ejercicio: string;
    id_examen: string;
    consigna: string;
  }

  return (
    <main className="h-full flex flex-col gap-10 justify-left p-20 ">
      {examen && (
        <article className="flex flex-col bg-card rounded-xl border-3 border-border1 shadow-bs1">
          <header className="flex justify-center flex-col min-h-25 rounded-t-xl font-font1 text-t1 text-3xl px-5 py-1 border-t-6 border-t-amber-50/50 border-b-6 border-b-black/50" style={{background: examen.examen_categoria.color}}>
            <span >{examen.descripcion} {examen.año}</span>
            {examen.profesor && <span className="text-t2 text-xl"> Prof. {examen.profesor.nombre}</span>}
          </header>
          
          <div className="flex flex-col">
            {examen.ejercicio.map((ejercicio: Ejercicio, index: number) => (
              <EjercicioLink key={ejercicio.id_ejercicio} id_ejercicio={ejercicio.id_ejercicio} consigna={ejercicio.consigna} id_examen={examen.id_examen} index={index+1} />
            ))}
          </div>
        </article>
      )}
    </main>
  );
}
