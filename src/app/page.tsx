export default function Page() {
  return (
    <main className="h-full flex justify-center items-center">
      <section className="flex flex-col justify-between items-center h-screen w-full bg-no-repeat bg-cover bg-center pt-30 pb-20" style={{backgroundImage: `url('/background.png')` }}>
        <hgroup className="flex flex-col justify-center items-center h-fit">
          <h1 className="uppercase text-7xl sm:text-8xl font-font1 text-shadow-h2 text-shadow-black">repositorio-utn</h1>
          <p className="font-font2 text-center text-xl">Buscamos crear el repositorio de la utn con <br /> examenes para ayudarte a estudiar </p>
        </hgroup>
        <a href="mailto:someone@example.com" className="text-3xl  font-font1 uppercase"> Aportar</a>
      </section>
    </main>
  );
}
