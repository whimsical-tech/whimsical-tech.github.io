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

export async function getBlogPostList(): Promise<BlogPost[]> {
  const fileNames = await readDirectory("/content");

  const blogPosts: BlogPost[] = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(`/content/${fileName}`);

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace(".mdx", ""),
      ...frontmatter,
    });
  }

  return blogPosts.sort((p1, p2) =>
    !p1.publishedOn < !p2.publishedOn ? 1 : -1,
  );
}

export const loadBlogPost = React.cache(async function loadBlogPost(slug) {
  let rawContent;

  // Wrapping this operation in a try/catch so that it stops
  // throwing an error if the file can't be found. Instead,
  // we'll return `null`, and the caller can figure out how
  // to handle this situation.
  try {
    rawContent = await readFile(`/content/${slug}.mdx`);
  } catch (err) {
    return null;
  }

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
});

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
