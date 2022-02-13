---
layout: post
title: Providing Feedback to Engineers
date: 2022-02-12 21:53:01.000000000 -07:00
---

I had a one-on-one discussion some time ago with a colleague who joined
a new company and well-established team. During design and code reviews, they
felt uneasy offering feedback to the experienced engineers and second-guessed
themselves. What feedback could they offer to a team that knows
what they're doing? Haven't the engineers already considered any
points they might bring up?

I go through this too. I've joined new teams and had a hard time
figuring out how to engage with my teammates and what I could offer.
In this post, we'll explore what's behind the discomfort and ways to overcome
 it.


## Understanding

Let's first attempt to look behind this feeling and see what might be at root.
What leads to these feelings of discomfort?

### New Environments

When you're new on a team, or when something isn't established, it's hard to
know what the rules are. How do people handle themselves in this environment?
Should I adhere to that or do my own thing? Do I wait to say something's wrong
or do I try to understand it first?

Dan Luu wrote a post on
[the Normalization of Device](https://danluu.com/wat/, where he talks about the
process of strange things becoming normal over time and how that
happens. From his post:

> People don't automatically know what should be normal, and when new people are
onboarded, they can just as easily learn deviant processes that have become
normalized as reasonable processes.

> Julia Evans described to me how this happens:

> new person joins
new person: WTF WTF WTF WTF WTF
old hands: yeah we know we're concerned about it
new person: WTF WTF wTF wtf wtf w...
new person gets used to it
new person #2 joins
new person #2: WTF WTF WTF WTF
new person: yeah we know. we're concerned about it.

So as a new person, when is it right to act on these WTF impulses? It's hard to know!

### impostor Syndrome

When I start something new such as switching companies, teams, or even
projects, I feel dread. Will my colleagues see that I'm figuring it out as
I go and I don't have the answers? Will this be the time I'm found out as
a fraud? Will they judge me for not measuring up to their expectations or skill?

These feelings may come from "impostor syndrome", which [Psychology Today
defines](https://www.psychologytoday.com/us/basics/imposter-syndrome):

> People who struggle with impostor syndrome believe that they are undeserving of
their achievements and the high esteem in which they are, in fact, generally
held. They feel that they aren’t as competent or intelligent as others might
think—and that soon enough, people will discover the truth about them.

One step towards dealing with impostor syndrome is noticing the internal
voice and doubts start to appear. I've [written about impostor
syndrome](https://www.kevinlondon.com/2015/05/27/impostor-syndrome-and-me) and
sometimes refer to it when I'm feeling underwater.

### Venn Diagram Knowledge

When I'm talking with someone, I'm sometimes blown away by how much it feels
like they know versus what I know. How did they learn so much about this topic?
Something that helps me to keep in mind is that knowledge is like a Venn
Diagram. Here's an illustration:

![Knowledge Venn Diagram](/assets/knowledge_venn_diagram.png)

On the left, we have an area of what I know, which feels worthless, and on the right we
have what you know, which requires genius to understand. Sometimes what feels
like genius to me is actually someone that has a Venn Diagram with different
coverage than I.

So the discomfort from offering feedback could come from looking at someone
else's knowledge circle and considering what to say. How could I offer feedback?
That's where the genius stuff lives! Or at least, that's how it feels.

## Overcoming

One strategy for overcoming these uncomfortable feelings is to pay attention to
them. Sometimes noticing when I'm starting negative self-talk or feeling anxious
can help me realize that it's one of the causes above. Realizing that I'm in
a loop or falling into a pattern can help knock me out of it.

Let's explore a few other suggestions.

### Ask Open-Ended Questions
One technique I've found helpful for offering feedback is exploring rather than recommending.
Let's consider I'm reviewing a design document and notice there's no client-side
cache and I'm concerned about request latency. Here's a few ways I could comment:

* **Recommending**: I'd use a distributed cache like Redis here to speed up requests.
* **Exploring**: What latency requirements do we have? What options can we use
  if we're not meeting our service expectations?

In the recommending example, I'm making a few assumptions:
1. The service or implementation isn't going to meet its latency requirements
2. Using a distributed cache will improve it
3. This specific technology is the right one to pick
4. My way is the right way

But maybe you looked into this! Maybe
the service isn't latency sensitive and it's ok if it takes a little longer to
resolve a request. When I'm exploring, I hoping to learn.

I've written about [code
reviews](https://www.kevinlondon.com/2015/05/05/code-review-best-practices) and
[offering
feedback](https://www.kevinlondon.com/2018/06/05/more-code-review-best-practices)
before if you'd like to read more.

### Be Kind to Future-You

Imagine that you're in an [on-call
rotation](https://www.pagerduty.com/resources/learn/call-rotations-schedules)
and you're paged awake at 3 AM. You turn off your phone and open your computer
to look at the code or service. How much mental processing will we capable of
under those conditions? How will we figure out what went wrong?

Another lens: In 6 months, will what's under review still make sense? I've lost
count of times I've looked at code, wondered who wrote it because it caused
a bug or I had a hard time understanding it, and it turned out to be me.

This is all to say that offering feedback now can help make what's still under
construction easier to reason and think about, which makes it easier to fix
or maintain even under duress.

I love receiving comments and questions on code reviews or design documents.
I treat it as signal that I could better express myself
and make it easier to understand.

### Feedback as Growth

Much of my growth and career development has come from offering
and receiving feedback from others. I can't overstate how much it's helped me
grow as an engineer and continues to do so. I still learn from colleague
comments on CR and I'm grateful that they care enough to help me build better
software and systems for our customers.

I want to receive hear from newer
engineers if there's something we could improve or is unclear! In [Mindfulness
in Plain
English](https://www.amazon.com/Mindfulness-English-Bhante-Henepola-Gunaratana/dp/0861719069/ref=cm_cr_arp_d_product_top?ie=UTF8),
there's a section that comes to mind:

> We all have blind spots. The other person is our
mirror for us to see our faults with wisdom. We should consider the person who
shows our shortcomings as one who excavates a hidden treasure in us that we were
unaware of. It is by knowing the existence of our deficiencies that we can
improve ourselves. . . . Before we try to surmount
our defects, we should know what they are.

> . . . If we are blind to our own flaws, we need someone to point
them out to us. When they point out our faults, we should be grateful to them
like the Venerable Sariputta, who said: "Even if a seven-year-old novice monk
points out my mistakes, I will accept them with utmost respect for him."

Everyone has areas they can work on to improve, even those with less experience.
Even though it feels uncomfortable to offer feedback to others,
it offers an invaluable opportunity to grow.

With that, I hope you feel a little better about offering feedback to other
engineers. Please let me know if you have any other suggestions that work for you.
