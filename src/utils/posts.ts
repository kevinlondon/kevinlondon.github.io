export interface BlogPost {
  title: string;
  url: string;
  date: Date;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Use Astro's glob import to get all markdown files
  const posts = await import.meta.glob('../../_posts/*.md', {
    eager: true,
  });

  return Object.entries(posts)
    .map(([filepath, post]: [string, any]) => {
      const filename = filepath.split('/').pop()!;
      const [year, month, day, ...slugParts] = filename.replace('.md', '').split('-');
      const slug = slugParts.join('-');
      
      return {
        title: post.frontmatter.title || slug,
        url: `/blog/${slug}`,
        date: new Date(`${year}-${month}-${day}`)
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
