import React from "react";

import { getDictionary, hasLocale } from "@/dictionaries";
import { getBlogPostList } from "../helpers/file-helpers";
import BlogSummary from "../components/BlogSummary/BlogSummary";

import styles from "./blogpage.module.css";

async function BlogHome({
  params,
}: {
  params: Promise<{ lang: string; blogSlug: string }>;
}) {
  const { lang, blogSlug } = await params;

  if (!hasLocale(lang)) notFound();
  const blogPosts = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {blogPosts.map((post) => (
        <BlogSummary
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
