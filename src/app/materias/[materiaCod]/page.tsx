import { ChartSpline, UsersRound, Star } from 'lucide-react';
import DashboardCard from '@/components/ui/DashboardCard';
import TeacherRankingCard from '@/components/ui/TeacherRankingCard';

export default function MateriaPage() {
  return (
    <main className="h-full flex flex-col gap-10 justify-left px-10">
      <header className='flex gap-7 items-center'>
        <span className='grid content-center bg-card p-3 rounded-lg h-full w-auto border-2 border-border-1 '>
          <ChartSpline size={48} className="text-primary" />
        </span>
        <span>
          <h1 className="font-heading text-text-1 text-5xl font-bold">Analisis Matematico I</h1>
        <span className='text-text-3'>Estudiantes cursando</span>
        </span>
      </header>

      <DashboardCard title='Recursos de la comunidad'>
        
      </DashboardCard>

      <DashboardCard title='Ranking Profesores'>
        <TeacherRankingCard rank={1} name="Roberto Tenuta" rating={4.5} />
        <TeacherRankingCard rank={2} name="María García" rating={4.3} />
        <TeacherRankingCard rank={3} name="Carlos López" rating={4.1} />
      </DashboardCard>

    </main>
  );
}