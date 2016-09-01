Legacy code. The mere mention of it can strike fear into the hearts of software
devs. It's brittle, hard to change, hard to work with. Often it doesn't have
tests. How do we work with legacy code? How do we prevent ourselves from
creating it in a moment of weakness?

I believe we can stem the tide of legacy code with two steps:

1. Add tests.
2. Refactor

Refactoring, in this case, means improving the design of the code *without*
changing its behavior. In this post, I'll share 3 analogies I came up with for
working with regarding refactoring and legacy code. I use these with
non-technical colleagues, teammates, and sometimes on myself to shape how
I think about legacy code and testing.

Trash Pile
----------

If you're at a dump, you won't think twice about throwing a piece of trash onto
the top of a pile. It's a dump. There's a big pile of trash. Who would even notice?

In software, legacy applications can feel like the same thing. If there's
a messy codebase, who would care if you wrote something without tests? Or if you
added in just a few lines of code to a 300 line method? What's the harm?

Instead, I think it's best to clean up as you go.

Instead of copying and pasting code in a huge block, or naming things poorly, it
can make a big difference if you make small improvements. Adding tests, cleaning
things up, refactoring even a little bit - these will all pay dividends over
time. It doesn't have to be perfect, even a little better will be a huge
improvement.

I worked with a legacy codebase that no one wanted to work with. As a team, we
didn't write tests or care about code quality because we had been told that it
"was going away soon". It didn't.

When we realized we would have to live with
the code for a while, we made a conscious choice to change our attitude towards
the legacy codebase.
We wrote tests.
We followed best practices. We improved our [code review
processes](https://www.kevinlondon.com/2015/05/05/code-review-best-practices.html). Eventually,
it got to a pretty good place and developers stopped avoiding it. We had to live
with the pile of trash, so we chose to own it and improve instead of letting it
rot.

If you can leave the code better than you found it, then you'll prevent other people
from treating it like a pile of trash too. Over time, it'll start to make more
sense and feel good to work with it.

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


Two Trains
----------

Have you ever seen a film where someone has to jump from one moving
train to another? It looks really dangerous ([and
is!](https://en.wikipedia.org/wiki/Train_surfing#Risks)).
Maybe there's some bumps in the tracks or an upcoming
tunnel that would knock the protagonist off of the train?
The safest possible way to make the jump is for us to wait until the two trains have
the same velocity and jump.
That's how I view rewriting an application, a.k.a. the nuclear option.

Joel Spolsky argues that you should *never* rewrite an application in his
post
[Things You Should Never Do, Part
1](http://www.joelonsoftware.com/articles/fog0000000069.html).
Let's say that you're moving forward with the rewrite anyway and you have great
reasons for that choice.

The trickiest part in a rewrite is cutting over from the old to the new.
How can you know when it's the right time?

So, if we were to break it down to a formula, I would say that the best way to
do this is:

1. Reach parity: Ensure that the new code does the same as the old.
2. Switch: As soon as possible, swap over and start using the new service.
3. Improve: After you've switched, you can think about crossing off the
   wishlist items.

The switch gets harder if, along the
way, you decide to implement new features or fix old bugs that you know about.
It's best to exactly match the existing functionality and, once you've switched
over, think about adding in the wishlist items.

I'll share an example of a time when a rewrite didn't pan out for me. I wrote
my first serious Python application and, after a while, I realized that I had made
many mistakes along the way. The whole application used only one class. I had no
tests. It wasn't easy to read. I thought, "I've learned how to do this
correctly. I'll rewrite it!"

For the rewrite, I wrote tests, made the code modular, and used best practices.
I fixed a few performance problems and added in a feature or two.
While I worked on the rewrite, users reported bugs in the old application and
requested new features. I implemented them in the old code and had to port over
the fixes to the new code, effectively doubling the work.

I never finished the rewrite. I ran out of time and resources to
devote to both the new project and the old. I got caught up trying to improve
things along the way instead of prioritizing fixing the issues as they were.

Conversely, I automated some AWS infrastructure with
[Terraform](https://www.terraform.io/). Along the
way, I saw aspects of our infrastructure that I wanted to change.
Wouldn't it be cool to use Docker? Or Continuous Delivery?
I wrote those ideas down and kept going without implementing them.

When we made the switch from the manually provisioned infrastructure to the
automatically provisioned, we found a few problems
that we didn't know about. For example, perhaps we missed some small configuration detail or setting.
We would have encountered much worse had we
introduced new functionality at the same time! Doing the minimum necessary made
it much simpler to switch.

The sublesson I take away from the Two Trains is that it's better to make the
switch as small as possible. Jumping between two trains? incredibly dangerous!
Jumping from a moving walkway to another moving walkway? Not that bad.
If you can find a way to scale back the scope of the rewrite, such as rewriting
one API endpoint at a time, or diverting only a portion of traffic to the new
service, it will make it much easier on you.

Applying the Two Trains analogy to a rewrite makes it simpler to think about.
You can still make the improvements that you want and it's far safer to do them
after you've made the jump.
