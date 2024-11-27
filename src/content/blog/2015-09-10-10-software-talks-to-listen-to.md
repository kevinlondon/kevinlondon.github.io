---
title: 10 Software Talks to Listen to on Your Way to Work
pubDatetime: 2015-09-10T22:17:10
description: "A list of software talks that I've found useful"
tags:
  - software
  - talks
---

I worked as a solo developer for a few years so, when I joined a team, I felt
like I [did not know anything](http://kevinlondon.com/2015/05/27/impostor-syndrome-and-me.html).
I wanted to learn as much as I could. One day, while constructing an Ikea bed
frame in my living room, I listened to a conference talk about Django and had
a revelation: conference talks did not require you to watch them.

Speakers typically craft their presentations so that people can understand them
in one sititng and their slides support rather than convey their message.
In addition, talks have to fit in a strict time slot so they do not have 
much slack or down time. In other words, they're like podcasts with less fluff.

I started listening to conference talks in August of last year
and I've noticed a difference in the way I think about software since then. 
I prefer to listen to talks on the way to work to prime my brain so that
when I get there I'm usually excited about software and ready to begin.
Each day, I learn a little bit more about software development.

All that said, here is a list of ten of my favorite videos from the last year.

[1] I do not recommend *watching* videos in the car.

## Software Architecture & Design

#### [Growing a Language - Guy Steele](https://www.youtube.com/watch?v=_ahvzDzKdB0&list=PLP1xYYjBXksOm402NpkV1Ah5TRUKiQThn&index=1)

Whether or not you use Java, I think Guy makes some excellent points about
language design and the form of the talk supports his ideas. I don't want
to spoil any more than that.

#### [Simplicity Matters - Rich Hickey](https://www.youtube.com/watch?v=rI8tNMsozo0&index=2&list=PLP1xYYjBXksOm402NpkV1Ah5TRUKiQThn)

Simplicity and ease often get mixed up, even though they mean different things.
Sometimes we will choose an easy route at the cost of added complexity down the
line. For example, selecting a package to solve a problem may help us in the
short term but if we need to do something off the rails, it can be hard to pivot
and still work within the confines of the package.

I referenced this talk today, actually, in a discussion about using a third
party package to deploy our Ember applications. What we wanted to do no longer
matched up with what the package wanted to do, so we had to fight it. In the
end, we removed the package and chose to build the solution ourselves 
for the sake of simplicity.

#### [How to Design a Good API and Why it Matters - Joshua Bloch](https://www.youtube.com/watch?v=heh4OeB9A-c&list=PLP1xYYjBXksOm402NpkV1Ah5TRUKiQThn&index=3)

Joshua's recommended take-aways:

1. When in doubt, leave it out. (You can always add, but never remove[1])
2. Don't make the client do anything the module could do. (Remove boilerplate).

Beyond that, I think one of the ideas I took away from the talk is that we
should think about designing an API from a README perspective.  What should the
project do?  How would we want to use it as a third party user to accomplish
that goal? Oh, and Joshua's idea of "example code should be exemplary" has stuck
with me as well.

[1] At least not without deprecation warnings and much gnashing of teeth.

## Working in Software

#### [Inventing on Principle - Bret Victor](https://www.youtube.com/watch?v=PUv66718DII&list=PLP1xYYjBXksOm402NpkV1Ah5TRUKiQThn&index=4)

Bret discusses using principles to guide new inventions as opposed to focusing
on the product itself that you'd like to build. By focusing on product,
sometimes we accept that the way we build software does not need to change.  By
considering different approaches to building projects, we can find different
ways to accomplish a goal and perhaps come across other interesting products in
the process. For example, Bret created an editor that allows him to change
values in real-time and demonstrates how it could create different game
mechanics by playing with those values.

#### [Professional Productivity - Scott Hanselman](https://www.youtube.com/watch?v=FS1mnISoG7U&list=PLP1xYYjBXksOm402NpkV1Ah5TRUKiQThn&index=5)

Scott offers suggestions to accomplish more in less time and
with fewer distractions. My favorite line from the talk: "Email is where
information goes to die." 
Actually, I wrote this post because one of my friends emailed me asking for 
some talk recommendations and the email started to get too long.


## Testing

#### [Fast Test, Slow Test - Gary Bernhardt](https://www.youtube.com/watch?v=RAxiiRPHS9k&list=PLP1xYYjBXksOm402NpkV1Ah5TRUKiQThn&index=6)

Gary Bernhardt lays out a number of testing philosophies in this talk.
It covers how test suites become slow and fragile and how we can write tests
that serve us by meeting the three primary goals of testing as he lays them out:

1. Prevent regressions
2. Prevent fear
3. Prevent bad design

This talk is a good introduction to high-level concepts in writing smaller, 
focused tests and taking test performance seriously.

#### [The Magic Tricks of Testing - Sandi Metz](https://www.youtube.com/watch?v=URSWYvyc42M&index=7&list=PLP1xYYjBXksOm402NpkV1Ah5TRUKiQThn)

I think all of Sandi Metz's talks are excellent but I think I found this one to
be the most applicable. Some highlights from her talk:

* Don't test private methods
* Isolate the method under test
* Lots of small objects makes testing easier

I don't agree with all of her points and I think that's okay. For instance,
I will sometimes test internal methods if the public method has collaborators
that make it tricky to get the level of certainty I'd like. 

## Python-specific

#### [Transforming your Code into Beautiful, Idiomatic Python - Raymond Hettinger](https://www.youtube.com/watch?v=OSGv2VnC0go&index=8&list=PLP1xYYjBXksOm402NpkV1Ah5TRUKiQThn)

Raymond talks about some common pitfalls that people new to Python encounter,
such as looping over a list with indexes.  He also covers some more advanced
topics.  For example, the `for` loop has an `else` condition you can fire if it
exits normally, which I did not know.

#### [Stop Writing Classes - Jack Diederich](https://www.youtube.com/watch?v=o9pEzgHorH0&index=9&list=PLP1xYYjBXksOm402NpkV1Ah5TRUKiQThn)

Jack Diederich makes some good points about favoring functions over classes,
particularly in simple use cases. In addition, sometimes we will use classes
because we think we'll need them later, which is a form of premature
optimization. I think that it boils down to the choice of the right tool for the
right job.

#### [Beyond PEP 8 - Raymond Hettinger](https://www.youtube.com/watch?v=wf-BqAjZb8M&index=10&list=PLP1xYYjBXksOm402NpkV1Ah5TRUKiQThn)

An excellent discussion about how getting stuck in the details of syntax can
distract us from more important topics, especially in code reviews. 
This talk also convinced me to switch from using double quotes to single quotes.


That's a few of my favorite talks from the past year. I hope you find them
useful too. Do you have any recommendations that I may have missed? If so,
please let me know on Twitter or via email as I'm always looking for new talks. 
