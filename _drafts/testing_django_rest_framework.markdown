---
layout: post
title: Testing Django Rest Framework
date:   2015-05-12 17:54:08
---

I love [Django Rest Framework](http://www.django-rest-framework.org/). It's
one of my favorite things about working in the Python ecosystem. Tom Christie
and co. have made it so easy to get started and make a RESTful API that I find
myself relying on it for even simple projects. 

Once the projects get larger, and more complex, 
it can be challenging to figure out how to properly test
DRF projects below an integration level. This post will cover how to get started
writing unit tests to cover custom functionality and recommending some tips 
about testing, in general, as we go.

Why bother?
-----------

Unit testing is faster and often more surgical an approach toward testing.
I feel it's a great idea to mix in integration tests, of course, but a body of
unit tests will yield an overall faster codebase over time. 
In addition, most posts I've read recommend testing only a single assertion 
at a time. If that's the case, it's great to test at a lower level.

Why it's challenging
--------------------

By its nature, Django makes unit testing a bit challenging. Most of the
documentation in Django uses the Django Test Case. That's fine, but it's slow
because it always has to use the database. Django Rest Framework follows this
habit and encourages you in its testing section to use the provided `APITestCase`,
which subclasses Django's `TestCase` class. It's about as slow.

*Provide benchmarks here.*

In comparison, unittest.TestCase is light-weight and runs quickly so it makes it
easy to test a wider range of options quickly. As I said, both have their place.
If you want to do anything with routing or the database, you're probably
better off using the Django `TestCase`. Otherwise, try your best to use the
`unittest.TestCase`. 

I like to explicitly call out the nature of where I'm
pulling the TestCase class from when I'm writing tests. For example:

import unittest


class AssetValidationTestCase(unittest.TestCase):
    . . .

(TODO: Figure out highlighting)

That way if we're looking at the test later, we don't have to wonder if it 
subclasses Django's TestCase or something else. 

Still not convinced? Wait until the codebase grows and there's many tests to
be run.

Where to start
--------------

If you haven't had a chance to work through the Django Rest Framework Tutorial,
I'd start there.

What to do if you're lost
-------------------------

The source code for Django Rest Framework provides some excellent hints
on how to set up your own tests. Sometimes it falls a little short.
If you have questions, feel free to ask in the discussion below or on the
Django Rest Framework message board.

(TODO: link message board, link source code)


Testing Recommendations
-----------------------

This is, by its nature, an incomplete list.

### Serializers

#### Field options

#### Validation

#### Exposed fields / hidden fields

#### Read Only fields

#### Custom Fields


### Viewsets

#### If overriding create, update

#### If adding detail routes

#### If setting custom permissions

#### Filtering


### Permissions

#### Permission classes

#### Auth classes

#### Combinations of permissions (might be better at an integration level)

#### Planning another article on custom permissions in DRF


### Exception Handling


### Custom Filters

#### Ordering

#### Filters



Additional References
---------------------

* Test-Driven Development in Django
* Gary Bernhardt's Fast Test, Slow Test
* Hypothesis library
