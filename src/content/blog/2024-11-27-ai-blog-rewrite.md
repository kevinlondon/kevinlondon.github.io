---
title: "Jekyll to Astro: AI vs Manual Migration"
description: "A hands-on comparison of using AI tools vs manual approaches to migrate 43 Jekyll posts to Astro, including code examples and practical lessons learned."
pubDatetime: 2024-11-28T11:00:00-7:00
---

**TL;DR**: I migrated my blog to Astro using AI tools. Aider burned $10 in API credits, while Cursor helped complete the migration in 3-4 hours - about half the time of a manual migration.

I needed to update my blog. Over the years, I'd moved from Wordpress to Jekyll (a static site generator powering GitHub Pages), tried Ghost for a bit, and ended up back with a basic Jekyll setup. It worked, but it felt dated.

Astro caught my attention as a newer static site generator optimized for content-focused sites. A few things stood out:

- Built-in Markdown support
- Fast build times
- Modern development experience
- Growing ecosystem

My starting point:

<img src="/assets/ai-blog/blog-home.png" alt="Blog homepage and post list" />
<img src="/assets/ai-blog/blog-post.png" alt="Blog post" />

I decided to try Astro for the rewrite and wanted to experiment with AI tools to help with the migration.

### The Traditional Approach

I started with the official [Astro migration guide](https://docs.astro.build/en/guides/migrate-to-astro/from-jekyll/). It covers the basics but leaves many questions unanswered:

> Much of your existing HTML page content can be converted into Astro pages

> Astro does not have a permalink property that accepts placeholders. You may need to read more about Astro’s page routing if you want to keep your existing URL structure. Or, consider setting redirects at a host like Netlify.

Reading between the lines: I'd need to figure out the URL rewrites and content formatting on my own.

I found some helpful community guides too. One covers [migration trade-offs](https://www.kooslooijesteijn.net/blog/jekyll-or-astro-which-is-better-static-site-generator), and another author wrote about [URL migration](https://humanwhocodes.com/blog/2023/03/astro-jekyll-blog-post-url/) along with creating an [astro-jekyll](https://github.com/humanwhocodes/astro-jekyll) package to help.

Nice resources, but I'd still need to do most of the heavy lifting myself. That got me thinking about AI tools.

### Experimenting with AI

I use AI tools heavily at work - mostly OpenAI for high-level discussions and
GitHub Copilot for code completion. Copilot can be slow, especially in
IntelliJ where there's often a noticeable delay before it starts generating.

I wanted to try something different, so I tested two tools:
1. [Aider](https://www.aider.chat/) - An AI coding assistant using Claude
2. [Cursor](https://www.cursor.com/) - A code editor with built-in AI (coincidentally, also Claude)

### Using Aider

I started with Aider. My first request: "Convert this Jekyll blog to Astro." The result:

<img src="/assets/ai-blog/aider-homepage.png" alt="Aider homepage" />

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
        Aider attempting the migration - lots of dev server restarts and changes without much progress.
    </figcaption>
</figure>

**Video Summary (0:45)**: First attempt with Aider:
1. Asked it to convert Jekyll to Astro
2. Got some config change suggestions
3. Hit a loop of dev server restarts
4. Couldn't get past the server output

The automated approach made it clear: migrations need more than just AI making educated guesses.

--- 

The experience proved frustrating. Aider kept asking to start the dev server (`npm run dev`), which blocked any other input. I couldn't guide it or course-correct - I just watched it make decisions.

I tried again with a smaller scope. This time, I cleaned up my branch and focused on metadata conversion:

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

**Video Summary (0:35)**: Second attempt, keeping it simple:
1. Just asked for frontmatter updates
2. Let it look at the Jekyll metadata
3. Watched it work on date formats
4. Tried to follow its config changes

Even with a narrower focus, the automated approach still needed more hand-holding than I'd hoped.

### Using Cursor

Then I tried Cursor with Claude 3.5 Sonnet and everything clicked. The autocomplete kicked in right away, I could see exactly what it planned to do, and the whole thing felt responsive. After dealing with Copilot's lag in IntelliJ, this felt like a real upgrade.

<figure>
    <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/tWZBZLbR_TA" 
        title="Cursor anticipating Python formatting changes"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        class="border border-skin-line rounded-lg shadow-md">
    </iframe>
    <figcaption class="text-center mt-2 text-sm text-gray-600">
        Cursor anticipating formatting changes while editing Python interpreter output in a blog post.
    </figcaption>
</figure>

**Video Summary (0:40)**: I started editing [this post](https://www.kevinlondon.com/2024/06/08/color-is-red/) to format Python interpreter output. I started removing extra spaces between the carats and it anticipated the other changes I'd make with distinguishing between command and output. I hit tab to accept changes.

Moving on to metadata, I tackled fixing the URL structure first:

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

**Video Summary (0:30)**: URL conversion process:
1. Started with Jekyll's /posts/YYYY-MM-DD-title format
2. Wrote a function to pull out the dates
3. Built new /YYYY/MM/DD/title.html paths

The whole thing took maybe 30 seconds - exactly the kind of quick wins I'd hoped for with AI tools.
---

The URL rewrite came together nicely:

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

The metadata conversion impressed me even more. I asked Cursor to "Migrate the date field and add descriptions for the blog posts" and it delivered:

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

The results exceeded my expectations. The site loads faster, looks cleaner, and scores better on [Page Speed Insights](https://pagespeed.web.dev/). Take a look:

<img src="/assets/ai-blog/blog-newhome.png" alt="Final homepage" />
<img src="/assets/ai-blog/blog-newpost.png" alt="Final post" />

For pagespeed comparison, here's the old site:

<img src="/assets/ai-blog/pagespeed-old-mobile.png" alt="Original pagespeed for mobile" />
<img src="/assets/ai-blog/pagespeed-old-desktop.png" alt="Original pagespeed for desktop" />

And here's the new site:
<img src="/assets/ai-blog/pagespeed-new-mobile.png" alt="New pagespeed for mobile" />
<img src="/assets/ai-blog/pagespeed-new-desktop.png" alt="New pagespeed for desktop" />


### Lessons Learned

Starting a similar migration? Start with a clean template / baseline. I made the rookie mistake of keeping Jekyll and Astro files in the same branch - turns out AI tools don't deal well with that kind of ambiguity.

These AI tools shine at repetitive tasks - updating frontmatter, reformatting code, fixing common patterns. But don't expect them to make big architectural decisions. Let them handle the mechanical work while you focus on the important choices.

Each tool has its strength. Aider handles targeted changes well when you know exactly what you want. Cursor excels at repetitive tasks and keeps you in the loop. Sometimes the manual approach still makes sense - it just takes longer.

### Looking Forward

The pace of AI tool improvements is remarkable. While they can't handle a full migration by themselves yet, they significantly reduce time spent on repetitive tasks. In a few months, this whole process might need just a single prompt.

For now, the balance is clear: let AI handle the mechanical work while you guide the overall migration. I won't miss writing those 43 blog descriptions by hand.