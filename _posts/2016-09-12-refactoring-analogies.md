---
layout: post
title:  "The Two Trains and Other Refactoring Analogies"
date:   2016-09-12 21:18:08
---

Legacy code -- the mere mention of it can strike fear into the hearts of software
devs. It's brittle, hard to change, hard to work with. It may not have
tests. It's not fun to work with.

It's an easy thing to create legacy code. It happens in moments of weakness and
as a [matter of
entropy](http://firstround.com/review/forget-technical-debt-heres-how-to-build-technical-wealth/).
Someone asks for a feature that needs to get shipped out by 5 PM.  We start
building a feature and forget to build tests on a Monday.  How do we prevent
it?

We can address legacy code with a two-step process:

1. Add tests.
2. Refactor.

We'll document the behavior of the code by creating tests and then clean it up.
Refactoring means improving the design of the code *without*
changing its behavior.

In this post, I'll share 3 analogies I use for thinking about refactoring and legacy code.

Trash Pile
----------

If you're at a dump, you don't think twice about throwing a piece of trash onto
the top of a pile. There's a big pile of trash. Who will notice? The trash pile
won't fall down and nothing bad will happen.

In software, legacy applications can feel like the same thing. If there's
a messy codebase, who cares if you add something without tests? Or if you added
in just a few lines of code to a 300 line method? What's the harm?

Instead, I think it's best to clean up as you go. Otherwise, you'll be stuck
with a pile of trash forever.

It can make a big difference if you make small improvements. Adding tests,
cleaning things up, refactoring - these pay dividends
over time. It doesn't have to be perfect. Making things a little better will be
a huge improvement.

I worked with a legacy codebase that no one wanted to work with. As a team, we
didn't write tests or care about code quality because we had thought that it
"was going away soon". It didn't.

We realized we would have to live with the code so we changed our attitude
towards it.
We wrote tests.  We followed best practices. We improved our [code review
processes](https://www.kevinlondon.com/2015/05/05/code-review-best-practices.html).
In time, developers stopped avoiding it. We
had to live with the pile of trash, so we chose to own it and improve instead of
letting it rot.

If you leave the code better than you found it, you'll prevent other people
from treating it like a pile of trash. We can transform the trash from
an obligation into an asset.


Tube of Toothpaste
------------------

It's easy to get toothpaste from a new tube. In the beginning, it doesn't matter
what you do, you'll get toothpaste. As you near the end of it, it
gets tough. You have to roll the tube up if you'd want toothpaste from it.
Sure, you could try to brute force it but that takes longer.

New codebases are easy to work in because there's so much greenfield.
Everything is a new choice. As it grows, change becomes tougher. As such, we can
refactor to make it easy to make the change that we want.

I think Kent Beck said it best:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">for each
desired change, make the change easy (warning: this may be hard), then make the
easy change</p>&mdash; Kent Beck (@KentBeck) <a
href="https://twitter.com/KentBeck/status/250733358307500032">September 25,
2012</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

One time, I needed to add in some validation to a class. It already performed
validation checks so I could have copied one of the
other blocks. That would have added duplication and made my change hard
to test.

Instead, I chose to write tests and refactor.  I made the test pass and then
divided the validation into methods, each of which I could test.
I then made the easy change.

By refactoring before we do the work, we enjoy the
benefits of refactoring now as well as in the future.
Refactor the code you’re working on so that it’s easy to make your change and
then make the easy change.


Two Trains
----------

Have you ever seen a film where someone has to jump from one moving train to
another? It looks dangerous ([and
is!](https://en.wikipedia.org/wiki/Train_surfing#Risks)).  Maybe there's some
bumps in the tracks or a tunnel that would knock the protagonist off
of the train? That's how I view rewriting an
application, a.k.a. the nuclear option.

Joel Spolsky argues that you should *never* rewrite in
[Things You Should Never Do, Part
1](http://www.joelonsoftware.com/articles/fog0000000069.html).  Let's assume that
you're moving forward with the rewrite and you have great reasons for
that choice.

The trickiest part in a rewrite is cutting over from the old to the new.
How can you know when it's the right time?
The safest possible way to make the jump is to wait until the two
trains have the same velocity and jump.

So, if we were to break it down to a formula, the best way to do this is:

1. Reach parity: Ensure that the new code does the same as the old.
2. Switch: As soon as possible, swap over and start using the new service.
3. Improve: After you've switched, you can think about crossing off the
   wishlist items.

The switch gets harder if, along the
way, you add new features or fix old bugs that you know about.
It's best to exactly match the existing functionality. Once you've switched
over, you can think about adding in the wish-list items.

I'll share an example of a time when a rewrite didn't pan out for me. I wrote
my first serious Python application. After a while, I realized that I had made
many mistakes along the way. The whole application used only one class. I had no
tests. It wasn't easy to read. I thought, "I've learned how to do this
correctly. I'll rewrite it!"

For the rewrite, I wrote tests, made the code modular, and used best practices.
I fixed a few performance problems and added in a feature or two.
As I worked on the rewrite, users reported bugs in the old application and
requested new features. I implemented them in the old code and had to port over
the fixes to the new code, doubling the work.

I never finished the rewrite. I ran out of time and resources to
devote to both the new project and the old. I got too distracted by improving other
items along the way.

More recently, I automated some AWS infrastructure with
[Terraform](https://www.terraform.io/). Along the
way, I saw aspects of our infrastructure that I wanted to change.
Wouldn't it be cool to use Docker? Or Continuous Delivery?
I wrote those ideas down and kept going without implementing them.

When we made the switch from the old infrastructure to the
new, we found a few minor problems
that we didn't know about.
We would have encountered much worse had we
introduced new functionality at the same time! Doing the least work possible made
it much simpler to switch.

The sub-lesson I take away from the Two Trains is that it's better to make the
switch as small as possible. Jumping between two trains? Dangerous!
Jumping from a moving walkway to another moving walkway? Not that bad.
If you can find a way to scale back the scope of the rewrite, it will make it
much easier on you.

Applying the Two Trains analogy to a rewrite makes it simpler to think about.
You can still make the improvements that you want and it's far safer to do them
after you've made the jump.


Conclusion
----------

Legacy code offers an opportunity to improve and to build code that will pay us
dividends over time.
If we change the way we think about legacy code, we can slowly transform it from
an obligation to an asset.
 We
can build something that we're proud of and that doesn't get thrown away.
