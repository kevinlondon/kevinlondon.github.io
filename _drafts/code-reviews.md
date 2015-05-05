---
layout: post
title:  "Code review best practices"
date:   2015-05-02 15:54:08
categories: code-reviews wiredrive maintainability
---

At Wiredrive, we do a fair amount of code reviews.  I had never done one before
I started here so it was a new experience for me.  I've always looked at my own
code with a critical eye but it's rare that I would look at others, particularly
with the goal of giving constructive feedback.

I think that since I've started here the way code reviews are done has changed
completely. They're intensive. They're less of a rubber stamp.  I believe before
I started they mostly functioned as a "yeah that looks right" and then move on.
It's not quite that way anymore. I think it's a good idea to crystalize some of
the things I look for when I'm doing code reviews and talk about how I got to
this point. I hope that's useful. 

There's a ton of literature out there on how to do code reviews and the 
benefits of code reviews but somewhat less literature on what to actually 
look for and how to constructively bring up an item that I feel 
should be changed. 


Review your own code first
-------------------

Before submitting my code, I will often do a `git add` for the affected 
files / directories and then I run a `git diff --staged` to examine the 
changes I have not yet committed. Usually I'm looking for things like: 

* Did I leave a comment in? 
* Does that variable name make sense? 
* ...and anything else that I've brought up below.

I want to make sure that I would pass my own code review first before I subject 
other people to it. It also stings less to get notes from yourself than 
from others :p


What I look for during a review
-------------------------------

When I review code, I'm usually checking for something in one of the following
categories:

* **[Single Responsibility Principle](http://en.wikipedia.org/wiki/Single_responsibility_principle):**
The idea that a class should have one-and-only-one responsibility.  Harder than
one might expect. I usually apply this to methods too.  If we have to use "and"
to finish describing what a method is capable of doing, it might be at the wrong
level of abstraction.

* **[Open/Closed Principle](http://en.wikipedia.org/wiki/Open/closed_principle):**
If the language is object-oriented, are the objects open for extension but not
modification? What happens if we need to add another one of `x`?

* **Code duplication:**
I go by the "three strikes" rule.  If code is copied once, it's usually okay
although I don't like it.  If it's copied a third time, it should be refactored
so that the common functionality is split out. 

* **Method names:**
Naming things is one of the hard problems in computer science. 
If a method is named `get_message_queue_name` and it is actually doing 
something completely different like sanitizing HTML from the input, 
then that's an inaccurate method name.  And probably a misleading function.

* **Variable names:**
This is another problem similar to method names. `foo` or `bar` are probably not
terribly useful method names for data structures. `e` is similarly not useful,
when compared to `exception`.  Be as verbose as you need. As soon as we write
code, it goes into maintenance mode.

* **Function length:**
My rule of thumb is that a function should be less than 25 or 30 lines. If I see
a method above 50, I will usually recommend that it be cut into smaller pieces.
This goes in line with what I had said earlier - a function should have a single
role. If it's longer than that, it becomes incomprehensible to me.

* **Class length:**
Ah, another hard one. Usually I think classes should be under about 300 lines
total. Ideally well under 100 lines. At that point, it's likely that there are
domain specific objects that could be extracted so that the class could
shrink back down to a more manageable size.

* **File length:**
For Python files, I think around 1000 lines of code is about the most we 
should have. If there's a single test file with more than 1k lines of code, 
that's a good sign that it should be split into smaller, more focused files. As
the size of a file goes up, the discoverability in that file goes down.

* **Efficiency:**
If there's an algorithm in the code, is it using an efficient implementation?
For example, iterating over a list of keys in a dictionary is an inefficient way
to find the one you want.

{% highlight python %}
for key, value in data.iteritems():
    if key == expected:
        return value
{% endhighlight %}

Could be rewritten as:

{% highlight python %}
return data[key]
{% endhighlight %}

The original implementation is O(n) and the newer, simpler one is O(1), which
may or may not matter depending on big `data` is. The second has the added
benefit of readability.

* **Test coverage:**
I like to see tests for new features. Generally I will ask quesitons like: Are
the tests thoughtful? Do they cover the failure conditions? 
Are they easy to read? How fragile are they? How big are the tests? Are they slow?

* **Testing at the right level:**
As part of my general testing diatribe above, when I review tests I'm also
making sure that we're testing them at the right level. In other words, are we
as low a level as we need to be in order to make sure that the functionality
works as expected? Gary Bernhardt uses a rule of 95 / 5 for unit tests vs
integration tests. I find that particularly with Django projects, it's easy to
test at a high level by accident and create a slow codebase so it requires extra
attention to make sure that we're working as low level as possible. 

* **Docstrings:**
For complex methods or those with longer lists of arguments, is there a docstring explaining
what each of the arguments does, if it's not immediately apparent?

* **Number of Method Arguments:**
For the methods and functions under review, do they have fewer than 3 arguments?
Greater than 3 is probably a sign that it could be grouped in a different way.

* **Number of Mocks:**
Mocking is great. Mocking everything is not great. I use a rule of thumb where
if there's more than 3 mocks in a test, it should be revisited. Either the test
is testing too broadly or the function is too large. Maybe it doesn't need
to be tested at a unit test level and would suffice as an integration test.
Either way, it's something to discuss.

* **[Squint-test offenses](http://robertheaton.com/2014/06/20/code-review-without-your-eyes/):**
If I squint my eyes, does the shape of this code look identical to other shapes?
If so, there might be a permutation where code changes slightly. It's not quite
copy-pasted but it's the next closest thing and might be worth revisiting.

* **Readability:**
These are all fairly subjective, I know, but readability is important. Do I have
to pause during the review to consider what each method is doing? 

* **Code left in a better state than found:**
If I'm changing an area of the code that's messy, it's tempting to add in a few
lines and leave. I often urge myself and others to go one step further and leave
the code nicer than we found it. If we don't, it becomes less maintainable over
time.

* **Error handling:**
In Python: Are errors handled gracefully and explicitly where necessary? Are
there custom errors implemented? If so, are they necessary?

* **Potential bugs:**
Will that loop terminate in the way we expect? Will it terminate at all?

* **Meets requirements:**
Usually as part of the end of a review, I'll take a look at the requirements of
the story, task, or bug which the work was filed against. If it doesn't meet one
of the criteria, it's better to bounce it back before it goes to QA. Much easier
that way.


How to handle code reviews
-------------------

I find that the human parts of the code review offer as many challenges as
review in the first place. To be honest, this is something I am still learning
too. 

Here are some approaches that have worked for me when discussing code:

* **Ask questions:** 
    How does this method work? If this requirement changes, what
    else would have to change? How could we make this more maintainable? 
* **Compliment / reinforce good practices:**
    One of the most important parts of the code review is to reward developers
    for growing. Few things feel better than getting praise from a peer.
    I try to offer as many positive comments about code as negative.
* **Discuss in person for more detailed points:**
    On occasion, a recommended architectural change might be large enough that
    it's easier to discuss it in person rather than in the comments. Similarly,
    if I'm discussing a point and it goes back and forth, I'll often pick it 
    up in person and finish out the discussion. It's easier.
* **Explain reasoning:**
    I find it's best both to suggest that there's a better alternative and
    justify why I think it's worth doing. Sometimes it can feel like the 
    changes suggested are nit-picky and I think that anecdotes or longer-form
    explanation can help reduce that feeling.


 Addressing suggested changes
--------------------

We typically leave comments on a per-line basis with some thinking behind them.
Usually I will look at the review notes in Stash and, at the same time, have the
code pulled up to make the suggested changes. I find that I forget what items
I am supposed to address if I do not handle them right away.

Additional References
---------------

There's a number of books on the art of creating clean code. I've read through
fewer of these than I might like (but I'm working to change that and grow). 

**Here's a few books on my list:**

* Clean Code
* Refactoring

**Some useful, related talks**
I'm a big fan of talks so here's a few that I thought of while writing this:

* [All the Small Things by Sandi Metz](https://www.youtube.com/watch?v=8bZh5LMaSmE&index=1&list=LLlt4ZSW8NUcXLWiB3NMnK_w)
: Covers the topic well, particularly
from a perspective of writing clean, reusable code.

**Tooling:**

* **Pylint:**
Great for pointing out many of the architectural flaws above. I feel it can be
a bit opinionated and the signal to noise ratio can be high for my taste.
* **pep8 / flake8:**
Awesome. I have these set up to run automatically every time I save a file
in vim. That way if there's a syntax error or other stylistic flaw, I can
catch and address it righaway, even before my tests run.
* **yapf:**
Interesting tool sort-of by Google. It automatically reformats your code.
https://github.com/google/yapf
