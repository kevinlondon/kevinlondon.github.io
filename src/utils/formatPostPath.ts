import type { CollectionEntry } from "astro:content";

export function formatPostPath(post: CollectionEntry<"blog">) {
  const [year, month, day, ...titleParts] = post.slug.split('-');
  return `/${year}/${month}/${day}/${titleParts.join('-')}`;
} 