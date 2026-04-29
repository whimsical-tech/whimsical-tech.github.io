import React from "react";

import { getDictionary, hasLocale } from "@/dictionaries";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { loadBlogPost } from "../../helpers/file-helpers";
import COMPONENT_MAP from "../../helpers/mdx-components";

import BlogHero from "../../components/BlogHero/BlogHero";

import styles from "./blogSlug.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; blogSlug: string }>;
}) {
  const { blogSlug, lang } = await params;
  const blogPostData = await loadBlogPost(blogSlug, lang);

  // If we can't locate the blog post, this will be a 404. This
  // means that the returned value from this function won't
  // actually be used. We'll return `null` purely to avoid an error.
  if (!blogPostData) {
    return null;
  }

  const { frontmatter } = blogPostData;

  return {
    title: `${frontmatter.title} • Whimsical Tech`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({
  params,
}: {
  params: Promise<{ lang: string; blogSlug: string }>;
}) {
  const { lang, blogSlug } = await params;

  if (!hasLocale(lang)) notFound();
  const blogPostData = await loadBlogPost(blogSlug, lang);

  // If there is no blog post with the slug taken from the route
  // params, render a 404 page instead.
  if (!blogPostData) {
    notFound();
  }

  const { frontmatter, content } = blogPostData;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
