export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center p-5 bg-linear-to-r from-rose-100 to-teal-100">
      <section className="bg-foreground rounded-lg p-5 ">
        <h1 className="font-heading text-4xl text-text-1 font-bold">Hola &</h1>
        <h2 className="text-2xl text-text-2 font-medium">Esto es una prueba</h2>
        <p className="font-p text-text-3 font-normal">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur reiciendis culpa nihil eius, assumenda cum sequi optio earum quibusdam
          eveniet! Quo odio inventore quam fuga numquam possimus iusto quidem molestiae. &
        </p>
      </section>
    </main>
  );
}
