"use client";

import { useState, useEffect } from "react";
import { Field, TextareaField, FormSection, SubmitButton, FormFeedback, SelectField } from "@/components/shared/FormFields";
import { crearEjercicio, obtenerExamenes } from "@/lib/actions";
import type { Examen, NuevoEjercicio } from "@/types/database";

type FormErrors = Partial<Record<keyof NuevoEjercicio, string>>;

function validarEjercicio(data: NuevoEjercicio): FormErrors {
  const errors: FormErrors = {};

  if (!data.consigna.trim()) {
    errors.consigna = "La consigna es obligatoria.";
  } else if (data.consigna.trim().length < 10) {
    errors.consigna = "La consigna debe tener al menos 10 caracteres.";
  }

  if (!data.respuesta.trim()) {
    errors.respuesta = "La respuesta es obligatoria.";
  } else if (data.respuesta.trim().length < 5) {
    errors.respuesta = "La respuesta debe tener al menos 5 caracteres.";
  }

  if (data.video && !/^https?:\/\/.+/.test(data.video)) {
    errors.video = "Ingresá una URL válida (debe comenzar con http:// o https://).";
  }

  return errors;
}

const INITIAL: NuevoEjercicio = {
  consigna: "",
  respuesta: "",
  video: "",
  id_examen: "", 
};

interface EjercicioFormProps {
  onSuccess?: (id: string) => void;
}

export default function EjercicioForm({ onSuccess }: EjercicioFormProps) {
  const [form, setForm] = useState<NuevoEjercicio>(INITIAL);
  const [examenes, setExamenes] = useState<Examen[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loadingSelect, setLoadingSelect] = useState(true);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success?: string; error?: string }>({});

  useEffect(() => {
    async function fetchExamenes() {
      try {
        const data = await obtenerExamenes();
        setExamenes(data);
        console.log("Examenes cargados:", data);
      } catch (err) {
        setFeedback({ error: err instanceof Error ? err.message : "Error al cargar examenes." });
      } finally {
        setLoadingSelect(false);
      }
    }
    fetchExamenes();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement |HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo al editar
    if (errors[name as keyof NuevoEjercicio]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback({});

    const validationErrors = validarEjercicio(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const { id } = await crearEjercicio({
        ...form,
        video: form.video?.trim() || null,
      });
      setFeedback({ success: "¡Ejercicio creado correctamente!" });
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
        <h2 className="text-lg font-bold text-zinc-100">Nuevo ejercicio</h2>
        <p className="mt-1 text-sm text-zinc-500">Completá los campos para agregar un ejercicio a la base de datos.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>

        <SelectField
          label="Examen asociado"
          name="id_examen"
          value={form.id_examen}
          onChange={handleChange}
          options={examenes.map((e) => ({ value: e.id_examen, label: `${e.nombre} (${e.año})` }))}
          placeholder={loadingSelect ? "Cargando..." : "Seleccionar examen..."}
          error={errors.id_examen}
          disabled={loadingSelect}
          required
        />
        
        <FormSection title="Contenido">

          <TextareaField
            label="Consigna"
            name="consigna"
            value={form.consigna}
            onChange={handleChange}
            placeholder="Escribí el enunciado del ejercicio..."
            error={errors.consigna}
            required
            rows={5}
          />

          <TextareaField
            label="Respuesta"
            name="respuesta"
            value={form.respuesta}
            onChange={handleChange}
            placeholder="Escribí la respuesta o solución..."
            error={errors.respuesta}
            required
            rows={5}
          />
        </FormSection>

        <FormSection title="Multimedia (opcional)">
          <Field
            label="URL de video"
            name="video"
            type="url"
            value={form.video ?? ""}
            onChange={handleChange}
            placeholder="https://youtube.com/watch?v=..."
            error={errors.video}
            hint="Podés adjuntar un video explicativo de YouTube u otra plataforma."
          />
        </FormSection>

        <FormFeedback success={feedback.success} error={feedback.error} />

        <SubmitButton loading={loading}>
          {loading ? "Guardando..." : "Crear ejercicio"}
        </SubmitButton>
      </form>
    </div>
  );
}
