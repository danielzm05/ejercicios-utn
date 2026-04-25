import { ICON_MAP } from "@/components/ui/IconRenderer";
import { EspecialidadCard } from "../../components/ui/EspecialidadCard";
import { createClient } from "../../../lib/supabase/client";

type Especialidad = {
  id_especialidad: number;
  nombre: string;
  duracion: number;
  codigo: string;
  color_bg: string;
  color_border: string;
  icon_name: keyof typeof ICON_MAP;
}

export default async function EspecialidadesPage() {
  const supabase = createClient();

  const { data: especialidades, error } = await supabase
  .from('especialidad')
  .select('*')

  if (error) return <p>Error al cargar especialidades</p>

  return (
    <main className="flex-1 flex flex-col gap-10 justify-left p-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-text-1 text-5xl font-bold">Especialidades</h1>
        <p className="text-text-3">
          La UTN FRBA Ofrece actualmente estas 9 especialidades:
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2  flex-1">
        {especialidades?.map((esp: Especialidad) => (
          <EspecialidadCard
            key={esp.id_especialidad}
            icon_name={esp.icon_name}
            nombre={esp.nombre}
            duracion={esp.duracion}
            codigo={esp.codigo}
            color_bg={esp.color_bg}
            color_border={esp.color_border}
          />
        ))}
      </div>
    </main>
  );
}




