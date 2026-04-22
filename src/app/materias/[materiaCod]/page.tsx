import DashboardCard from '@/components/ui/DashboardCard';
import TeacherRankingCard from '@/components/ui/TeacherRankingCard';

export default function MateriaPage() {
  return (
    <section className="h-full flex flex-col gap-10 justify-left">
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