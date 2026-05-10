import Contact from "./components/Contact/Contact";
import Intro from "./components/Intro/Intro";
import Skills from "./components/Skills/Skills";
import Timeline from "./components/Timeline/Timeline";
import { Locale } from "@/i18n-config";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
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
