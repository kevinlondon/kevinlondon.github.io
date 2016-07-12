I think about almost everything in terms of analogies. They help me think about and explain complex ideas.
I'd like to share a few of my favorites for ways to think about writing
maintainable code.


Two Trains
----------

You know how in movies, there's those
dramatic scenes where someone has to jump from one moving train to another one?
And it looks super dicey? Maybe there's some bumps in the tracks or an upcoming
tunnel that would knock the protagonist off of the train?

That's how I view doing application rewrites or even a big refactor.
When you're doing a rewrite, it can feel like a great idea.
The tricky part: How do you cut over from the old thing to the new? How will you
know when it's ready?

There has to be some point where there's a switch. The switch
gets harder if, along the way, you decide to implement new features.
It's best to exactly match the functionality of the old thing and then, once
you've switched over, think about adding in the new features or fixing existing
bugs.

If the two trains aren't moving at the same speed, you'll never be able to make the jump.

For example, I automated some AWS environments we had with
[Terraform](https://www.terraform.io/). Along the
way, I saw things I wanted to change about the way our
environments worked. Wouldn't it be cool to use Docker? Or Continuous
Deployment? I wrote those ideas down and kept going without implementing them.

When we switched environments from the old to the new, we found a few little
bugs. We would have encountered much more had we introduced new functionality at
the same time! Doing the minimum coding necessary made it much simpler to
switch.

There have been other times where I chose to implement something along the way.
I remember I once rewrote an archival application to have a cleaner architecture
but to also archive files in a different format. I got about 80% of the
way through the project when I needed to go back to the original application and
add features into it.
I missed my window of opportunity where I could refactor
because I chose to add in new functionality at the same time.
The reboot eventually got shelved and we continued to work on the original
application.

Another time I worked on an API. As we built it, we added in
features we wished we had. In that case, too, we never reached the point where
we could switch because we had so many features to replicate.
I've heard that the company has since rewritten the partially-completed API in Node.

Joel Spolsky wrote my favorite essay on Not Rewriting that I've come
across in [Things You Should Never Do, Part
1](http://www.joelonsoftware.com/articles/fog0000000069.html). Still, if you're
going to do a rewrite of some kind, keep the Two Trains in mind or it'll be hard
to make the jump.


Trash Pile
----------

This is kind of like the broken windows theory meets the Boyscouts. Basically,
if you're at a dump, you won't think twice about throwing a piece of trash onto
the top of a pile.  Who cares? It's already a dump, there's already a big pile
of trash. Who will notice?

In software, it can feel like the same thing. If there's a messy codebase, who
would know if you wrote something without tests? Or if you added in just
a few lines of code to a 300 line method? What's the harm?

Instead, I think it's best to clean up the pile of trash as you're there.

Another example. At a previous job, we had a big legacy codebase and a new shiny
API. Nobody wanted to work on the legacy codebase but it paid the bills.
Inevitably when we would have to add some new feature or fix a bug for
a customer, the person who fixed it would implement it in the laziest possible
way. When I asked about areas for improvement during their code reviews, they'd say "Who
cares? It's just the legacy codebase? It's going away soon anyway."

I should mention that this particular "legacy codebase" had been around for so
long already that in it was *another* "legacy" codebase inside of it. So there
was a "legacy legacy" that was also still in use.
We added features to the legacy codebase for the next two years that I stayed
with the company.
Over time, we adopted better practices and built tests for the new things.
We had to live with the pile of trash for a while, so we
might as well improve it where we can.

If you can leave it better than you found it, then you'll prevent other people
from treating it like a pile of trash too.

Tube of Toothpaste
------------------

I think this is one of my weirder analogies.

You know how when you get a tube of toothpaste, it's really easy to get the
toothpaste out for a while? In the beginning, it doesn't matter how you try to
push out the toothpaste, you'll definitely get toothpaste. As you near the end
of it, though, it's hard to get the toothpaste out. You have to roll
the toothpaste from the bottom.

Sometimes in software, it feels the same way. New codebases are really easy to
work in because there's so much greenfield. Everything is a new choice. As it
grows, gets older, gets more quirky, it becomes harder. Sometimes it's tempting
to take the shortcut and push the toothpaste from the top of the tube, or just
barely do enough to do what you need.

I think Kent Beck said it best:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">for each
desired change, make the change easy (warning: this may be hard), then make the
easy change</p>&mdash; Kent Beck (@KentBeck) <a
href="https://twitter.com/KentBeck/status/250733358307500032">September 25,
2012</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

So, with the toothpaste tube, we would roll it up so it's easy to get the
toothpaste out. It's the same thing with code.

Let's see... an example.

This one time I needed to add a conditional to a class that was doing some
validation. It was just one conditional, but it was in a function that already
had like 10 conditionals. I could have added in my little conditional, tested it
manually, and called it good. I tried writing a unit test for the method but
there was so much to account for that my unit test was something like 30-40
lines long.

I got it passing and then reconstructed the validation call into
a series of little methods, each easily testible. It made it easy to make the
change I wanted and easier to extend the next week when we had some other
validation that we needed to do there.

It's better to lightly refactor
the thing you're working in so that it's easy to make your change and then make
the easy change.


Princess and the Pea
--------------------

This is a bit more general. Are you familar with the Hans Christen Andersen
fable about the Princess and the Pea?

Short version: a prince is looking for a princess and having a hard time finding
one that suits what he wants. Eventually a girl comes by and has to sleep on
a stack of 20 mattresses, at the bottom of which is a single pea. She can't
sleep. When the prince finds out about it, he marries her. I don't remember why.

Anyway, the thing I like about this story is the princess's attitude towards the
pea. She's sensitive to pain and discomfort where others aren't. It's important
to stay sensitive to discomfort at work because uncomfortable things are usually
the things that are best to fix.

It's easy to become complacent. Maybe you have some deploy process that takes an
hour and is done by 3 people following manual steps. Maybe your recovery process
has not been tried or there's no official backup policy. Maybe it takes a week
to set up a developer's laptop because the instructions aren't written down for
what needs doing. Those things can feel really normal after a while, and that's
awful. We should fight back against that.

Dan Luu wrote an [excellent article](http://danluu.com/wat/), where he talks about how we go
from WTF WTF WTF WTF to "this is normal" in shockingly little time. Tony Faddell
(though a controversial figure), has [a TED
talk](https://www.ted.com/talks/tony_fadell_the_first_secret_of_design_is_noticing?language=en)
about being sensitive to
discomfort too and how it makes you a better designer.

I've personally had great success and luck by looking at things we're doing and
questioning them. Automating manual processes can be an incredible boon to
productivity and what the whole team is able to do.

At a previous job, I worked as a systems admininstrator for a team of creatives.
They would perform a task called "conform" that would align all the source of
the original film and prepare it for color. At the time, it took about 45
minutes to conform a single 20 minute reel of film, and most of that time was
spent just searching directories. They'd often use the same directories too.
People got so used to this that it was assumed that it simply couldn't be fixed!

I worked with our software vendor and got the time to search those directories
from 45 minutes down to about 30 seconds with some clever caching. If we hadn't
been sensitive to the pain, we wouldn't have had the opportunity to optimize
such an important and time consuming part of our workflow.

If something sucks, don't get used to it. Try to fix it if you can. If not,
complaining about it can be effective too.
