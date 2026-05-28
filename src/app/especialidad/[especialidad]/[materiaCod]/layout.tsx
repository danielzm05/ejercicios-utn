import { createClient } from '@/lib/supabase/server'; 
import { ChartSpline } from 'lucide-react';


type Props = {
  children: React.ReactNode;
  params: Promise<{ materiaCod: string }>
}

export default async function MateriaLayout({ params, children }: Props) {
  
  const { materiaCod } = await params;
  const supabase = await createClient();
  
  const { data: materia, error } = await supabase
    .from('materia')
    .select('*')
    .eq('acronimo', materiaCod)
    .single();

  if (error) {
    return <p>Error al cargar la materia</p>;
  }

  return (
    <section className="h-full flex flex-col gap-10 justify-left p-10">
      <header className='flex flex-col gap-5'>
        <div className='flex gap-7 items-center'>
          <span className='grid content-center bg-card p-3 rounded-lg h-full w-auto border-3 border-border-1 '>
            <ChartSpline size={48} className="text-primary" />
          </span>
          <span>
            <h1 className="font-heading text-text-1 text-5xl font-bold">{materia.nombre}</h1>
          <span className='text-text-3'>Estudiantes cursando</span>
          </span>
        </div>
        
        <ul className='flex gap-10'>
          <li className='font-heading text-text-1 uppercase hover:underline'>Guías y Examenes</li>
          <li className='font-heading text-text-1 uppercase hover:underline'>Recursos de la comunidad</li>
        </ul>
      </header>

        {children}
    </section>
          
  )
}