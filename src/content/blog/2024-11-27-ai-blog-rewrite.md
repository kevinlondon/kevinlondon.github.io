---
title: "Jekyll to Astro: An AI-Assisted Migration"
description: "How I used AI tools to migrate 43 blog posts to Astro, with real examples and lessons from both successful and failed approaches"
pubDatetime: 2024-11-28T11:00:00-7:00
---

**TL;DR**: I used AI tools to move my blog from Jekyll to Astro. Cursor helped me finish in about 3-4 hours (half the usual time), and I spent $10 testing out Aider. The site's faster and easier to maintain now.

My Jekyll blog worked fine but felt a bit dated. I decided to switch to Astro after hearing good things about how it handles Markdown and builds pages quickly. Here's what I started with:

<img src="/assets/ai-blog/blog-home.png" alt="Blog homepage and post list" width="560" />
<img src="/assets/ai-blog/blog-post.png" alt="Blog post" width="560" />

### The Traditional Approach

I started with the [Astro migration guide](https://docs.astro.build/en/guides/migrate-to-astro/from-jekyll/). It's helpful but leaves a lot of details up to you. The community filled in some gaps with guides about [migration trade-offs](https://www.kooslooijesteijn.net/blog/jekyll-or-astro-which-is-better-static-site-generator) and [URL structures](https://humanwhocodes.com/blog/2023/03/astro-jekyll-blog-post-url/). Still, it looked like a lot of manual work ahead. 

Instead of doing everything by hand, I decided to try some AI tools: [Aider](https://www.aider.chat/) (powered by Claude) and [Cursor](https://www.cursor.com/) (also Claude).

### Using Aider

I started with Aider. My first request: "Convert this Jekyll blog to Astro." The result:

<img src="/assets/ai-blog/aider-homepage.png" alt="Aider homepage" width="560" />

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

The experience was frustrating. Aider kept asking to start the dev server, which blocked other input. I couldn't guide it or course-correct beyond answering yes/no - I just watched it make decisions.

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

Even with the narrower scope, the automated approach required significant manual intervention. While it managed to update a few posts, I lost track of which files still needed changes and hit API throttling issues.

### Using Cursor

Cursor clicked right away. The autocomplete was snappy, I could see exactly what it planned to do, and everything just felt smooth.

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

After seeing how smoothly that went, I moved on to something more challenging: the URL structure.

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

The whole thing took about 3-4 hours with Cursor. In that time, I:
- Moved all 43 posts to the new format
- Fixed up the URL structure
- Added descriptions for every post
- Updated the styling

A manual migration would've easily taken 8-10 hours. Sure, I spent $10 testing Aider first, but sometimes you need to experiment to find what works.

The site's better now - faster loads, cleaner look, and better scores on [Page Speed Insights](https://pagespeed.web.dev/):

<img src="/assets/ai-blog/blog-newhome.png" alt="Final homepage" width="560" />
<img src="/assets/ai-blog/blog-newpost.png" alt="Final post" width="560" />

For pagespeed comparison (mobile, desktop):

<img src="/assets/ai-blog/pagespeed-old-mobile.png" alt="Original pagespeed for mobile" width="560" />
<img src="/assets/ai-blog/pagespeed-old-desktop.png" alt="Original pagespeed for desktop" width="560" />

And the new site:
<img src="/assets/ai-blog/pagespeed-new-mobile.png" alt="New pagespeed for mobile" width="560" />
<img src="/assets/ai-blog/pagespeed-new-desktop.png" alt="New pagespeed for desktop" width="560" />

### Lessons Learned

A few things I learned along the way:
- Keep your branches clean. Mixing Jekyll and Astro files confused the AI tools
- Let the AI handle the repetitive stuff - it's great at that
- Try different tools. Cursor worked better for me than Aider, but your mileage may vary

### Looking Forward

AI tools aren't quite ready to handle full migrations on their own, but they're amazing at cutting down repetitive work. The way they're improving, who knows - maybe in a few months this whole thing could be done with one prompt. For now though, the sweet spot is letting AI handle the mechanical stuff while you keep an eye on the overall direction.

And honestly? I'm just glad I didn't have to write 43 blog descriptions by hand.