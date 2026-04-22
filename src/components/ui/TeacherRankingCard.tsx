import { Star } from 'lucide-react';

interface TeacherRankingCardProps {
  rank: number;
  name: string;
  rating: number;
}

function TeacherRankingCard({ rank, name, rating }: TeacherRankingCardProps) {
  return (
    <div className='flex items-center rounded-lg p-3'>
      <span className='text-hover font-bold font-heading md:text-2xl italic'>#{rank}</span>
      <h3 className='pl-4 text-text-2 flex-1 font-black font-heading md:text-lg'>{name}</h3>
      <Star size={18} fill="currentColor" className='text-yellow-400' />
      <span className='p-1 text-left text-text-2 font-bold font-heading md:text-lg text-sm'> {rating}</span>
    </div>
  )
}

export default TeacherRankingCard