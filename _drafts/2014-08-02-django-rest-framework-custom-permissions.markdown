---
layout: post
title: Django Rest Framework Custom Permissions
---
[Django Rest Framework](http://www.django-rest-framework.org/) is great. Setting up custom permissions is supported but can be tricky because what you need to know spans so many sections of the documentation. I hope that this will help provide some insight into what you can do to get permissions working properly in a project of your own.

#### Alternatives
[Django Guardian](https://github.com/lukaszb/django-guardian) is a good alternative to the method below and a great way to implement object-level permissions. Unfortunately, it doesn't quite fit our use case at the moment. We have role-based (not group-based) permissions that are already pre-defined, so it doesn't make sense to maintain two sets of permissions: one in groups and one in the role itself. This led me a bit down a rabbit hole on how to fix it with Django Rest Framework.

## Our Example Project
In this instance, let's work from a [complete version](https://github.com/tomchristie/rest-framework-tutorial) of the [Django Rest Framework tutorial](http://www.django-rest-framework.org/tutorial/1-serialization). Go ahead and fork that if you'd like to play along from home. 

The tutorial already covers some of the basics of setting up permissions, so I'll defer to [their tutorial description of permission classes](http://www.django-rest-framework.org/tutorial/4-authentication-and-permissions).

####1. Filter views
As per the Django Rest Framework documentation, per-object permissions are not checked when getting a list of resources. As such, you'll still want to filter yourself prior to returning a list of results to a user. 

####2. Set up permission classes
Custom [permission classes](http://www.django-rest-framework.org/api-guide/permissions) offer a way to give you more granularity on either a view or viewset level. 

####3. Assign permission classes to viewsets / views


I hope you found this useful. Please follow me on Twitter at @kevin_london. If you're interested in tackling more API challenges, [come join us at Wiredrive](http://www.wiredrive.com/careers/). We're hiring Python / Django developers.
