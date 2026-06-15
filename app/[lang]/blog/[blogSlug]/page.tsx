import { i18n, Locale, hasLocale } from "@/i18n-config";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getBlogPostList, loadBlogPost } from "@/app/helpers/file-helpers";
import COMPONENT_MAP from "@/app/helpers/mdx-components";

import BlogHero from "@/app/components/BlogHero/BlogHero";
import UtterancesComments from "@/app/components/UtterancesComments/UtterancesComments";

import styles from "./blogSlug.module.css";

export async function generateStaticParams() {
  const params = [];

  for (const locale of i18n.locales) {
    const posts = await getBlogPostList(locale);

    for (const post of posts) {
      params.push({
        lang: locale,
        blogSlug: post.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; blogSlug: string }>;
}) {
  const { blogSlug, lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

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
  params: Promise<{ lang: Locale; blogSlug: string }>;
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
        lang={lang}
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={COMPONENT_MAP} />
        <UtterancesComments
          repo={process.env.NEXT_PUBLIC_UTTERANCES_REPO || ""}
        />
      </div>
    </article>
  );
}

export default BlogPost;
