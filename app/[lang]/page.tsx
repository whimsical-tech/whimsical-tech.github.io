import Contact from "./components/Contact/Contact";
import Intro from "./components/Intro/Intro";
import Skills from "./components/Skills/Skills";
import NavBar from "./components/NavBar/NavBar";
import Timeline from "./components/Timeline/Timeline";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <div>
      <NavBar />
      <main>
        <Intro params={params} />
        <Skills />
        <Timeline params={params} />
        <Contact />
      </main>
    </div>
  );
}
