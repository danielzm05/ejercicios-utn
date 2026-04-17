import { ChartSpline } from 'lucide-react';

export default function MateriaPage() {
  return (
    <main className="h-full flex flex-col gap-10 justify-left px-10">
      <header className='flex gap-7 items-center'>
        <span className='grid content-center bg-card p-3 rounded-lg h-full w-auto border-2 border-text-1 '>
          <ChartSpline size={48} className="text-primary" />
        </span>
        <span>
          <h1 className="font-heading text-text-1 text-5xl font-bold">Analisis Matematico I</h1>
        <span className='text-text-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore nihil illum saepe nostrum ducimus laudantium obcaecati nobis magni nesciunt aliquid! Voluptatum iste consectetur rem provident aperiam sapiente tenetur doloremque sit.</span>
        </span>
      </header>
    </main>
  );
}