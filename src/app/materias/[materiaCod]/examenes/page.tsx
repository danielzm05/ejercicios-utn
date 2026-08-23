import { ExamenCard } from "@/components/ui/ExamenCard";
import { createClient } from "@/lib/supabase/client";

type Props = {
  params: Promise<{ materiaCod: string }>;
};

export default async function MateriaPage({ params }: Props) {
  const { materiaCod } = await params;

  const supabase = await createClient();

  const { data: examen, error } = await supabase.from("examen").select("*, materia(*), examen_categoria(*), profesor(*)").eq("materia.acronimo", materiaCod);

  if (error) {
    return <p>Error al cargar la materia</p>;
  }

  return (
    <>
      {examen?.map((ex: any) => (
        <ExamenCard
          key={ex.id_examen}
          id={ex.id}
          nombre={ex.nombre}
          año={ex.año}
          profesor={ex.profesor}
          examen_categoria={ex.examen_categoria}
        />
      ))}
    </>
  );
}
