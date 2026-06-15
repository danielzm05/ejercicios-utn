import { createClient } from "@/lib/supabase/server";
import { ExamenCard } from "@/components/ui/ExamenCard";

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
    <>
      {examen.map((examen) => (
        <ExamenCard
          key={examen.id_examen}
          id={examen.id_examen}
          nombre={examen.nombre}
          año={examen.año}
          profesor={examen.profesor}
          examen_categoria={examen.examen_categoria}
        />
      ))}
    </>
  );
}
