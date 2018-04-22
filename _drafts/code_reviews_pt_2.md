
This is a collection of thoughts and things I thought I'd written down in the
past and somehow hadn't. In some cases, I will repeat myself in the earlier code
review post. In others, it's new thinking. Still, given that it's been three
years, I think it's ok if I retread some of the same ground as long as I provide
you with some new information or ways to think about things.

I just joined a new team at Amazon and realized how many opinions I have on code
reviews. I have a lot of opinions on code reviews.

I've been doing code reviews for four years or so now and I love them. I think
I've found them to be the single most valuable tool for getting better at
writing and thinking about code generally.

I've always found feedback useful,
and I view giving and receiving feedback as a kind of gift generally. I remember
inadvertently making someone depressed in high school when we peer-reviewed each
other's papers. I remember people racting to notes that I'd given them on
anything like a resume or whatever. People don't generally expect feedback on
things but it is important for growth.

# Dos and Don'ts

## Don't

### Focus on coding style

In the earlier post, I had a full section on style and I stand by that. In this
case, I'm talking specifically about language stylistic guidelines. For example,
how many spaces do we want between methods? How many spaces between arguments?
Where do our braces live?

These things do not belong in a code review. If you find yourself regularly
discussing coding style items, then I recommend that you codify the standards
you and your team expect to see into a tool and run that tool on every
submission of code. I find that this is a great way to reduce the noise of
a code review and reduce ambiguity. It's much better to have a tool tell me that
code isn't stylistically consistent than to hear that from a peer.

### Consider your word choices

Because code reviews are usually asynchronous and over text, it's hard to figure out how someone
intends a sentence. As such, it's important to go out of our way to ensure that
we're being sensitive to that and avoiding phrases that could be misconstrued
over text. Here's some words / ideas I think about when writing reviews:

#### No "just"

I picked this up from a book about Directing Actors that I read during film school.
Using "just" can trivialize something that's not trivial. If it was as easy as
"just" doing something, we're implicitly saying that the person on the other
side of it is stupid. I find it's better to assume the person on the other end
of the conversation made a best effort.

#### No "why"

"Why", in text form, often comes across as accusatory or demeaning. "Why don't
you do this instead of that?" "Why did you do this thing?" I try instead to
assume that they're coming from the best effort perspective mentioned above and
instead want to figure out what thought process lead them to make the choices
that they did.

Some examples include:

Did they consider the performance implications of what they're
doing? What alternatives did they consider? What led them to choosing
a particular solution?

Although some of these seek to find the same information,
they can come across as more pleasant and less likely to put someone in
a defensive mindset.

#### No shaming

This is something that can come up too and quickly poison the process of doing
a code review. Ideally code reviews feel good and useful for everyone involved,
from the reviewer to the reviewee. It's a great way to distribute best practices
through the team without necessarily requiring meetings. Introducing shame into
the process can make individuals want to avoid doing code reviews.

What do
I mean by shame? Something like "This code is bad." or "It feels like you phoned
it in here." or "Have you ever written Java code before?". In other words, we
want to avoid being critical of the individual as much as possible. As
I mentioned in the other post, make it about the code and not the person. Beyond
that, we also want to make sure we're keeping in mind that there is a human
being on the other side of the code review and we probably work with them on
a regular basis.

#### Try to avoid questions with a yes / no answer

This is one that I'm still working on. Questions with a yes / no answer can be
leading. Open ended questions allow the person on the other side to clarify
their point and you're more likely to learn something as a reviewer. Compare:

"Do you think we should refactor this?" to "What can we do to make the code more
maintainable?". Although these both seek the same goal, one of them implies that
the answer is "YES!" while the second puts the burden of figuring out what to do
on the reviewee. If they ask questions, I'm usually happy to provide more
context or suggestions. The first also presumes a conclusion while the second
doesn't necessarily.

#### Focus on the negatives

Something that's hard to remember during a code review is that it's really
a conversation. In some cases, code reviews have been treated as a "this is
what's wrong with your code". In many cases where I leave a comment, I'm
honestly asking how something works or openly wondering if there could be
a different way we could approach something.

If you remember that you're having an honest discussion with someone, I think
both parties will get more out of it.


## Do

### Offer context on your own code in the review

In the initial post, I mentioned that I like to go through and review my own
code prior to committing it. I still like to do that. In addition to that,
something I've found useful is to pre-comment my CR and offer context.

Context provides value at multiple levels. The best context you can offer is why
you're making the change, at a broad level, as well as generally what the code
review covers. For example, mentioning that the code review includes adding an
API endpoint, functional tests, and rearchitecting module X to do Y instead of Z.
These provide an entry point for people that are new to your code.

After all, if
you've just submitted something for review, it's likely that you've been living
in it for the last few days. Whoever is going to read your code is coming in
fresh and doesn't have all that context loaded into their head.

In addition, I find it helpful to review my own code as if I were a reviewer and
explicitly mention why I made a particular choice or what happened to lead to
a choice in the review. Sometimes I will mention alternatives that I'd
considered in making the change.

If I find myself wanting to explain what the
code does with a comment, that's a good sign that the code I've written is
misleading and could be rewritten in a clearer and easier to understand way.

### Use code comments judiciously

Although some code review comments are helpful to offer to others (and maybe
yourself if you need to do forensics in the future), comments in the code should
only be included if they're necessary. Instead of commenting code heavily, often
times I've found it's preferable to rewrite the code such that the comments are
not necessary.

### Baby mind

When I do code reviews, I like to use something I call "baby mind". Ideally,
I'll do a pass where I look at large scale issues such as architecture and the
way the code sits together. Does everything feel like it's in the right place?
Can I follow the flow without thinking too deeply? Once we've settled the
architectural construction, I like to go into "baby mind". In other words,
I like to not think about the code. If I have to think and use serious cognitive
thought to process something, it's going to be likely to have bugs. By making it
seems simple and easy to understand, we give ourselves a leg up against
complexity and have a great start to solving the problem. In a few months when
we come back to something, it should still be easy to read and understand.

### Do multiple passes

Ideally it's best to do multiple passes. The first pass should be thinking about
architectural issues. Does it make sense at a global level? Does the overall
design make sense? Once you're reviewing at a code level it can be challenging
to rethink things from first principles and instead focus on issues like "Should
this variable be declared `final`?".

If there's a large enough architectural issue, you're much better off addressing
it earlier. If it yields a rewrite of some kind, then you're more likely to need
to review the code twice anyway, so it can be a kind of time savings. That said,
the first pass should be to just get a feel of how the pieces fit together.
Hopefully your partner has provided context already so you don't need to think
too deeply about the architectural choices and can instead focus on what's being
done.

### Time-box your efforts

I like to spend no more than an hour on a single pass of a code review. This
makes it challenging to review larger pull requests and, in part, that's by
design. If there's regularly large pull requests to review, I'd say that there
might be a part of the development process that can be tuned to yield smaller
code reviews. Reviewing something large is challenging because it also means
that you're likely to notice the same things multiple times, whereas smaller
reviews should yield more actionable items.


### Security

One thing I did not mention in the initial post was to think about security. You
should be thinking about security while you're doing code reviews. I've done
a few posts on security since then but a good place to start learning more is in
the OWASP Top 10.


## Wrapping up

It's going to be hard to implement these tips all at once. My advice would be to
pick one and try it out for a bit and see if you like it, then move on to
another one.

I'm sure in a few years I'll have even more things to say
about code reviews. I hope you find these useful things to think about and
develop your own personal style for looking at code reviews. At the heart of it,
I think code reviews can offer a wonderful experience and a great way to get
better at our craft. Looking at our processes and trying to improve them is one
of the key traits of a professional and this is one way to start thinking about
it.
