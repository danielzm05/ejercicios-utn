'use client'
import { MarkdownViewer } from "@/components/shared/MarkdownViewer";
import { useState } from "react";
import { NewExercise, Test } from "@/types/database";
import { createExercises } from "@/lib/actions";
import { InputField, TextAreaField } from '../shared/FormComponents';
interface FormProps {
  id_examen: string;
}

export default function ExerciseForm({id_examen}:FormProps) {

  const INITIAL: NewExercise = {
    id_ejercicio: "",
    consigna: "",
    respuesta: "",
    video: "",
    id_examen: id_examen
  };

  const [form, setForm] = useState<NewExercise>(INITIAL);
  const [bulk, setBulk] = useState<NewExercise[]>([])
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBulk([...bulk, {
      ...form,
      id_ejercicio: crypto.randomUUID(),
    }])

   setForm(INITIAL);
  }
  
  const handleCreate = async (bulk:NewExercise[]) => {
    try {
      const data = await createExercises(bulk);
      setBulk([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } 
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id: string) => {
    setBulk(prev => prev.filter(ex => ex.id_ejercicio !== id));
  };

  return (
      <section className="grid grid-cols-3 gap-5 w-full bg-card rounded-lg p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-3">
          <h1 className="text-xl font-bold">Nuevo Ejercicio</h1>
          <TextAreaField label={"Consigna:"} rows={4} id="consigna" name="consigna" value={form.consigna} onChange={handleChange} required  />
            <InputField label={"Respuesta:"} type="text" name="respuesta" value={form.respuesta} id="respuesta" onChange={handleChange} />
          <InputField label={"Link Video:"} type="text" name="video" value={form.video} id="video" onChange={handleChange} placeholder="https://youtube.com/watch?v=..." />
          <button className="bg-gray-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-primary-dark" type="submit">
            Añadir ejercicio
          </button>
          
        </form>
        
        
        <section className="col-span-2 bg-blue-900">
          {bulk?.map((ex:NewExercise) => (
            <article key={ex.id_ejercicio} className="flex justify-between p-2 border-b">
              <span className="flex flex-col gap-1.5">
                <MarkdownViewer  content={ex.consigna} />
                <MarkdownViewer content={`RTA: ${ex.respuesta}`}/>
              </span>
              <span className="flex gap-1">
                <button>edit</button>
                <button onClick={() => handleDelete(ex.id_ejercicio)}>delete</button>
              </span>
            </article>
          ))
          }
        </section>
        <footer className="col-span-full flex justify-between items-center">
          <p className="text-red-900">{error ?? ""}</p>
          <button disabled={!bulk.length} className="bg-blue-400 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-10" onClick={()=>handleCreate(bulk)}>
            Crear ejercicios
          </button>
        </footer>
      </section>
  )
}

