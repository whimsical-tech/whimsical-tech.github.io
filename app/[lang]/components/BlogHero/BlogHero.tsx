import { getDictionary } from "@/dictionaries";
import { format } from "date-fns";
import clsx from "clsx";

import styles from "./BlogHero.module.css";
import { Locale } from "@/i18n-config";

interface BlogHeroProps {
  title: string;
  lang: Locale;
  publishedOn: string;
  className?: string;
}

async function BlogHero({
  title,
  lang,
  publishedOn,
  className,
  ...delegated
}: BlogHeroProps) {
  const humanizedDate = format(new Date(publishedOn), "MMMM do, yyyy");
  const t = await getDictionary(lang);

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>
          {t["blog.publishedOn"]}{" "}
          <time dateTime={publishedOn}>{humanizedDate}</time>
        </p>
      </div>
    </header>
  );
}

export default BlogHero;
