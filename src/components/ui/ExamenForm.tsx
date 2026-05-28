"use client";

import { useState, useEffect } from "react";
import {
  Field,
  TextareaField,
  SelectField,
  FormSection,
  SubmitButton,
  FormFeedback,
} from "@/components/shared/FormFields";
import { crearExamen, obtenerMaterias, obtenerCategorias, obtenerProfesores } from "@/lib/actions";
import type { NuevoExamen, Materia, ExamenCategoria, Profesor } from "@/types/database";

type FormErrors = Partial<Record<keyof NuevoExamen, string>>;

function validarExamen(data: NuevoExamen): FormErrors {
  const errors: FormErrors = {};
  const currentYear = new Date().getFullYear();

  if (!data.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio.";
  }

  if (!data.año) {
    errors.año = "El año es obligatorio.";
  } else if (data.año < 1990 || data.año > currentYear + 1) {
    errors.año = `El año debe estar entre 1990 y ${currentYear + 1}.`;
  }

  if (!data.id_materia) {
    errors.id_materia = "Seleccioná una materia.";
  }

  if (!data.id_categoria) {
    errors.id_categoria = "Seleccioná una categoría.";
  }

  if (!data.id_profesor) {
    errors.id_profesor = "Seleccioná un profesor.";
  }

  return errors;
}

const INITIAL: NuevoExamen = {
  nombre: "",
  año: new Date().getFullYear(),
  descripción: "",
  id_materia: "",
  id_categoria: 0,
  id_profesor: "",
};

interface ExamenFormProps {
  onSuccess?: (id: string) => void;
}

export default function ExamenForm({ onSuccess }: ExamenFormProps) {
  const [form, setForm] = useState<NuevoExamen>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success?: string; error?: string }>({});

  const [materias, setMaterias] = useState<Materia[]>([]);
  const [categorias, setCategorias] = useState<ExamenCategoria[]>([]);
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [loadingSelects, setLoadingSelects] = useState(true);
  const [selectsError, setSelectsError] = useState<string | null>(null);

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
        setSelectsError("Error al cargar las opciones. Recargá la página.");
        console.error(err);
      } finally {
        setLoadingSelects(false);
      }
    }
    cargarOpciones();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "año" || name === "id_categoria" ? Number(value) : value,
    }));
    if (errors[name as keyof NuevoExamen]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback({});

    const validationErrors = validarExamen(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const { id } = await crearExamen({
        ...form,
        descripción: form.descripción?.trim() || null,
      });
      setFeedback({ success: "¡Examen creado correctamente!" });
      setForm(INITIAL);
      setErrors({});
      onSuccess?.(id);
    } catch (err) {
      setFeedback({ error: err instanceof Error ? err.message : "Error desconocido." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-zinc-100">Nuevo examen</h2>
        <p className="mt-1 text-sm text-zinc-500">Completá los datos para registrar un examen.</p>
      </div>

      {selectsError && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {selectsError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>

        <FormSection title="Información general">
          <Field
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Parcial 1 — Álgebra"
            error={errors.nombre}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Año"
              name="año"
              type="number"
              min={1990}
              max={new Date().getFullYear() + 1}
              value={form.año}
              onChange={handleChange}
              error={errors.año}
              required
            />

            <SelectField
              label="Categoría"
              name="id_categoria"
              value={form.id_categoria || ""}
              onChange={handleChange}
              options={categorias.map((c) => ({ value: c.id_exam_categoria, label: c.nombre }))}
              placeholder={loadingSelects ? "Cargando..." : "Seleccionar..."}
              error={errors.id_categoria}
              disabled={loadingSelects || !!selectsError}
              required
            />
          </div>

          <TextareaField
            label="Descripción"
            name="descripción"
            value={form.descripción ?? ""}
            onChange={handleChange}
            placeholder="Descripción opcional del examen..."
            rows={3}
          />
        </FormSection>

        <FormSection title="Relaciones">
          <SelectField
            label="Materia"
            name="id_materia"
            value={form.id_materia}
            onChange={handleChange}
            options={materias.map((m) => ({ value: m.id_materia, label: `${m.acronimo} — ${m.nombre}` }))}
            placeholder={loadingSelects ? "Cargando..." : "Seleccionar materia..."}
            error={errors.id_materia}
            disabled={loadingSelects || !!selectsError}
            required
          />

          <SelectField
            label="Profesor"
            name="id_profesor"
            value={form.id_profesor}
            onChange={handleChange}
            options={profesores.map((p) => ({ value: p.id_profesor, label: p.nombre }))}
            placeholder={loadingSelects ? "Cargando..." : "Seleccionar profesor..."}
            error={errors.id_profesor}
            disabled={loadingSelects || !!selectsError}
            required
          />
        </FormSection>

        <FormFeedback success={feedback.success} error={feedback.error} />

        <SubmitButton loading={loading}>
          {loading ? "Guardando..." : "Crear examen"}
        </SubmitButton>
      </form>
    </div>
  );
}
