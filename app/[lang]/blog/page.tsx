import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { Locale, hasLocale } from "@/i18n-config";
import { getBlogPostList } from "@/app/helpers/file-helpers";
import BlogSummary from "@/app/components/BlogSummary/BlogSummary";

import styles from "./blogpage.module.css";

async function BlogHome({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const t = await getDictionary(lang);
  const blogPosts = await getBlogPostList(lang);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>{t["blog.latest"]}</h1>

      {blogPosts.map((post) => (
        <BlogSummary
          lang={lang}
          key={post.slug}
          slug={post.slug}
          title={post.title}
          abstract={post.abstract}
          publishedOn={post.publishedOn}
        />
      ))}
    </div>
  );
}

export default BlogHome;
