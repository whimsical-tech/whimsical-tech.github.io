import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/i18n-config";
import { Locale } from "@/i18n-config";
import styles from "./Contact.module.css";

export default async function Contact({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const t = await getDictionary(lang);
  return (
    <footer id="contact" className={styles.contact}>
      <p className={styles.mailLink}>
        {t.contact}{" "}
        <a href="mailto:whimsicaltech+portfolio@proton.me">
          {" "}
          whimsicaltech+portfolio@proton.me
        </a>
      </p>
    </footer>
  );
}
