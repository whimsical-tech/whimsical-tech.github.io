import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/dictionaries";
import IntroSlideshow from "./IntroSlideshow";
import styles from "./Intro.module.css";
import Sun from "../Sun/Sun";

interface Slide {
  text: string;
  segments: { text: string; highlighted: boolean }[];
}

export default async function Intro({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const t = await getDictionary(lang);
  const slides: Slide[] = t["intro.slides"] as Slide[];

  return (
    <section className={styles.intro} id="intro">
      <IntroSlideshow slides={slides} />
      <Sun />
    </section>
  );
}
