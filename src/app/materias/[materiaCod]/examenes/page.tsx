import { createClient } from "@/lib/supabase/server";
import { ExamenCard } from "@/components/ui/ExamenCard";
import { Test } from '../../../../types/database';


type Props = {
  params: Promise<{ materiaCod: string }>;
};

export default async function Page({ params }: Props) {
  const { materiaCod } = await params;
  

  const supabase = await createClient();

  const { data: examen, error } = await supabase.from("examen").select("*, materia!inner(acronimo), examen_categoria(*), profesor(*)").filter('materia.acronimo', 'eq', materiaCod);
  
  if (error) {
    return <p>Error al cargar la materia</p>;
  }

  return (
    <div className="w-full grid grid-cols-1 auto-rows-[100px] sm:auto-rows-[150px] sm:grid-cols-3 gap-5">
      {examen.map((examen: Test) => (
        <ExamenCard
          key={examen.id_examen}
          id={examen.id_examen}
          descripcion={examen.descripcion}
          año={examen.año}
          profesor={examen.profesor}
          examen_categoria={examen.examen_categoria}
        />
      ))}
    </div>
  );
}
