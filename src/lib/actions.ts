import { createClient } from "./supabase/client";
import type { NewExercise, NewTest, Materia, ExamenCategoria, Profesor } from "@/types/database";

const supabase = createClient();

export async function createExercises(bulk: NewExercise[]) {
  const { data , error } = await supabase
    .from("ejercicio")
    .insert(bulk)

  if (error) throw new Error(`Error al crear ejercicio: ${error.message}`);
  return data ?? [];
}

export async function obtenerEjercicios() {
  const { data, error } = await supabase
    .from("ejercicio")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Error al obtener ejercicios: ${error.message}`);
  return data ?? [];
}

export async function crearExamen(data: NewTest): Promise<{ id: string }> {
  const { data: result, error } = await supabase
    .from("examen")
    .insert({
      año: data.año,
      descripción: data.descripcion ,
      id_materia: data.id_materia,
      id_categoria: data.id_categoria,
      id_profesor: data.id_profesor,
    })
    .select("id_examen")
    .single();

  if (error) throw new Error(`Error al crear examen: ${error.message}`);
  return { id: result.id_examen };
}

export async function obtenerExamenes() {
  const { data, error } = await supabase
    .from("examen")
    .select("*")

  if (error) throw new Error(`Error al obtener examenes: ${error.message}`);
  return data ?? [];
}

export async function obtenerMaterias(): Promise<Materia[]> {
  const { data, error } = await supabase
    .from("materia")
    .select("*")
    .order("nombre");

  if (error) throw new Error(`Error al obtener materias: ${error.message}`);
  return data ?? [];
}

export async function obtenerCategorias(): Promise<ExamenCategoria[]> {
  const { data, error } = await supabase
    .from("examen_categoria")
    .select("*")
    .order("nombre");

  if (error) throw new Error(`Error al obtener categorías: ${error.message}`);
  return data ?? [];
}

export async function obtenerProfesores(): Promise<Profesor[]> {
  const { data, error } = await supabase
    .from("profesor")
    .select("*")
    .order("nombre");

  if (error) throw new Error(`Error al obtener profesores: ${error.message}`);
  return data ?? [];
}
