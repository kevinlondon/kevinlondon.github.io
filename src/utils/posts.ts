export interface BlogPost {
  title: string;
  url: string;
  date: Date;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Use Astro's glob import to get all markdown files
  const posts = await import.meta.glob('/_posts/*.md', { as: 'raw' });
  
  return Object.entries(posts).map(([filepath, _]) => {
    const filename = filepath.split('/').pop()!;
    const [year, month, day, ...slugParts] = filename.replace('.md', '').split('-');
    const slug = slugParts.join('-');
    
    return {
      title: slug.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      url: `/blog/${slug}`,
      date: new Date(`${year}-${month}-${day}`)
    };
  })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
