import { createClient } from "../../../lib/supabase/client";
import MateriaCard from "../../components/ui/MateriaCard";

type Materia = {
  id_materia: number;
  nombre: string;
  acronimo: string;
  color_bg: string;
  color_border: string;
}

export default async function MateriasPage() {
  const supabase = createClient();

  const { data: materias, error } = await supabase
  .from('materia')
  .select('*')

  console.log(materias)
  console.log(error)
  if (error) return <p>Error al cargar materias</p>

  return (
    <main className="h-full flex flex-col gap-10 justify-left px-10">
      <div>
        <h1 className="font-heading text-text-1 text-5xl font-bold">Materias</h1>
        <p className="text-text-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore nihil illum saepe nostrum ducimus laudantium obcaecati nobis magni nesciunt
          aliquid! Voluptatum iste consectetur rem provident aperiam sapiente tenetur doloremque sit.
        </p>
      </div>

      <div className="grid gap-3 grid-cols-3">
        {materias?.map((materia: Materia) => (
          <MateriaCard key={materia.id_materia} acronym={materia.acronimo} title={materia.nombre} level={1} colorBg={materia.color_bg} colorBorder={materia.color_border}/>
        ))}
      </div>
    </main>
  );
}


