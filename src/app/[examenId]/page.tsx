import { createClient } from "@/lib/supabase/client";
import EjercicioLink from "@/components/ui/EjercicioLink";

async function page({ params }: { params: { examenId: string } }) {
  const { examenId } = await params;

  const supabase = createClient();

  const { data: examen, error } = await supabase.from("examen").select("*, ejercicio(*), profesor(*)").eq("id_examen", examenId).single();

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
        <div className="flex flex-col gap-3 border rounded-lg p-10 bg-card">
          <h1 className="font-heading text-text-1 text-5xl font-bold">{examen.nombre}</h1>
          <p className="text-text-3">{examen.descripcion}</p>
          {examen.profesor && <p className="text-text-2 font-semibold">Prof. {examen.profesor.nombre}</p>}

          <div className="flex flex-col border-t ">
            {examen.ejercicio.map((ejercicio: Ejercicio) => (
              <EjercicioLink key={ejercicio.id_ejercicio} id_ejercicio={ejercicio.id_ejercicio} consigna={ejercicio.consigna} id_examen={examen.id_examen} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default page;
