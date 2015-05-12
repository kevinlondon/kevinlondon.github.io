---
layout: post
title: Testing Django Rest Framework
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

Why it's challenging
--------------------

Where to start
--------------

If you haven't had a chance to work through the Django Rest Framework Tutorial,
I'd start there.

What to do if you're lost
-------------------------

Read the source! it's well organized.


Testing Recommendations
-----------------------

Serializers
* Field options
* Validation
* Exposed fields / hidden fields
* Read Only fields
* Custom Fields

Viewsets
* If overriding create, update
* If adding detail routes
* If setting custom permissions
* Filtering

Permissions
* Permission classes
* Auth classes
* Combinations of permissions (might be better at an integration level)
* Planning another article on custom permissions in DRF

Exception Handling

Custom Filters
* Ordering
* Filters

This is, by its nature, an incomplete list.

Additional References
---------------------

* Test-Driven Development
* Gary Bernhardt's Fast Test, Slow Test
