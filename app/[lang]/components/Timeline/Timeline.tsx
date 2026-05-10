import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { Locale, hasLocale } from "@/i18n-config";
import styles from "./Timeline.module.css";

export default async function Timeline({
  params,
}: {
  params: Promise<{ lang: Locale }>;
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
