import AboutMe from "./components/AboutMe/AboutMe";
import Contact from "./components/Contact/Contact";
import Skills from "./components/Skills/Skills";
import Timeline from "./components/Timeline/Timeline";
import { Locale } from "@/i18n-config";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return (
    <div>
      <main className="wrapper">
        <AboutMe lang={lang} />
        <Skills />
        <Timeline params={params} />
        <Contact params={params} />
      </main>
    </div>
  );
}
