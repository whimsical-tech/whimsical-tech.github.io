import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import React from "react";

interface BlogPost {
  slug: string;
  title?: string;
  abstract?: string;
  publishedOn?: string | Date;
}

export async function getBlogPostList(locale: string): Promise<BlogPost[]> {
  const contentDir = path.join(process.cwd(), "content", locale);
  const fileNames = await fs.readdir(contentDir);

  const blogPosts: BlogPost[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".mdx")) continue;

    const rawContent = await fs.readFile(
      path.join(contentDir, fileName),
      "utf8",
    );

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace(".mdx", ""),
      ...frontmatter,
    });
  }

  return blogPosts.sort((a, b) => (!a.publishedOn < !b.publishedOn ? 1 : -1));
}

export const loadBlogPost = React.cache(async function loadBlogPost(
  slug: string,
  locale: string,
) {
  const filePath = path.join(process.cwd(), "content", locale, `${slug}.mdx`);

  try {
    const rawContent = await fs.readFile(filePath, "utf8");
    const { data: frontmatter, content } = matter(rawContent);
    return { frontmatter, content };
  } catch {
    return null;
  }
});

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}
