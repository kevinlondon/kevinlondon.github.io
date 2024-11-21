---
title:  "More Code Review Best Practices"
pubDatetime: 2018-06-05T20:54:08
description: "A few more code review best practices"
---

A few years ago, I wrote about [Code Review Best
Practices](https://www.kevinlondon.com/2015/05/05/code-review-best-practices.html).
I've found code reviews to be one of the most valuable tools for growing as
a developer. I think the kind of feedback we get from code reviews is invaluable
and I'd like to share what I've learned since the original post.

### Style

If your team uses a style guide, such as [Python's PEP
8](https://www.python.org/dev/peps/pep-0008/),
enforce it with automated tools.
Style discussions can be a form of
[bikeshedding](https://en.wikipedia.org/wiki/Law_of_triviality) and add noise.

### Comment on the Good Stuff

Code reviews are conversations and not a _"This is what's wrong with your code"_
exercise. Point out positive aspects of the code. If a developer has improved,
mention the improvement! If you learn something new from reading their code,
mention that too.


### Tone

Code reviews usually take place over text, where it's hard to determine
[emotion and
tone](https://www.fastcodesign.com/3036748/why-its-so-hard-to-detect-emotion-in-emails-and-texts).
Words can seem aggressive in a way they might not in-person. Here's a few words
to avoid:

> "just"

What's obvious to you may not be to someone else. The other person may
have tried the suggestion already and chose not to go that route.
You can just omit the word "just" without affecting the meaning, even in this
sentence.

> "why"

"Why" questions can sound aggressive and force the other person to defend their
position. I recommend framing "why" questions as "how" or "what" instead to
find how they came to their decision. Examples:

* **Avoid**: Why didn't you set up the database connection once?
* **Better**: What's preventing the code from configuring the database connections
    once?

### Offer Context

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

### Avoid Yes / No Questions

Open-ended questions allow the other person to explain their thinking. Yes / no
questions can feel like they're leading to an expected answer. For example:

* **Avoid**: Do you think we should refactor this?
* **Better**: How can we design this so we can reuse it in the other section?

The first question implies that the answer should be "YES!" -- it's a question
in form only. The second question could start a discussion.

### Think Big

Think about architectural choices when looking at code.
Does the design make sense? When reviewing code, it's tempting to focus on issues like
"Should this variable be `final`?" and miss bigger issues.

### Baby Mind

Once we've settled the architectural questions, I like to go into "baby mind". In other
words, I try not think about the code. If I have to think deeply to figure out
what the code does, it's confusing and can hide bugs.
In a few months when we come back to the code, it should still be easy to read
and understand.


### Time-box Reviews

I like to spend no more than an hour on a code review. That can mean
cutting up code reviews so they're easier to
review and ship. If large code reviews are the norm,
try to make the changes (and tickets) smaller in scope.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">10 lines of code = 10 issues.<br><br>500 lines of code = &quot;looks fine.&quot;<br><br>Code reviews.</p>&mdash; I Am Devloper (@iamdevloper) <a href="https://twitter.com/iamdevloper/status/397664295875805184?ref_src=twsrc%5Etfw">November 5, 2013</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


### Wrapping Up

That's it! I hope you find these practices useful. I'll do a post in a few more
years if this changes.
