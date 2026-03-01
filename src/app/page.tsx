import Image from "next/image";
import Intro from "./components/Intro/Intro";
import Skills from "./components/Skills/Skills";

export default function Home() {
  return (
    <div>
      <main>
        <Intro />
        <Skills />
        <div>
          Thank you for the visit! Contact me at{" "}
          <a href="mailto:whimsicaltech+portfolio@proton.me">
            whimsicaltech+portfolio@proton.me
          </a>
        </div>
      </main>
    </div>
  );
}
