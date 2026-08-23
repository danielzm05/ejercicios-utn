import { createClient } from "@/lib/supabase/client";
import MateriaCard from "@/components/ui/MateriaCard";
import type { Materia } from "@/types/database";

export default async function MateriasPage() {
  const supabase = createClient();

  const { data: materias, error } = await supabase
  .from('materia')
  .select('*')

  if (error) return <p>Error al cargar materias</p>

  return (
    <main className="h-full flex flex-col gap-10 justify-left px-10">
      <div>
        <h1 className="font-font1 text-text-1 text-6xl text-shadow-h">Materias</h1>
        <p className="text-t2 text-2xl font-font1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore nihil illum saepe nostrum ducimus laudantium obcaecati nobis magni nesciunt
          aliquid! Voluptatum iste consectetur rem provident aperiam sapiente tenetur doloremque sit.
        </p>
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
        {materias?.map((materia: Materia) => (
          <MateriaCard key={materia.id_materia} acronym={materia.acronimo} title={materia.nombre} level={1} colorBg={materia.color_bg} colorBorder={materia.color_border} icon_name={materia.icon_name}/>
        ))}
      </div>
    </main>
  );
}


