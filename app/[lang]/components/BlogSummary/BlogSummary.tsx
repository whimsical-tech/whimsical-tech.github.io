import React from "react";
import Link from "next/link";
import { format } from "date-fns";

import styles from "./BlogSummary.module.css";

interface BlogSummaryProps {
  slug: string;
  lang: string;
  title?: string;
  publishedOn?: string | Date;
  abstract?: string;
}

export default function BlogSummary({
  slug,
  lang,
  title,
  publishedOn,
  abstract,
}: BlogSummaryProps) {
  const href = `/${lang}/${slug}`;
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
          Continue reading <span className={styles.arrow}>→</span>
        </Link>
      </p>
    </div>
  );
}
