---
layout: post
title:  "More Code Review Best Practices"
date:   2018-06-05 20:54:08
---

A few years ago, I wrote about [Code Review Best
Practices](https://www.kevinlondon.com/2015/05/05/code-review-best-practices.html).
Since then, code reviews helped me
learn a new programming language, improve designs, and find
blind spots. I have more recommendations to go along with the
first article.

## Anti-Patterns

Code reviews can be tricky. Developers take pride in their code and
it's hard to have your work dissected. I've seen
a few anti-patterns that can hurt code reviews.

### Code style

If your team uses a style guide, such as [Python's PEP
8](https://www.python.org/dev/peps/pep-0008/),
enforce it with automated tools.
Style discussions can be a form of
[bikeshedding](https://en.wikipedia.org/wiki/Law_of_triviality) and add noise to
a code review.

### Tone

Code reviews usually take place over text, where it's hard to determine
[emotion and
tone](https://www.fastcodesign.com/3036748/why-its-so-hard-to-detect-emotion-in-emails-and-texts).
Words can seem aggressive in a way they might not in-person. I avoid:

#### "just"

What's obvious to you may not be to someone else. The other person may
have tried the suggestion already and chose not to go that route.
You can just omit the word "just" without affecting the meaning, even in this
sentence.

#### "why"

"Why" questions can make it feel like you did something
wrong. I assume that the developer put in their best effort and determine how
they came to their decision. Examples:

* **Avoid**: Why didn't you set up the database connection once?
* **Better**: What's preventing the code from configuring the database connections
    once?

### Shaming

Code reviews should feel good and provide value for everyone involved.
Shaming others can make them want to stop doing code reviews. What do
I mean by shame? Examples:

* **Avoid**: "It feels like you phoned it in here."
* **Avoid**: "Have you ever written in <x language> before?"

In other words, avoid critical comments about the individual.
There's a human on the other side of the code review.

### Yes / No Questions

Open-ended questions allow the other person to explain their thinking. Yes / no
questions can feel like they're leading to an expected answer. For example:

* **Avoid**: Do you think we should refactor this?
* **Better**: How can we design this so we can reuse it in the other section?

These questions both have the same intent. The first question implies that the
answer should be "YES!". It's a question in form only. The second question
could start a discussion.

## Approach Recommendations

We can make code reviews more effective by making changes in how we approach
them. While the earlier best practice article covers items to look for, these
tips focus on how we do code reviews.

### Comment on the Good Stuff

Code reviews are conversations and not a "This is what's wrong with your code"
exercise. Point out positive aspects of the code. If a developer has improved,
mention the improvement! If you learn something new from reading their code,
mention that too.

### Offer Context

I mentioned that I review my own code before pushing it.
I've started to leave comments on my code reviews for others to understand the
change's context. I like to discuss what the code review includes (and why) and
alternatives I considered.

> "This implements a new API endpoint and functional
> tests for it. I refactored the authentication logic because I needed to make
> changes to fix the API tokens."

Context comments provide an entry point for people new to your code.
If you're submitting code for review, you've been thinking about it for a while.
Your reviewer doesn't have the same knowledge about your choices that
you do.

### Think Big

Think about architectural choices when looking at code.
Does the design make sense? When reviewing code, it's tempting to focus on issues like
"Should this variable be `final`?" and miss bigger issues.

### Use "Baby Mind"

I like to use something I call "baby mind" when I'm doing code reviews. When
looking at the code review specifics, I try to avoid thinking. I ask
questions when confused. If it's confusing now, it will still be
confusing later.

### Limit Your Time

I like to spend no more than an hour on a code review. That can mean
cutting up code reviews so they're easier to
review and ship. If large code reviews are the norm, examine the
development process. Try to make the changes (and tickets) smaller in scope.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">10 lines of code = 10 issues.<br><br>500 lines of code = &quot;looks fine.&quot;<br><br>Code reviews.</p>&mdash; I Am Devloper (@iamdevloper) <a href="https://twitter.com/iamdevloper/status/397664295875805184?ref_src=twsrc%5Etfw">November 5, 2013</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Implementing these Suggestions

It's hard to apply these tips all at once. I recommend the following:

1. Pick one topic
2. Try it out for a few days
3. Determine if it's useful
4. Repeat

If you find it helps you and your team, great! I hope you find these
tips useful as you figure out what works for you and your team.
