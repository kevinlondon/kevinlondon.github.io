export interface BlogPost {
  title: string;
  url: string;
  date: Date;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  // This is a placeholder - we'll need to implement the actual logic
  // to read from your _posts directory
  return [
    {
      title: "Color is Red",
      url: "/2024/06/08/color-is-red/",
      date: new Date("2024-06-08")
    },
    {
      title: "One on One Guidelines",
      url: "/2023/11/04/one-on-one-guidelines/",
      date: new Date("2023-11-04")
    }
  ];
}
