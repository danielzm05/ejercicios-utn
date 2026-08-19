'use client'
import { InputField, SelectField, DataListField} from '../shared/FormComponents';
import { NewTest, Materia, ExamenCategoria, Profesor } from '../../types/database';
import { useState, useEffect } from "react";
import { createExam , obtenerMaterias, obtenerCategorias, obtenerProfesores } from "@/lib/actions";
import ExerciseForm from './ExerciseForm';

export default function NewTestForm() {
  const INITIAL: NewTest = {
    año: new Date().getFullYear(),
    descripcion: "",
    id_materia: "",
    id_categoria: 1,
    id_profesor: "",
  }

  const [form, setForm ] = useState(INITIAL);
  const [created, setCreated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [categorias, setCategorias] = useState<ExamenCategoria[]>([]);
  const [profesores, setProfesores] = useState<Profesor[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const {name, value} = e.target;

    setForm (prev => ({ ...prev, [name]:value }))
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try{
      const { id } = await createExam(form);
      setCreated(id)

    }catch(err){
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }

    useEffect(() => {
      async function cargarOpciones() {
        try {
          const [mat, cat, prof] = await Promise.all([
            obtenerMaterias(),
            obtenerCategorias(),
            obtenerProfesores(),
          ]);
          setMaterias(mat);
          setCategorias(cat);
          setProfesores(prof);
        } catch (err) {
          console.error(err);
        } 
      }
      cargarOpciones();
    }, []);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <SelectField label={"Categoria:"} name="id_categoria" id="categoria" value={form.id_categoria} options={categorias.map((c)=> ({label: c.nombre, value: c.id_exam_categoria}))} required placeholder={"Seleccionar..."} onChange={handleChange}/>
        
        <DataListField label={"Materia:"} name="id_materia" list='materias-list' id="materia" options={materias.map((m)=> ({label: m.nombre, value: m.id_materia}))} required placeholder={"Seleccionar Materia..."} onChange={handleChange}/>

        <InputField label={"Descripción:"} type="text" name="descripcion" value={form.descripcion} id="respuesta" onChange={handleChange} />

        <InputField label={"Año:"} type="number" min={2000}  max={new Date().getFullYear()} name="año" id="año" value={form.año} onChange={handleChange} />
        
        <DataListField label={"Profesor:"} name="id_profesor" value={form.id_profesor} list="profesores-list" id="profesor" options={profesores.map((m)=> ({label: m.nombre, value: m.id_profesor}))} placeholder={"Seleccionar profesor..."} onChange={handleChange}/>
      
        <button type="submit" className="bg-blue-400 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-10">
          Crear Examen
        </button>
        <p className="text-red-900">{error ?? ""}</p>
      </form>
      
      {created && <ExerciseForm id_examen={created}/>}
    </section>
  )
}
