import { MarkdownViewer } from "../components/shared/MarkdownViewer";
import Comment from "../components/shared/comment";

export default function Home() {
  return (
    <main className="h-full flex justify-center items-center px-10">
      <article className="bg-card rounded-lg p-7 h-full flex flex-col gap-4 ">
        <header>
          <h1 className="font-heading text-3xl text-text-1 font-bold">Primer Parcial 2025</h1>
          <h2 className="font-heading text-2xl text-text-3 font-medium =">Ejercicio 5</h2>
        </header>

        <section>
          <p className="font-p text-text-3 font-normal">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur reiciendis culpa nihil eius, assumenda cum sequi optio earum
            quibusdam eveniet! Quo odio inventore quam fuga numquam possimus iusto quidem molestiae. &
          </p>
          <MarkdownViewer content={"$f(x)=x+2$"} />
        </section>

        <footer className="flex flex-col gap-4">
          <Comment />
          <Comment />
        </footer>
      </article>
    </main>
  );
}
