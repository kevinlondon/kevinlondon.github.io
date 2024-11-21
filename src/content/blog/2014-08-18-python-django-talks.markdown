---
layout: post
title: Python / Django Talks
date: 2014-08-18 19:51:38.000000000 -07:00
pubDatetime: 2014-08-18T19:51:38-07:00
---
Recently I've been listening to Django and Python talks on the way in to work. It's about 100x better than listening to music or avoiding morning DJs.

Here's some notes on talks I've heard recently:

[How Disqus is using Django as the basis of our Service Oriented Architecture](https://ep2014.europython.eu/en/schedule/sessions/60/): A talk by [Adam](@NorthIsUp) about the way [Disqus](https://disqus.com) built their architecture. It's amazing that their original code base is 180k lines of Django. Jeez. Interesting ideas on splitting up architecture into small, discrete Django projects where only one of the has access to the database. I'm interested to hear more on their experience of using Django Rest Framework. Either way, thinking about Django apps as components in SOA is something I'll need to keep in mind as we scale at Wiredrive.

[Everybody Loves Migrations](https://www.youtube.com/watch?v=JXGW56CGsCM): [Andrew Godwin](https://twitter.com/andrewgodwin) gave this talk on how South differs from migrations in Django 1.7. It's good to know that South 1.0 will be fully compatible with Django 1.7's migrations and that they're moving in a new direction for Django 1.7's migrations. It's such an important part of the toolchain that I'm glad to see it moving into the canonical library. Otherwise, it sounds like lessons can be learned from watching how others use your code and adjusting the APIs to more easily match the use cases that people actually have.


[Character encoding and Unicode in Python](http://pyvideo.org/video/2625/character-encoding-and-unicode-in-python): A joint talk by Ester Nam and Travis Ficher. One concept I took from this was the idea of a Unicode Sandwich. You use `.decode("utf-8")` on strings at the start, then, when printing or otherwise outputting them, `.encode("utf-8")` to flip them back to something useful. This has definitely come in handy in the last week.


[The Clean Architecture in Django](http://www.pyvideo.org/video/2840/the-clean-architecture-in-python): A talk by [Brandon Rhodes](https://twitter.com/brandon_rhodes) on how to architect applications so that they're easier to maintain and test. The idea is to centralize I/O at the top level as opposed to burying it / obfuscating it deep in your code. In addition, it's best to view functions as a way to get data back as opposed to a way to "do things" for you. 

I'd recommend any of these talks. I particularly enjoyed the last one but they're all useful.
