---
title: 6 lessons learned from teaching my brother about programming
pubDatetime: 2014-06-10T21:45:56-07:00
description: "Key insights gained from teaching programming to my younger brother over Skype"
tags:
  - teaching
  - programming
---
## Background
For the last year and a half, I've been teaching my  brother, Leo, how to
program. He's 18 and a sharp guy, very quick to pick up new concepts and eager
to learn. I've also viewed it as a way to get closer to him because I live on
the opposite end of the US. We've spent an hour on either Saturday or Sunday
morning talking on Skype for most weekends in the last year.

I think it's been an amazing experience for both of us and I would recommend
it. There's a few lessons I've taken away from my time teaching and working
with him. I hope you'll find these useful as well.


##Lessons

###1. Keep it simple
Lately, we've been working together on a turn-based RPG game and engine in Java
called [Heroes of the Forest](https://github.com/Boredgamer/HeroesOfTheForest).
I worried that the project would be too complicated and that we would spend
most of our time building the engine, which is
a [classic](http://scientificninja.com/blog/write-games-not-engines)
[blunder](http://www.altdev.co/2011/12/17/why-on-earth-would-we-write-our-own-game-engine/). 

I decided that it would be a good idea to invest the time to learn
[libgdx](http://libgdx.badlogicgames.com/), which is a cross-platform Java game
engine, rather than building most of the components from scratch outself. I had
hoped that it would pay off in the long run by allowing us to harvest the
benefits of other's knowledge. 

So, decision made, I installed the framework, [finished the
tutorials](https://github.com/kevinlondon/java-libgdx-drop-example), and
started rewriting the basics of the game engine. It took a little time but
I felt it was worth it.

Nope.

The real problem is that libgdx can be complicated and intimidating. It has its
own way of doing things and, though it can take care of problems for you in
advance, it has a learning curve. It was too much for us to tackle both
problems at the same time. 

It took us a weekend session for us to merge the codebases because of merge
conflicts, which are not fun to work through or explain, and another weekend
trying to get it running on his machine. In the time between the weekends,
nothing happened. I didn't work on it because I had just started my Master's at
[Georgia Tech](http://www.omscs.gatech.edu/) and he felt understandably
overwhelmed.

The next weekend I said, forget it. Let's just go back to the code we had
before and we'll deal with the problems as they come. His attitude immediately
changed for the better and he started to lead it again. He's made numerous
commits over the last week and has made some great progress. It's a big game
but we'll tackle the problems as they arise, not before. At least, that's the
lesson I extracted from it.

###2. Let them own it
Related to the above point, it's important for the other person to feel as
though it's their project. I think it's a good motivation to work on it in free
time aside from the times that we're directly working together.

###3. Challenge yourself too
Teaching others is a great way to learn what you do and don't know about
something. It's also a good way to learn new concepts or get better at the
process of teaching itself. Keep an eye on what you're learning in the process
and make sure to keep it fresh if something's not working.

###4. Consistency is key
Having a dedicated time each week to meet and discuss programming has been
really beneficial. Lately it's been tough to find the time to meet up but
meeting whenever the mood strikes has been less successful. Generally we have
the highest success when we can make time in the mornings.

###5. Make it fun
Programming can be overwhelming and frustrating, even years down the road. At
the beginning, it can be especially so. I think it's critical to keep projects
light, fun, and as relevant as possible. I know from my own experience that I'm
more willing to put in effort if I know that I'll enjoy the result.

###6. Be patient & supportive
It can be easy to forget how uncomfortable it is when you're first learning how
to do something new.  It is hard  when you're first learning. After years of
practice it feels totally normal and you stop thinking about all the discrete
steps that go into each action. At first, however, everything feels weird and
uncomfortable. It's good to be sensitive to that.

## Conclusion
Overall, I'm incredibly happy with how it has gone so far. It's such a joy to
watch him progress through the same stages of highs and lows as I went through
when I started and still go through today.
