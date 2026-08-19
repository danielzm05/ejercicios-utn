import NewTestForm from '../../components/ui/NewTestForm';

export default function page() {

  return (
    <main className="flex flex-col gap-5 p-10">
      <h1 className="font-font1 text-t1 text-5xl text-shadow-h">Subir Ejercicios</h1>
      <NewTestForm />
    </main>
  )
}

