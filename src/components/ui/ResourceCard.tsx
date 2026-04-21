import React from 'react'
import { ChartSpline } from 'lucide-react';

function ResourceCard() {
  return (
    <div className='flex gap-4 items-center  rounded-lg p-3'>
      <span className='grid content-center bg-card p-2 rounded-lg h-full w-auto'>
        <ChartSpline size={28} className="text-primary" />
      </span>
      <span>
        <h3 className="font-heading text-text-4 font-bold">Analisis Matematico I</h3>
        <span className='text-text-3 text-xs'>Lorem ipsum  adipisicing elvident aperiam sapiente tenetur doloremque sit.</span>
      </span>
    </div>
  )
}

export default ResourceCard