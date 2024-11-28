---
title: "Rewriting my blog with AI"
description: "I used AI tools to migrate from Jekyll to Astro. Here's what worked, what didn't, and what I learned."
pubDatetime: 2024-11-27T11:00:00-7:00
---

**TL;DR**: I migrated my blog to Astro using AI tools. Aider was frustrating and burned $10 in API credits, but Cursor turned out to be surprisingly effective. The whole migration took about 3-4 hours instead of the estimated 8-10 hours manually.

I've been blogging for years, trying different platforms along the way. Started with Wordpress, moved to Jekyll (a static site generator that powers GitHub Pages), and briefly experimented with Ghost. My Jekyll setup was still using the base installation and needed an update. 

I'd been hearing good things about Astro, a newer static site generator that's optimized for content-focused sites. It caught my attention for a few reasons:

- Built-in Markdown support
- Fast build times
- Modern development experience
- Growing ecosystem

Here's what I started with:

<img src="/assets/ai-blog/blog-home.png" alt="Blog homepage and post list" />
<img src="/assets/ai-blog/blog-post.png" alt="Blog post" />

I decided to try Astro for the rewrite and wanted to experiment with AI tools to help with the migration.

### The Traditional Approach

The official [Astro migration guide](https://docs.astro.build/en/guides/migrate-to-astro/from-jekyll/) exists, but it's pretty bare bones. For example:

> Much of your existing HTML page content can be converted into Astro pages

> Astro does not have a permalink property that accepts placeholders. You may need to read more about Astro’s page routing if you want to keep your existing URL structure. Or, consider setting redirects at a host like Netlify.

So yeah, it would work, but I have to rewrite all the URLs as well as migrate the content formatting.

There's other guides as well, like [this
one](https://www.kooslooijesteijn.net/blog/jekyll-or-astro-which-is-better-static-site-generator),
which goes into depth about the trade-offs and how to migrate, and [Creating a
Jekyll-style blog post URL in
Astro](https://humanwhocodes.com/blog/2023/03/astro-jekyll-blog-post-url/) which
goes into the details of how to migrate the URLs specifically (there's also [a
package they made for this: [astro-jekyll](https://github.com/humanwhocodes/astro-jekyll)]). 

But, you're still pretty much on your own to do the migration.

### Experimenting with AI

I use AI tools heavily at work - mostly OpenAI/Claude for high-level discussions and GitHub Copilot for code completion. Copilot works but can be slow, especially in IntelliJ where there's often a noticeable delay before it starts generating.

I wanted to try something different, so I tested two tools:
1. [Aider](https://www.aider.chat/) - An AI coding assistant using Claude
2. [Cursor](https://www.cursor.com/) - A code editor with built-in AI

### Using Aider

I subscribed to Claude since it's considered one of the better options right now for coding. I asked Aider to rewrite my Jekyll blog to use Astro, and... well, let me show you what happened.

The homepage ended up looking like this:

<img src="/assets/ai-blog/aider-homepage.png" alt="Aider homepage" />

The experience was frustrating. Aider kept asking me to start the dev server (`npm run dev`), which blocked any other input. I couldn't guide it or course-correct - I was just watching it make decisions.

Here's what it looked like in action:

<figure>
    <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/8-lzzK6dRAU" 
        title="Demo of Aider attempting blog migration"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        aria-label="Video demonstration of Aider migration attempt">
    </iframe>
    <figcaption>Demonstration of Aider attempting the initial migration</figcaption>
</figure>

I want to be fair - it's likely I wasn't using Aider correctly, or this wasn't the right use case. Many developers love Aider, but this particular experience wasn't great.

### Using Cursor

Switching to Cursor was immediately better. The autocomplete was fast, the feedback loop was tight, and I could actually see what was happening. After getting used to Copilot's delay in IntelliJ, Cursor's responsiveness was shocking.

I used Cursor with Claude 3.5 Sonnet. Here's an example of fixing the URL structure:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Y_V636f5giM?si=4kBtY0LP2n8_IK6Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The URL rewrite was pretty straightforward. Here's the final code:

```ts
export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.map(post => {
    console.log(`Processing post: ${post.slug}`);
    
    const [year, month, day, ...titleParts] = post.slug.split('-');
    const slug = `${titleParts.join('-')}.html`;
    
    console.log(`Generated path: /${year}/${month}/${day}/${slug}`);
    
    return {
      params: { year, month, day, slug },
      props: { post },
    };
  });
}
```

What impressed me most was how Cursor handled metadata updates. When I asked it to "Migrate the date field and provide a description for the blog posts", it did something clever:

Before:

```
---
layout: post
title: Reflections on my Amazon Career
date: 2022-06-03 07:57:01.000000000 -07:00
---
```

After:
```
---
title: Reflections on my Amazon Career
pubDatetime: 2022-06-03T07:57:01-07:00
description: "After four years at Amazon, I wanted to share what made Amazon
successful across so many industries. Here's what I learned about engineering
culture, Leadership Principles, and building customer-focused teams."
tags:
  - career
  - amazon
  - leadership
---
```

Not only did it handle the format conversion, but it wrote reasonable descriptions and added relevant tags. Sure, the descriptions are a bit formulaic, but when you need to update 40+ posts, it's a great starting point.

### Cost and Time

The migration took about 3-4 hours with Cursor, including updating descriptions for 43 posts, fixing URLs, and tweaking styles. I spent about $10 on Aider/Claude attempts before that, though I probably could have skipped those steps. For comparison, I estimate this would have taken 8-10 hours to do manually.

I'm happy with the results - the site is faster, looks better, and even gets better [Page Speed Insights](https://pagespeed.web.dev/) scores. Here's how it turned out:

<img src="/assets/ai-blog/blog-newhome.png" alt="Final homepage" />
<img src="/assets/ai-blog/blog-newpost.png" alt="Final post" />

### Lessons Learned

If you're considering a similar migration, start with a working template. I made the mistake of having both Jekyll and Astro files in the same branch, which confused the AI tools. Keep your migrations clean and focused.

AI tools excel at repetitive tasks like updating frontmatter or reformatting code. They're not great at making architectural decisions or handling complete migrations. Let them handle the boring parts while you focus on the important decisions.

Each tool has its strengths. Aider is great for targeted code changes but struggles with bulk operations. Cursor shines at repetitive tasks and provides better context awareness. Traditional methods take longer but are more predictable.

### Looking Forward

The pace of improvement in AI tools is remarkable. While they're not ready to handle complete migrations yet, they're already incredibly useful for speeding up repetitive tasks. I wouldn't be surprised if, in a few months, this entire process could be automated.

For now, though, the sweet spot is using AI to accelerate specific tasks while maintaining human oversight of the overall migration. And hey, at least we don't have to write 43 blog post descriptions by hand anymore.