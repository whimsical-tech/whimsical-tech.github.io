import Contact from "./components/Contact/Contact";
import Intro from "./components/Intro/Intro";
import Skills from "./components/Skills/Skills";
import NavBar from "./components/NavBar/NavBar";
import Timeline from "./components/Timeline/Timeline";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main>
        <Intro />
        <Skills />
        <Timeline />
        <Contact />
      </main>
    </div>
  );
}
