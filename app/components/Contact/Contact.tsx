import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { Locale, hasLocale } from "@/i18n-config";
import Image from "next/image";
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
      <a href="https://qiita.com/frontendpro" target="_blank" rel="noreferrer">
        <Image src="/qiita.png" alt="Qiita" width={40} height={40} />
      </a>
      <a href="https://qiita.com/frontendpro" target="_blank" rel="noreferrer">
        <Image src="/in.png" alt="LinkedIn" width={40} height={40} />
      </a>
    </footer>
  );
}
