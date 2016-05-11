---
layout: post
title:  "How to Write Useful Unit Tests"
date:   2016-05-06 18:54:09
---

I hated writing tests. It felt like a waste of time. I had no idea what
to test or, if I wrote tests, they took forever to run.
I'd forget to run them and they'd break.
It wasn't good.

I find tests incredibly useful when I wrote software now. I like writing them.
They've prevented me from deploying bugs into production. They don't suck to
write (usually).

How do we get from hating tests or having tests that work against you to
creating a set of tests that supports your development?
I have a few suggestions that work for me and I'll share those here.

Why should I write tests?
-------------------------

* They reduce bugs & regressions

Tests help you catch bugs that you might have missed. I think this almost
a secondary benefit compared to the others. Like code reviews, tests can catch
some errors but not all of them. For example, your tests cannot tell you if you
have a flaw in the way you thought about a problem.

If your language isn't statically typed, writing tests can catch
typos or other silly mistakes that are easy to miss when you're writing code.

* Remove fear

If you change that line of code, will it break something else? Without tests,
it's challenging to refactor or upgrade dependencies.

With tests, you can feel confident about changing the code because the tests
should fail if the changes break something.

* Improve design

When writing code, it can be tempting to write methods that do a series of
actions or have deeply nested logic loops.

It's painful to write tests for code like that, which is a good thing. If
something is tough to test, we can adjust the code so that it's easy to test
and, in doing so, write more loosely coupled code.

* Speeds up development

It takes a long time to manually test something. You have to consider
possible edge cases and repeat them any time something changes.
That can add up to a considerable amount of time for any new feature and it
requires you to track what has been done either in a test plan or something
else.

Although tests take time to write and consider, in the end I've found that
they wind up taking less time overall when I consider all the time I spent
manually testing.


A Philosophy for Useful Tests
-----------------------------

Now that we've discussed a few reasons why it might be helpful to write tests,
we can talk about some tips for improving the tests that you write.

### Write tests as you go

Before wrapping up a new feature or bit of functionality, while you're still
thinking about the thing you're building or just completed, you should write
tests. Writing tests any later than that becomes very painful because it
feels like a chore rather than something that helps you.

I like Test-Driven Development, so I use a form of it in my day-to-day development.
Basically, Test-Driven Development says that you should write a test that fails
before you write any production code, then write just the code necessary to make
that test pass. Once that's done, you can clean it up.

I do not care if you practice Test-Driven Development or not.
Sometimes you don't know what you're going to build so you'd throw out
many of your tests. Other times, you don't want tests to get in the way.

I like writing tests first because seeing a failing test provides peace of mind
when you fix the code. You know for sure that there was a problem and now there
no longer should be, as long as the test and code keep doing what they're doing.

When you write a test against already functional code, it's hard to know if what
you've done is actually testing something or not.
Writing a failing test gives you assurance.


### Treat your tests as first-class code

Test code sometimes get treated as less important than production code.
Sometimes the tests sit and rot as production code changes.
It's not easy to clean up tests, to be sure, but it's a worthwhile endeavor.

I recommend the same rules of thumb for writing tests as writing code. For
example, that includes some of the following:

* Avoiding duplication of code
* Following style guidelines for your language
* Prioritizing readability
* Considering ways they can be improved during code reviews

By emphasisizing readability and maintainability, you'll make it much easier on
yourself if it breaks and you need to fix it.

### If it's hard to write the test, that's a code smell.

When you first start writing tests, it might be uncomfortable. It's unfamiliar
to figure out what to test, if what you're writing will be useful, if you're
doing it right, etc etc. After you get over the initial bump, I think you'll
find that it feels easy to write tests.

If you find that it's challenging to write tests because of the way the code
is architected, it's a different matter.

A code smell is a symptom that could indicate a deeper problem in the code.
Typically when I start writing tests and finding that it's hard to create them,
I've done something wrong in the code.

Most often, I have a method that does too much or interacts with too many
things. If I need to set up the world in order to test something, that's
probably bad. There may also be a small object in there looking to escape.

By making your code easy to test, you're also probably improving the design of
it.

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
size and keep it clear what's under test.

Multiple assertions make it hard to figure out what we should get from our test.
They also may lead to a problem where you fix one failing assertion only to find
that the next one fails when you re-run the test.
I like to keep my tests as short as possible. It makes it clear what's happening and what's under test.


Potential Pitfalls
------------------

### Mocks / test doubles

Mock objects help simulate the interaction that your test will have
with other things. I use mocks to replace dependencies on external services in tests. Otherwise, it's a good idea to use
them only rarely.

Mocks can make your tests and code brittle due to the tight coupling between the mock and the code itself. Worse, mocks can give you a false positive. If you
change a method's arguments, the test might pass when it shouldn't because of the mock.

Mocks are a useful tool as long as you understand the trade-offs and limitations.


### Big helper methods

Writing helper methods feels natural when writing tests. Perhaps you have to set up some complex
condition to do your test. A helper method could be useful. One temptation is to grow a helper method until it reaches a point where it's hard to understand.

Helper methods, unfortunately, can hide what you want them to do. They can make tests hard to understand and maintain. If you have a helper method that makes an
assertion, that's a sign that the helper does too much.

I've seen test helper methods that need 10 arguments (!) and I've seen helpers with nested conditionals inside of the helper. When a helper method is that big,
we can't debug it when something goes wrong. 


### Slow tests

Keep tests small and fast. The faster the unit test suite,
the more likely people will run them and keep them passing. If a test suite becomes slow, no one will run the tests. 

In Python, we have a few different ways to ensure fast tests. The main
third party test runners (nosetest and pytest) can detect
tests with the slowest runtime. Sometimes you'll find tests with a much slower runtime than the others. Optimizing those can shrink your test suite runtime and make your tests more enjoyable to run.

When I started at a previous job, I ran a test suite for one of the projects. To my surprise, the unit test suite took 3.5 minutes to run for
150 tests. That's slow. Can you imagine waiting for 3 and a half minutes to find out you have a syntax error? No thanks. 

I dug into it and found that the tests loaded and unloaded JSON fixtures files for each test. In some cases, the JSON files had 4000 lines of data in them. 
I centralized the loading and unloading of
the data and the test suite took 15 seconds. That still felt long
but it allowed us to get more immediate results and shorten the feedback loop.

Over time, the number of tests in that project grew to over 500. The runtime stayed around 25 seconds or so. It would've taken 10 minutes or more had we not optimized our test suite.

The tests take to run, the more valuable your test suite will feel.


Conclusion
----------

I love writing tests. Testing has transformed the way
I think about writing code, in general. I think that by applying some of these strategies, you can get to a place where you love your tests.

I have a few more recommendations, if you're looking to read further:

* I like Gary Bernhardt's thoughts on testing, which he shares in his
screencast series [Destroy All Software](https://www.destroyallsoftware.com/screencasts)
and [blog](https://www.destroyallsoftware.com/blog/2014/test-isolation-is-about-avoiding-mocks)
* Sandi Metz has a good talk on [The Magic Tricks of
    Testing](https://www.youtube.com/watch?v=URSWYvyc42M).
* I've heard good things about [Growing Object-Oriented Software, Guided by
    Tests](http://amzn.to/1TMY2ya), though I haven't yet read it.
* Finally, I enjoyed Roy Osherove's talks on testing, such as
    this one on [Unit Testing Best Practices](https://www.youtube.com/watch?v=dJUVNFxrK_4).
