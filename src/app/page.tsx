import Intro from "./components/Intro/Intro";
import Skills from "./components/Skills/Skills";
import NavBar from "./components/NavBar/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main>
        <Intro />
        <Skills />
        <div id="contact">
          Thank you for the visit! Contact me at{" "}
          <a href="mailto:whimsicaltech+portfolio@proton.me">
            whimsicaltech+portfolio@proton.me
          </a>
        </div>
      </main>
    </div>
  );
}
