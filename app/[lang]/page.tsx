import Contact from "./components/Contact/Contact";
import Intro from "./components/Intro/Intro";
import Skills from "./components/Skills/Skills";
import Timeline from "./components/Timeline/Timeline";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <div>
      <main className="wrapper">
        <Intro params={params} />
        <Skills />
        <Timeline params={params} />
        <Contact params={params} />
      </main>
    </div>
  );
}
