import { createClient } from "@/lib/supabase/server";
import { Recurso } from '../../../../types/database';
import RecursoCard from "@/components/ui/RecursoCard";
type Props = {
  params: Promise<{ materiaCod: string }>;
};

export default async function Page({ params }: Props) {
  const { materiaCod } = await params;
  
  const supabase = await createClient();

  const { data: recurso, error } = await supabase.from("recurso").select("*, materia!inner(acronimo), recurso_categoria(*)").filter('materia.acronimo', 'eq', materiaCod);
    
  if (error) {
    return <p>Error al cargar la materia</p>;
  }

  return (
    <section className="flex flex-col w-full">
      {recurso.map((r: Recurso) => (
        <RecursoCard key={r.id_recurso} nombre={r.nombre} descripcion={r.descripcion} link={r.link} categoria_nombre={r.recurso_categoria.nombre} color_border={r.recurso_categoria.color_border} color_bg={r.recurso_categoria.color_bg}/>
      ))}
    </section>
  );
}
