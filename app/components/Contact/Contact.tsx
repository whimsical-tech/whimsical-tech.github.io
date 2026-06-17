import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { Locale, hasLocale } from "@/i18n-config";
import { MdBeachAccess } from "react-icons/md";
import { IoIosMail } from "react-icons/io";

import { FaLinkedin } from "react-icons/fa";

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
      <p className={styles.heading}>
        <MdBeachAccess width={40} height={40} />
        {t.contact}
      </p>
      <div className={styles.icons}>
        <a href="mailto:whimsicaltech+portfolio@proton.me">
          <IoIosMail />
        </a>
        <a
          href="https://qiita.com/frontendpro"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/images/qiita.png" alt="Qiita" width={36} height={36} />
        </a>
        <a
          href="https://www.linkedin.com/in/acsfrontend/?locale=en"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin color="#0a66c2" />
        </a>
      </div>
    </footer>
  );
}
