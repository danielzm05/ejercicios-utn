import ExerciseForm from "@/components/ui/ExerciseForm"
import NewTestForm from '../../components/ui/NewTestForm';

export default function page() {

  return (
    <main className="flex flex-col gap-5 p-10">
      <h1 className="font-heading text-text-1 text-5xl font-bold">Subir Ejercicios</h1>
      <NewTestForm />
      <ExerciseForm/>
    </main>
  )
}

