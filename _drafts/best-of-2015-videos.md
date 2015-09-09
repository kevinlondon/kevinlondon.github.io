---
layout: post
title: Recommended Software Development Videos
---

In 2015, started watching videos in car. Big difference in quality over year.
These are some of the most influential videos I've seen in the last year.
I've watched about 100 conference videos in the last year.


## Software Architecture & Design

### [Growing a Language - Guy Steele](https://www.youtube.com/watch?v=_ahvzDzKdB0&list=FLlt4ZSW8NUcXLWiB3NMnK_w&index=11)

# TODO 

Guy Steele is a master. This talk is so well formed. Whether or not you use
Java, I think Guy makes some excellent points and the form of the talk
supports all of his ideas. I don't want to spoil any more than that.

### [Architecture, the Lost Years - Bob Martin](https://www.youtube.com/watch?v=WpkDN78P884&list=FLlt4ZSW8NUcXLWiB3NMnK_w&index=22)

# TODO

Another Uncle Bob talk. Architecture is the idea that we delay choosing until we must.
Does your software structure tell you anything about the software is constructed?
Thought provoking and my introduction to Uncle Bob.

### [Simplicity Matters - Rich Hickey](https://www.youtube.com/watch?v=rI8tNMsozo0&list=FLlt4ZSW8NUcXLWiB3NMnK_w&index=27)

# TODO

Rich Hickey seems like a treasure. The Closure community, and the software community as whole,
is lucky to have him tackling hard problems. 

### [How to Design a Good API and Why it Matters - Joshua Bloch](https://www.youtube.com/watch?v=heh4OeB9A-c&list=FLlt4ZSW8NUcXLWiB3NMnK_w&index=42)

Joshua's recommended take-aways:

1. When in doubt, leave it out. (You can always add, but never remove[1])
2. Don't make the client do anything the module could do. (Remove boilerplate).

Beyond that, I think one of the ideas I took away from the talk is that we should
design basically from a README perspective. 
What should the project do?  How would we want to use it to accomplish that goal?
Oh, and "example code should be exemplary".

[1] At least not without deprecation warnings and much gnashing of teeth.

### [All the Little Things - Sandi Metz](https://www.youtube.com/watch?v=8bZh5LMaSmE)

The talk describes the value of small objects and the Open / Closed principle. It
illustrates how to refactor an app without tests and how to apply Open / Closed.
I started thinking about how to use smaller objects and how to use more traditional
Object Oriented design principles after watching this.


## Working in Software

### [Inventing on Principle - Bret Victor](https://www.youtube.com/watch?v=PUv66718DII&list=FLlt4ZSW8NUcXLWiB3NMnK_w&index=18)

Bret discusses using principles to guide new inventions as opposed to focusing
on the product itself that you'd like to build. By focusing on product,
sometimes we accept that the way we are doing things will not change and that 
it is working great. Sometimes, by playing with that idea, we can find different
ways to accomplish a goal and perhaps come across other interesting products
in the process. For example, Bret demonstrates a game that can be created
while playing them and interacting with different values as you go. Cool.

### [Professional Productivity - Scott Hanselman](https://www.youtube.com/watch?v=FS1mnISoG7U&index=38&list=LLlt4ZSW8NUcXLWiB3NMnK_w)

Essentially, Scott offers some suggestions to accomplish more in less time and
with fewer distractions. My favorite line from the talk? "Email is where
information goes to die." I stopped writing long-form emails after I watched
this.

### [Demanding Professionalism in Software Development - Bob Martin](https://www.youtube.com/watch?v=p0O1VVqRSK0&list=FLlt4ZSW8NUcXLWiB3NMnK_w&index=12)

Uncle Bob can be a polarizing figure. In this talk, he lays out a general list
of practices he believes we should follow. It has a few ideas that I liked
in particular:

* QA should hardly ever find anything.
* Write tests that you trust.
* No one will ever thank you for saying "No." but sometimes it is the most important thing you can do.


## Testing

### [Fast Test, Slow Test - Gary Bernhardt](https://www.youtube.com/watch?v=RAxiiRPHS9k&index=88&list=LLlt4ZSW8NUcXLWiB3NMnK_w)

A number of my personal testing philosophies can be traced back to Gary
Bernhardt and to this talk in particular. It covers how test suites become
slow and fragile and how we can write tests that serve us by meeting the 
three primary goals of testing as he lays them out:

1. Prevent regressions
2. Prevent fear
3. Prevent bad design

This talk is a good introduction to high-level concepts in writing smaller, 
focused tests and taking test performance seriously.

### [The Magic Tricks of Testing - Sandi Metz](https://www.youtube.com/watch?v=URSWYvyc42M)

I've been going through a Sandi Metz phase lately. I think all of her talks
are excellent but I think I found this one to be the most applicable.
Some highlights from her talk:

* Don't test private methods
* Isolate the method under test
* Lots of small objects makes testing easier

I don't agree with all of her points and I think that's okay. For instance,
I will sometimes test internal methods if the public method has collaborators
that make it tricky to get the level of certainty I'd like. Although,
thinking about it, perhaps that's a smell.

## Python-specific

### [Stop Writing Classes - Jack Diederich](https://www.youtube.com/watch?v=o9pEzgHorH0)

Jack Diederich makes some good points in here. I agree, in general, with his
point that if we can write small functions instead of classes with internal
state, we should do that.  I think that it boils down to the choice of the
right tool for the right job.  It's often better to use functions than classes
and Jack provides a few examples of that.

### [Transforming your Code into Beautiful, Idiomatic Python - Raymond Hettinger](https://www.youtube.com/watch?v=OSGv2VnC0go&list=FLlt4ZSW8NUcXLWiB3NMnK_w&index=38)

It's easy when coming from another language to Python to stick with conventions
you learned from the other language. Raymond talks about some common pitfalls
that people new to Python encounter, such as looping over a list with indexes.
He also covers some more advanced topics.
For example, the `for` loop has an `else` condition you can fire if it exits
normally, which I did not know.

### [Beyond PEP 8 - Raymond Hettinger](https://www.youtube.com/watch?v=wf-BqAjZb8M&list=FLlt4ZSW8NUcXLWiB3NMnK_w&index=10)

An excellent discussion about how getting stuck in the details of syntax can
distract us from more important topics, especially in code reviews. Definitely
something I started thinking about after this talk. In addition, finally the
talk that switched me from double quoting variables to single quote.
