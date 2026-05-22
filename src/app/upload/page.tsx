import EjercicioForm from "@/components/ui/EjercicioForm";
import ExamenForm from "@/components/ui/ExamenForm";

function page() {
  return (
    <main className="flex gap-5 p-10">
      <EjercicioForm />
      <ExamenForm />
    </main>
  )
}

export default page