import { getDictionary, Locale } from "@/dictionaries";
import Link from "next/link";
import { format } from "date-fns";

import styles from "./BlogSummary.module.css";

interface BlogSummaryProps {
  slug: string;
  lang: Locale;
  title?: string;
  publishedOn?: string | Date;
  abstract?: string;
}

export default async function BlogSummary({
  slug,
  lang,
  title,
  publishedOn,
  abstract,
}: BlogSummaryProps) {
  const href = `/${lang}/blog/${slug}`;

  const t = await getDictionary(lang);
  const humanizedDate = publishedOn
    ? format(new Date(publishedOn), "MMMM do, yyyy")
    : new Date().toLocaleDateString();

  return (
    <div className={styles.wrapper}>
      <Link href={href} className={styles.title}>
        {title}
      </Link>
      <time dateTime={humanizedDate}>{humanizedDate}</time>
      <p>
        {abstract}{" "}
        <Link href={href} className={styles.continueReadingLink}>
          {t["blog.continue"]} <span className={styles.arrow}>→</span>
        </Link>
      </p>
    </div>
  );
}
