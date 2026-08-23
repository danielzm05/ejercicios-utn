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
    <section className="h-full flex flex-col gap-10 justify-left p-5 sm:p-10">
      <header className='flex flex-col gap-5'>
        <div className='flex gap-7 items-center'>
          <span className='grid content-center bg-card p-3 rounded-xs h-full w-auto outline-3 shadow-bs1' style={{color: materia.color_border}}>
            <ChartSpline size={48} />
          </span>
          <span>
            <h1 className="font-font1 text-t1 text-3xl sm:text-5xl">{materia.nombre}</h1>
          <span className='font-font1 text-t2'>Estudiantes cursando:</span>
          </span>
        </div>
        
        <ul className='flex gap-10 font-font1'>
          <li className='font-heading text-text-1 uppercase hover:underline'>Guías y Examenes</li>
          <li className='font-heading text-text-1 uppercase hover:underline'>Recursos de la comunidad</li>
        </ul>
      </header>

    <main className="w-full grid grid-cols-1 auto-rows-[100px] sm:auto-rows-[150px] sm:grid-cols-3  gap-5">
      {children}
    </main>
        
    </section>
          
  )
}