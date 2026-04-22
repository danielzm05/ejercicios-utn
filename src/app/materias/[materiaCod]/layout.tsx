import { ChartSpline } from 'lucide-react';

export default function layout({ children }: { children: React.ReactNode  }) {
  return (
    <section className="h-full flex flex-col gap-10 justify-left p-10 ">
      <header className='flex gap-7 items-center'>
        <span className='grid content-center bg-card p-3 rounded-lg h-full w-auto border-3 border-border-1 '>
          <ChartSpline size={48} className="text-primary" />
        </span>
        <span>
          <h1 className="font-heading text-text-1 text-5xl font-bold">Analisis Matematico I</h1>
        <span className='text-text-3'>Estudiantes cursando</span>
        </span>
      </header>

      {children}
    </section>
  )
}

