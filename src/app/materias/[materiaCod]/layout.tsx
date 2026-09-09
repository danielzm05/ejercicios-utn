"use client";
import { createClient } from "@/lib/supabase/client";
import { IconRenderer } from "../../../components/ui/IconRenderer";
import { useEffect, useState } from "react";
import { Materia } from "../../../types/database";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: Promise<{ materiaCod: string }>;
};

export default function MateriaLayout({ params, children }: Props) {
  const [materia, setMateria] = useState<Materia | null>(null);

  const pathname = usePathname();
  const supabase = createClient();
  const { materiaCod } = React.use(params);

  useEffect(() => {
    async function getMateria(id: string) {
      try {
        const { data, error } = await supabase.from("materia").select("*").eq("acronimo", id).single();

        if (error) return <p>Error al cargar la materia</p>;
        setMateria(data);
      } catch (error) {
        console.log(error);
      }
    }

    if (materiaCod) getMateria(materiaCod);
  }, [materiaCod]);

  const tabs = [
    { label: "Exámenes", href: `/materias/${materiaCod}/examenes` },
    { label: "Recursos", href: `/materias/${materiaCod}/recursos` },
  ];

  return (
    <section className="h-full flex flex-col gap-10 justify-left p-5 sm:p-10">
      <header className="flex flex-col gap-5">
        <div className="flex gap-7 items-center">
          <span className="grid content-center bg-card p-3 rounded-xs h-full w-auto outline-3 shadow-bs1" style={{ color: materia?.color_border }}>
            <IconRenderer iconName={materia?.icon_name ?? "BookText"} size={48} />
          </span>
          <span>
            <h1 className="font-font1 text-t1 text-3xl sm:text-5xl">{materia?.nombre}</h1>
            <span className="font-font1 text-t2">Estudiantes cursando:</span>
          </span>
        </div>

        <div className="flex gap-10 *:font-font1 *:text-xl *:uppercase *:hover:underline">
          {tabs.map((t) => {

          const isActive = pathname === t.href;

          return(
            <Link  key={t.href} href={t.href} replace  style={{color: `${isActive ? materia?.color_border : 'var(--t1)'}`}}>{t.label}</Link>
          )})}
        </div>
      </header>

      <>{children}</>
    </section>
  );
}
