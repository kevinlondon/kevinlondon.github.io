I think about almost everything in terms of analogies. They help me think about
and explain complex ideas.  I'd like to share a few of my favorite analogies for
thinking about writing software.


Two Trains
----------

Have you ever seen a scene in a film where someone has to jump from one moving
train to another? It looks really dangerous ([and
is!](https://en.wikipedia.org/wiki/Train_surfing#Risks)).
Maybe there's some bumps in the tracks or an upcoming
tunnel that would knock the protagonist off of the train?

That's how I view doing application rewrites or a large refactoring.
When you're doing a rewrite, it can feel like a great idea.
The tricky part: How do you cut over from the old thing to the new? When will
you be ready and how will you know when it's time?

There has to be a point where you cut-over. The switch gets harder if, along the
way, you decide to implement new features. It's best to exactly match the
existing functionality and, once you've switched over, think about adding in the
new features or fixing known bugs.

For example, I automated some AWS environments we had with
[Terraform](https://www.terraform.io/). Along the
way, I saw things I wanted to change about the way our
environments worked. Wouldn't it be cool to use Docker? Or Continuous
Deployment? I wrote those ideas down and kept going without implementing them.

When we switched environments from the old to the new, we found a few problems
that we didn't know about. Configuration that had been missed, or some settings
that had not been set properly.  We would have encountered much worse had we
introduced new functionality at the same time! Doing the minimum necessary made
it much simpler to switch.

There have been other times where I chose to implement something along the way.
I remember I once rewrote an archival application and, in the process, also
added the ability to archive files in a different format.
I got about 80% of the way through the rewrite when I had to return to the
original application and add features. I missed my window of opportunity where
I could refactor because I chose to add in new functionality.
The rewrite got shelved.

Joel Spolsky wrote my favorite essay on Not Rewriting that I've come across in
[Things You Should Never Do, Part
1](http://www.joelonsoftware.com/articles/fog0000000069.html). Still, if you're
going to do a rewrite of some kind, keep the Two Trains analogy in mind. It's
hard enough to make the jump.


Trash Pile
----------

If you're at a dump, you won't think twice about throwing a piece of trash onto
the top of a pile. It's a dump. There's a big pile of trash. Who would even notice?

In software, legacy applications can feel like the same thing. If there's
a messy codebase, who would care if you wrote something without tests? Or if you
added in just a few lines of code to a 300 line method? What's the harm?

Instead, I think it's best to clean up the pile of trash as you're there.

An example. At a previous job, we had a big legacy codebase and a new shiny API.
No one wanted to work on the legacy codebase.  When a developer needed to add
a new feature or fix a bug, the person who fixed it do so in the laziest
possible way.  When I asked about areas for improvement during their code
reviews, they'd say "Who cares? It's just the legacy codebase? It's going away
soon anyway."

I should mention that this particular "legacy codebase" had been around for so
long already that in it was *another* legacy codebase inside of it.
A sub-legacy.

We changed our attitude towards working with the legacy code. We built tests.
We followed best practices. We reworked our code review processes. Eventually,
it got to a pretty good place and developers stopped avoiding it. We had to live
with the pile of trash, so we chose to own it and improve instead of letting it
rot.

If you can leave the code better than you found it, then you'll prevent other people
from treating it like a pile of trash too.

Tube of Toothpaste
------------------

You know how when you buy a tube of toothpaste, it's really easy to get the
toothpaste out? In the beginning, it doesn't matter what you do, you'll get
toothpaste.  As you near the end of it, though,
it's hard to get the toothpaste out. You have to roll the tube from the
bottom.

New codebases are really easy to work in because there's so much greenfield.
Everything is a new choice. As it grows, gets older, gets more quirky, it
becomes harder. Sometimes it's tempting to take the shortcut or just barely do
enough to do what you need.

I think Kent Beck said it best:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">for each
desired change, make the change easy (warning: this may be hard), then make the
easy change</p>&mdash; Kent Beck (@KentBeck) <a
href="https://twitter.com/KentBeck/status/250733358307500032">September 25,
2012</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

One time, I added an `if` statement to a class that performed validation. I only
needed to add one conditional but I needed to add it to a function that spanned
many lines and had 10 other similar conditionals already.
I could have added in my little conditional, tested it
manually, and called it done.

Instead, I chose to write a test to make sure
I wouldn't break existing functionality and then refactor.
I got the test passing and then reconstructed the validation call into
a series of little methods, each easily testible. It made it easy to make the
change I wanted and then I made the easy change. As an added bonus, we added
another bit of validation logic the next week. It was an easy change.

It's better to lightly refactor
the thing you're working in so that it's easy to make your change and then make
the easy change.
