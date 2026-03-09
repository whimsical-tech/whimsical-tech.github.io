import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/dictionaries";
import styles from "./Timeline.module.css";

export default async function Timeline({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const t = await getDictionary(lang);
  return (
    <ul className={styles.timeline}>
      <li>
        <p>{t["timeline.2013"]}</p>
      </li>
      <li>
        <p>{t["timeline.2016"]}</p>
      </li>
      <li>
        <p>{t["timeline.2019"]}</p>
      </li>
      <li>
        <p>{t["timeline.2022"]}</p>
      </li>
      <li>
        <p>{t["timeline.2026"]}</p>
      </li>
    </ul>
  );
}
