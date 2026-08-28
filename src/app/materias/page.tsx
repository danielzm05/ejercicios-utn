import { createClient } from "@/lib/supabase/client";
import MateriaCard from "@/components/ui/MateriaCard";
import type { Materia } from "@/types/database";

export default async function MateriasPage() {
  const supabase = createClient();

  const { data: materias, error } = await supabase
  .from('materia')
  .select('*').order('nivel', {ascending: true  })

  if (error) return <p>Error al cargar materias</p>

  return (
    <main className="h-full flex flex-col gap-10 justify-left px-10">
      <div>
        <h1 className="font-font1 text-text-1 text-6xl text-shadow-h">Materias</h1>
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-fr">
        {materias?.map((materia: Materia) => (
          <MateriaCard key={materia.id_materia} acronym={materia.acronimo} title={materia.nombre} level={materia.nivel} colorBg={materia.color_bg} colorBorder={materia.color_border} icon_name={materia.icon_name}/>
        ))}
      </div>
    </main>
  );
}


