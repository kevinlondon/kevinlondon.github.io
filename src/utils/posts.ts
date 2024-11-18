import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  title: string;
  url: string;
  date: Date;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), '_posts');
  const files = await fs.readdir(postsDirectory);
  
  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      // Parse the filename to get the date and slug
      // Format: YYYY-MM-DD-title.md
      const [year, month, day, ...slugParts] = filename.replace('.md', '').split('-');
      const slug = slugParts.join('-');
      
      return {
        title: data.title || slug,
        url: `/${year}/${month}/${day}/${slug}/`,
        date: new Date(`${year}-${month}-${day}`)
      };
    })
  );

  // Sort posts by date, newest first
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}
