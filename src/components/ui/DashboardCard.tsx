import React from 'react'
import { UsersRound, ChartSpline  } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  children?: React.ReactNode;
}

function DashboardCard({ title, children }: DashboardCardProps  ) {
  return (
      <article className='bg-card rounded-lg p-5 h-full flex flex-col gap-3 '>
        <header className="flex items-center gap-2">
          <UsersRound size={20}  className="text-text-1" />
          <h2 className="font-heading text-text-1 uppercase">{title}</h2>
        </header>
        <section className='flex flex-col divide-solid divide-y-3 divide-border-2 '>
          {children}
        </section>
      </article>
  )
}

export default DashboardCard