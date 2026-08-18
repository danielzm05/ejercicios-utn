'use client'
import { InputField, SelectField, DataListField } from '../shared/FormComponents';
import { NewTest, Materia, ExamenCategoria, Profesor } from '../../types/database';
import { useState, useEffect } from "react";
import { crearExamen, obtenerMaterias, obtenerCategorias, obtenerProfesores } from "@/lib/actions";

export default function NewTestForm() {
  const INITIAL: NewTest = {
    año: new Date().getFullYear(),
    descripcion: "",
    id_materia: "",
    id_categoria: 0,
    id_profesor: "",
  }

  const [form, setForm ] = useState(INITIAL);
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [categorias, setCategorias] = useState<ExamenCategoria[]>([]);
    const [profesores, setProfesores] = useState<Profesor[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const {name, value} = e.target;

    setForm (prev => ({ ...prev, [name]:value }))
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
      <form>
        <SelectField label={"Categoria:"} name="id_categoria" id="categoria" options={categorias.map((c)=> ({label: c.nombre, value: c.id_exam_categoria}))} required placeholder={"Seleccionar..."} onChange={handleChange}/>
        
        <DataListField label={"Materia:"} name="id_materia" list='materias-list' id="materia" options={materias.map((m)=> ({label: m.nombre, value: m.id_materia}))} required placeholder={"Seleccionar Materia..."} onChange={handleChange}/>

        <InputField label={"Descripción:"} type="text" name="descripcion" value={form.descripcion} id="respuesta" onChange={handleChange} />

        <InputField label={"Año:"} type="number" min={2000}  max={new Date().getFullYear()} name="año" id="año" value={form.año} onChange={handleChange} />
        
        <DataListField label={"Profesor:"} name="id_profesor" list="profesores-list" id="profesor" options={profesores.map((m)=> ({label: m.nombre, value: m.id_profesor}))} required placeholder={"Seleccionar profesor..."} onChange={handleChange}/>
      </form>
    </section>
  )
}
