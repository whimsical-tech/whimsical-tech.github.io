"use client";

import { DiscussionEmbed } from "disqus-react";

interface DisqusCommentsProps {
  blogSlug: string;
  title: string;
}

export default function DisqusComments({
  blogSlug,
  title,
}: DisqusCommentsProps) {
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blogSlug}`,
    identifier: blogSlug,
    title: title,
  };

  return (
    <div>
      <DiscussionEmbed
        shortname={process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || ""}
        config={disqusConfig}
      />
    </div>
  );
}
