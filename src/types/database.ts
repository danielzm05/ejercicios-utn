import { ICON_MAP } from "@/components/ui/IconRenderer";

export interface Exercise {
  id_ejercicio: string;
  created_at: string;
  consigna: string;
  respuesta: string;
  video: string;
  id_examen: string;
}

export interface Test {
  id_examen: string;
  nombre: string;
  año: number;
  descripción: string | null;
  id_materia: string;
  id_categoria: number;
  id_profesor: string;
}

export interface Materia {
  id_materia: string;
  nombre: string;
  nivel: number;
  icon_name: keyof typeof ICON_MAP;
  color_bg: string;
  color_border: string;
  acronimo: string;
  id_especialidad: string;
}

export interface ExamenCategoria {
  id_exam_categoria: number;
  nombre: string;
}

export interface Profesor {
  id_profesor: string;
  created_at: string;
  nombre: string;
}

export interface Especialidad {
  id_especialidad: string;
  nombre: string;
  codigo: string;
  icon_name: string;
  color_bg: string;
  color_border: string;
  duracion: number;
}

export type NewExercise = Omit<Exercise, "created_at">;

export type NewTest = Omit<Test, "id_examen">;
