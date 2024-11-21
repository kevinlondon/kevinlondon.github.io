---
title:  "Strategies for Writing Useful Tests"
pubDatetime: 2016-05-11T13:54:09
description: "Strategies for writing useful tests"
---

I hated writing tests. It felt like a waste of time. I had no idea what
to test. If I wrote tests, they took forever to run.
I'd forget to run them. They broke all the time.
It wasn't good.

I like writing tests now.
They've prevented me from deploying bugs into production. They don't suck to
write (usually). They're useful.

How do we get from hating our tests to loving them? How can we write tests that help us?
In this post, I'll share a few suggestions that work for me.

Before we discuss those, let's talk about why we should write tests at all.

Why should I write tests?
-------------------------

* They reduce bugs & regressions

Tests help you catch bugs that you might have missed. I think this almost
a secondary benefit compared to the others. Like code reviews, tests can catch
some errors but not all. For example, your tests cannot tell you if you
have a flaw in the way you thought about a problem.

If your language isn't typed, writing tests can catch
typos or other silly mistakes. Even if it is, tests provide assurance that the code works like you expect.

* Remove fear

If you change a line of code, will it break something else? Without tests, it's challenging to refactor or upgrade dependencies.

With tests, you can feel confident about changing the code. The tests
should fail if the changes break something. As Kent Beck says, "Tests are the Programmer’s stone, transmuting fear into boredom."

It's much better to feel bored than fearful.

* Improve design

When writing code, it sometimes happens that we write code that does too much. Maybe we didn't know what it should do. Maybe it evolved over time. Maybe we didn't know better.

For large, complex methods, it's painful to write tests. That's a good thing.

If something is tough to test, we can adjust the code so that it's easy. Refactoring the code also makes it easier to understand when we come back to it later.

* Speeds up development

It takes a long time to manually test something. You have to repeat work any time something changes.

If you have a workflow like that, each new feature will take longer to build. It's like carrying a heavy weight behind you, because you have to keep the edge cases in your head. This includes things like reloading a page and seeing what happened. It's slow!

Writing tests winds up taking less time as compared to performing them manually. And, better, I've automated the actions I need to take to test the feature.


Strategies
----------

Now that we've discussed a few reasons why tests help us,
let's talk about strategies.

### Write tests as you go

Writing tests any later feels like a painful chore.

I like Test-Driven Development and I use a form of it.
Test-Driven Development says before you write code, you should write a test that fails. Then, write just the code necessary to make
that test pass. Once that's done, you can clean it up.

You don't have to do Test-Driven Development. Sometimes you don't know what you're going to build, so it's hard to write tests.  Other times, you don't want tests to get in the way.

I like writing tests first because seeing a failing test provides peace of mind
when you fix the code. It tells you that the code didn't work at some point. Once it does, the test and code keep doing what they're doing until something changes that.

When you write a test against existing code, it's hard to know if your test is helping you or not.
Writing a failing test gives you that assurance.


### Treat your tests as first-class code

Sometimes test code looks unimportant. Maybe we treat it that way too.  Sometimes the tests sit and rot as production code changes.
It's not easy to clean up tests, to be sure, but it's worthwhile.

I recommend the same rules of thumb for writing tests as writing code. For
example, that includes some of the following:

* Avoiding duplication of code
* Following style guidelines for your language
* Prioritizing readability
* Considering ways to improve them during code reviews

If the test is easy to understand, it's much easier to fix if it breaks.



### If it's hard to write the test, that's a code smell.

When you first start writing tests, it might be uncomfortable. After you get over the initial bump, I think you'll
find that it feels easy to write tests.

If you find that it's hard to test because of how the code fits together, that's a code smell. When I write tests and find that it's hard to create them,
I've usually done something wrong in the code. Most often, I have a method that does too much or interacts with too many
things. If I need to set up the world to test something, that's
bad.

By making your code easy to test, you improve its design.

### Name your tests well

If you're testing cart checkout functionality, you could name your test
something like `test_cart()`. I've seen many tests like that. Instead, I suggest naming the test to reflect what you expect.
For example, perhaps we want to `test_cart_value_cannot_be_negative`.

It's hard to figure
out what might happen in the first test and easy to imagine what goes into the second.

Test names will help you figure out when you're done.
With `test_cart()` it's easy to add in more bits of functionality. With the latter test, there's one clear assertion that I'd expect at the end of the test about the cart's value.

### Use one assertion per test

Tests become muddy with more
than one assertion, so aim for a single assertion per test. Sometimes it makes
sense to use more than one. Generally one per test will help you keep them to a manageable
size and keep it clear what's under test.

Multiple assertions make it hard to figure out what we should get from our test.
They also may lead to a problem where you fix one failing assertion only to find that the next one fails.

### Keep your tests small

If you can keep your tests small and short, it's a good thing. The more you have
to set up, the more likelihood some small piece of it will change and break your
test. My favorite on this is a tweet by [Gary
Bernhardt](https://www.destroyallsoftware.com/screencasts):

<blockquote class="twitter-tweet" data-lang="en"><p lang="en"
dir="ltr">Resisting the urge to write a test runner that raises CoolStoryBro if
your test is over eight lines long.</p>&mdash; Gary Bernhardt (@garybernhardt)
<a href="https://twitter.com/garybernhardt/status/125711084878442496">October
16, 2011</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

It's a pretty good metric to use for testing, though sometimes you'll need more space than that.


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

In Python, we have a few different ways to ensure fast tests. Pytest and nosetest can detect
tests with the slowest runtime. Sometimes you'll find tests with a much slower runtime than the others. Optimizing those can shrink your test suite runtime and make your tests more enjoyable to run.

When I started at a previous job, I ran a test suite for one of the projects. To my surprise, the unit test suite took 3.5 minutes to run for
150 tests. That's slow. Can you imagine waiting for 3 and a half minutes to find out you have a syntax error? No thanks.

I dug into it and found that the tests loaded and unloaded JSON fixtures files for each test. In some cases, the JSON files had 4000 lines of data in them.
I centralized the loading and unloading of
the data and the test suite took 15 seconds. That still felt long
but it allowed us to get more immediate results and shorten the feedback loop.

Over time, the number of tests in that project grew to over 500. The runtime stayed around 25 seconds or so. It would've taken 10 minutes or more had we not optimized our test suite.

The quicker the test suite runs, the more valuable it will feel.


Conclusion
----------

I love writing tests. Testing has transformed the way
I think about writing code, in general. By applying these strategies, I believe
you can get to a place where you love your tests.

I have a few more recommendations, if you're looking to read further:

* Gary Bernhardt talks about testing in his
screencast series [Destroy All Software](https://www.destroyallsoftware.com/screencasts)
and [blog](https://www.destroyallsoftware.com/blog/2014/test-isolation-is-about-avoiding-mocks)
* Sandi Metz has a good talk on [The Magic Tricks of
    Testing](https://www.youtube.com/watch?v=URSWYvyc42M).
* I've heard good things about [Growing Object-Oriented Software, Guided by
    Tests](https://amzn.to/3aCUXQT).
* I enjoyed Roy Osherove's talks on testing, such as
    [Unit Testing Best Practices](https://www.youtube.com/watch?v=dJUVNFxrK_4).
