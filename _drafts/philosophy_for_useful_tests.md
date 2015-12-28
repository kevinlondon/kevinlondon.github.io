---
layout: post
title:  "How to Write Useful Tests"
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

I'd like to be careful here not to get embroiled in a TDD debate. 
I don't care if you do TDD first or not. I (generally) will, but I can
understand if people want to do it a little later. I think that before you wrap
up on a feature, you should write the tests for it. I think some of the pitfalls
with writing tests after the fact means that you solidify boundaries and make 
your code more fragile in some ways. 

When to write tests?

### Treat your tests as first-class code

Make sure they're clear and straight-forward. Link to code review doc.

### If it's hard to write the test, treat it as a code smell

What's a code smell?

It should feel easy
to test the thing you want to test. If it's a challenge to test a method,
it's a good sign that the method can be divided up in a way that it's easier
to test or perhaps that there's another small object in there looking to escape.

### Use test names to describe what you're testing

If you're testing a bit of cart checkout functionality, you could name it 
something like `test_cart()`. I would suggest instead naming the test to 
reflect what you're expecting the test to validate. For example, perhaps
we want to `test_checkout_cart_cannot_be_negative`. It's pretty easy to
imagine what would go into the second test, but hard to figure out what 
might happen in the first.

Test names are important.

### Use one assertion per test

If we're naming our tests after what we're testing, it can get muddy with
more than one assertion. Sometimes it makes sense to jam more than one in there,
particularly if you're doing something slow or GUI based. Generally one
per test will help you keep them to a manageable size.

### Make your test suite fast

TODO

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
