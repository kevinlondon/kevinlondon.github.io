---
title: "Rewriting my blog with AI"
description: "I used AI tools to migrate from Jekyll to Astro. Here's what worked, what didn't, and what I learned."
pubDatetime: 2024-11-27T11:00:00-7:00
---

**TL;DR**: I migrated my blog to Astro using AI tools. Aider burned $10 in API credits with little progress, while Cursor helped complete the migration in 3-4 hours instead of the estimated 8-10 hours manually.

I needed to update my blog. Over the years, I'd moved from Wordpress to Jekyll (a static site generator powering GitHub Pages), tried Ghost for a bit, and ended up back with a basic Jekyll setup. It worked, but it felt dated.

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
        aria-label="Video demonstration of Aider migration attempt"
        class="border border-skin-line rounded-lg shadow-md">
    </iframe>
    <figcaption class="text-center mt-2 text-sm text-gray-600">
        Here's what happened when I let Aider run with it - lots of dev server restarts and changes without much progress.
    </figcaption>
</figure>

<div class="prose mt-4 mb-6 text-sm text-gray-700">
    **Video Summary (0:45)**: My first try with Aider went like this:
    1. Asked it to convert Jekyll to Astro
    2. Got some config change suggestions
    3. Hit a loop of dev server restarts
    4. Couldn't get past the server output
    
    It's pretty clear that automated migrations need more than just AI making educated guesses.
</div>

I figured I'd try again with a smaller scope. This time, I cleaned up my branch by removing the Jekyll files and just asked Aider to handle the metadata conversion:

<figure>
    <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/q8q_DWUOCA8?si=4kBtY0LP2n8_IK6Y" 
        title="Aider attempting metadata updates"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        class="border border-skin-line rounded-lg shadow-md">
    </iframe>
    <figcaption class="text-center mt-2 text-sm text-gray-600">
        Round two with Aider - focused just on metadata but still hit some snags.
    </figcaption>
</figure>

<div class="prose mt-4 mb-6 text-sm text-gray-700">
    **Video Summary (0:35)**: Second attempt, keeping it simple:
    1. Just asked for frontmatter updates
    2. Let it look at the Jekyll metadata
    3. Watched it work on date formats
    4. Tried to follow its config changes
    
    Even with a narrower focus, the automated approach still needed more hand-holding than I'd hoped.
</div>

### Using Cursor

Then I tried Cursor - what a difference. The autocomplete kicked in right away, I could see exactly what it planned to do, and the whole thing felt responsive. After dealing with Copilot's lag in IntelliJ, this felt like a real upgrade.

I used Cursor with Claude 3.5 Sonnet. Here's an example of fixing the URL structure:

<figure>
    <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/Y_V636f5giM?si=4kBtY0LP2n8_IK6Y" 
        title="Cursor fixing URL structure"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        class="border border-skin-line rounded-lg shadow-md">
    </iframe>
    <figcaption class="text-center mt-2 text-sm text-gray-600">
        Check out how quickly Cursor handles the URL conversion - no waiting around, just clean transforms from Jekyll to Astro format.
    </figcaption>
</figure>

<div class="prose mt-4 mb-6 text-sm text-gray-700">
    **Video Summary (0:30)**: Quick look at URL handling:
    1. Started with Jekyll's /posts/YYYY-MM-DD-title format
    2. Wrote a function to pull out the dates
    3. Built new /YYYY/MM/DD/title.html paths
    
    The whole thing took maybe 30 seconds - exactly the kind of quick wins I'd hoped for with AI tools.
</div>

The URL rewrite turned out pretty clean. Here's what the code looked like:

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

But here's where Cursor & Claude excelled - the metadata updates. I asked it to "Migrate the date field and add descriptions for the blog posts" and it did something clever:

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

Not only did it handle the format conversion, it also wrote reasonable descriptions and added relevant tags. Sure, the descriptions are a bit formulaic, but when you need to update 40+ posts, it's a great starting point.

### Cost and Time

The whole thing took about 3-4 hours with Cursor, including updating descriptions for all 43 posts, fixing URLs, and tweaking styles. I burned $10 on those early Aider experiments, but honestly - sometimes you need to try things to know what doesn't work. For comparison, doing this manually would've eaten up 8-10 hours easily.

The end result? Better than expected! The site loads faster, looks cleaner, and even scores better on [Page Speed Insights](https://pagespeed.web.dev/). Take a look:

<img src="/assets/ai-blog/blog-newhome.png" alt="Final homepage" />
<img src="/assets/ai-blog/blog-newpost.png" alt="Final post" />

### Lessons Learned

If you're thinking about trying something similar, here's what I learned: start with a clean template / baseline. I made the rookie mistake of keeping Jekyll and Astro files in the same branch - turns out AI tools don't deal well with that kind of ambiguity.

These AI tools shine at the repetitive stuff - updating frontmatter, reformatting code, that sort of thing. But don't expect them to make big architectural decisions. Let them handle the boring parts while you focus on the important choices.

Each tool has its sweet spot. Aider works great for targeted changes when you know exactly what you want. Cursor excels at repetitive tasks and keeps you in the loop. And sometimes the manual approach still makes sense - it just takes longer.

### Looking Forward

The speed of AI tool improvements has impressed me. While they can't handle a full migration by themselves yet, they already save tons of time on repetitive tasks. Give it a few months and maybe this whole process will just need a single prompt.

For now though, the sweet spot seems clear: let AI handle the tedious parts while you keep an eye on the big picture. And hey - at least we'll never have to write 43 blog descriptions by hand again.