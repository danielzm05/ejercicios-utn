import MateriaCard from "../../components/ui/MateriaCard";

export default function MateriasPage() {
  return (
    <main className="h-full flex flex-col gap-10 justify-left px-10">
      <div>
        <h1 className="font-heading text-text-1 text-5xl font-bold">Materias</h1>
        <p className="text-text-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore nihil illum saepe nostrum ducimus laudantium obcaecati nobis magni nesciunt
          aliquid! Voluptatum iste consectetur rem provident aperiam sapiente tenetur doloremque sit.
        </p>
      </div>

      <div className="grid gap-3 grid-cols-3">
        <MateriaCard acronym="AM1" title="Analisis Matematico I" level={1} />
        <MateriaCard acronym="AGA" title="Algebra I" level={1} />
      </div>
    </main>
  );
}
