---
layout: post
title:  "How to Write Useful Unit Tests"
date:   2015-12-28 18:54:09
---

Testing plays an important part in the software development lifecycle but
it can be intimidating or feel like a waste of time at first. How do we get
from a place where there are no or ineffective tests to a place where they feel
valuable and useful? 

In this article, we'll explore some philsophies to keep in mind while writing tests
that should help get you into a place where you value your tests rather than
hate them.

Why Write Tests?
----------------

Tests:

* Reduce bugs

You probably won't catch all classes of bugs but you may catch a few other 
ones. If your language isn't statically typed, writing tests can catch 
typos or other silly mistakes that are easy to miss when you're writing code.

* Remove fear

If you change that line of code, will it break something else? Without tests, it
feels impossible to refactor. If you choose to refactor, you know that you'll
have some manual testing ahead of you to make sure it works.

* Improve design

If something is tough to test, we can correct it so that it's easy to test
and, in so doing, create smaller, more loosely coupled code.

* Speeds up development

It takes a long time to manually test something. You have to consider 
possible edge cases and repeat them any time something changes. Over time,
that can add up to a considerable amount of time for any new feature and it
requires you to track what has been done either in a test plan or something
else.


A Philosophy for Useful Tests
-----------------------------


### Write tests as you go

I personally do not care if you practice Test-Driven Development or not.
I generally do and I understand why people would want to defer testing.
Sometimes you don't know what you're going to build so you'd throw out
many of your tests. Other times, you don't want tests to get in the way. 
I get it.

Before wrapping up a new feature or bit of functionality, while you're still
thinking about the thing you're building or just completed, you should write
tests. Writing tests any later than that becomes very painful because it 
feels like a chore rather than something that helps you.

If you choose to write tests after your code, be careful. One of the cons of 
taking that path is that I find I'm less likely to change the code under test 
if something already works. Worse, if I'm going to lengths to avoid changing
the code, then I'm probably building in boundaries that will get in my way
later when I want to refactor the code. 

Tests should help us, not get in the way. Writing tests after the fact
is a good way to have them get in the way.


### Treat your tests as first-class code

Test code sometimes get treated as less important than "real code" that powers
your system so the tests sometimes get left to rot. It's not easy to clean up
tests, to be sure, but I think it's a worthwhile endeavor. 

I recommend the same rules of thumb for writing tests as writing code. For
example, that includes some of the following:

* Avoiding duplication of code
* Following style guidelines for your language
* Prioritizing readability
* Considering ways they could be improved during code reviews


### If it's hard to write the test, treat it as a code smell

When you first start writing tests, it might be uncomfortable. It's unfamiliar
to figure out what to test, if what you're writing will be useful, if you're
doing it right, etc etc. After you get over the initial bump, I think you'll
find that it gets easier to write tests than to skip tests. 

If you find that it's very difficult to write tests because of the way the code
is architected, it's a different matter.

A code smell is a symptom that could indicate a deeper problem in the code.
Typically when I start writing tests and finding that it's hard to create them,
I've done something wrong in the code.

Most often, I have a method that does too much or interacts with too many
things. If I need to set up the world in order to test something, that's
probably bad. There may also be a small object in there looking to escape.

### Use test names to describe what you're testing

If you're testing a bit of cart checkout functionality, you could name it
something like `test_cart()` and I've seen many tests like that. I would suggest
instead naming the test to reflect what you're expecting the test to validate.
For example, perhaps we want to `test_cart_value_cannot_be_negative`. It's
pretty easy to imagine what would go into the second test, but hard to figure
out what might happen in the first.

The test names will also help you figure out when you're done writing the test.
With `test_cart()` it's easy to add in more bits of functionality. In
the second case, there's a clear ending goal.

### Use one assertion per test

If we're naming our tests after what we're testing, it can get muddy with more
than one assertion, so aim for a single assertion per test. Sometimes it makes
sense to jam more than one in there, particularly if you're doing something slow
or GUI based. Generally one per test will help you keep them to a manageable
size.

### Make your test suite fast

It's important to keep tests small and fast. The faster the unit test suite,
the more likely people will run them and keep them passing. As a unit test suite
grows and becomes less pleasant to work with, there's less temptation to run
them and a greater likelihood of failing something like a CI server when code
is finally pushed to them. 

If you can find ways to keep your test suite fast, do them.

In Python, we have a few different ways of doing that. Both of the main
third party test runners (nosetest and pytest) have ways of detecting the 
tests with the slowest runtime. Sometimes you'll find tests with an order
or more magnitude slower runtime than the others. They're a great candidate
for reducing the runtime of the overall test suite. 

When I started at a previous job, I ran a test suite for a project I had been
assigned to. To my surprise, the unit test suite took 3.5 minutes to run for
150 tests. I would expect the same tests to run much more quickly and, at 3.5
minutes per run, I would not run them terribly often at all. That's a long time.

I dug into it and found that the tests were loading and unloading json fixture
files full of test data for each and every test. In some cases, the json
fixtures were 4k lines long. After I centralized the loading and unloading of
the fixtures, the test suite dropped down to 15 seconds. That still felt long
but it allowed us to get much more immediate results and feedback on our code.

Over time, the number of tests in that project grew to over 500 but the runtime
still stayed around 25 seconds or so. It would've been 10 minutes or more 
had we continued with the test suite as it was.

### Keep your tests small

Gary Bernhardt tweet about 8 lines.

### Minimize the number of mocks / test doubles

Talk about what mocks / test doubles do, why you want to minimize them.


Potential Pitfalls
------------------

### Big helper methods

### Unclear what's being tested

### Randomly failing tests

Conclusion
----------


Other Resources
---------------


https://www.destroyallsoftware.com/blog/2014/test-isolation-is-about-avoiding-mocks
https://www.destroyallsoftware.com/blog/2014/tdd-straw-men-and-rhetoric
