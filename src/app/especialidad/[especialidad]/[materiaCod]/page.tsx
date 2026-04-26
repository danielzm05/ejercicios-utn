import { ChartSpline } from 'lucide-react';
import { createClient } from '../../../../../lib/supabase/server';
import DashboardCard from '@/components/ui/DashboardCard';
import TeacherRankingCard from '@/components/ui/TeacherRankingCard';

type Props = {
  params: Promise<{ materiaCod: string }>
}

export default async function MateriaPage({ params }: Props) {
  const supabase = await createClient();
  const { materiaCod } = await params;


  const { data: materia, error } = await supabase
    .from('materia')
    .select('*')
    .eq('acronimo', materiaCod)
    .single();

  if (error) {
    return <p>Error al cargar la materia</p>;
  }

  return (
    <section className="h-full flex flex-col gap-10 justify-left">
      <header className='flex gap-7 items-center'>
        <span className='grid content-center bg-card p-3 rounded-lg h-full w-auto border-3 border-border-1 '>
          <ChartSpline size={48} className="text-primary" />
        </span>
        <span>
          <h1 className="font-heading text-text-1 text-5xl font-bold">{materia.nombre}</h1>
        <span className='text-text-3'>Estudiantes cursando</span>
        </span>
      </header>

      <main className='grid md:grid-cols-3 md:grid-rows-2 gap-10'>
        <DashboardCard title='Ejercicios' className='md:col-span-2 md:row-span-2'>
          
        </DashboardCard>

        <DashboardCard title='Recursos de la comunidad'>
          
        </DashboardCard>

        <DashboardCard title='Ranking Profesores'>
          <TeacherRankingCard rank={1} name="Roberto Tenuta" rating={4.5} />
          <TeacherRankingCard rank={2} name="María García" rating={4.3} />
          <TeacherRankingCard rank={3} name="Carlos López" rating={4.1} />
        </DashboardCard>
      </main>
    </section>
  );
}