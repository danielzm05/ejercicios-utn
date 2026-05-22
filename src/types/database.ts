import { ICON_MAP } from "@/components/ui/IconRenderer";

export interface Ejercicio {
  id_ejercicio: string;
  created_at: string;
  numero: string;
  consigna: string;
  respuesta: string;
  video: string | null;
  id_examen: string;
}

export interface Examen {
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

export type NuevoEjercicio = Omit<Ejercicio, "id_ejercicio" | "created_at">;

export type NuevoExamen = Omit<Examen, "id_examen">;
