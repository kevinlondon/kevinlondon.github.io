---
title:  "Finding Vulnerabilities with Bandit Talk"
pubDatetime: 2015-09-24T13:23:08
description: "How to use Bandit to automatically scan Python codebases for security vulnerabilities: setup, configuration, and integrating security checks into your development workflow."
tags:
  - python
  - security
  - talks
---

Security is tough. It's so easy to forget something or get a couple
of things wrong. The stakes have also never been higher - announcements about
a company getting hacked come out weekly. So what can we do?

One part of the solution is tooling. 
OpenStack's security team created [Bandit](https://github.com/openstack/bandit) to
help them solve the problem of doing security reviews on 18+ projects. 
It's an open source tool that we can use to scan our code and find out
if we're calling insecure or deprecated functions. 

In these slides, I cover some of my findings from running Bandit on 16 
popular open-source Python projects as well as some of the potential
security flaws that Bandit can identify.

I originally gave this talk at a [SoCal Python](http://www.meetup.com/socalpython/events/225224958/) meetup.

Slides
------

{% raw %}
<script async class="speakerdeck-embed" data-id="d589cefcc0a2426988da5c6042dabc9c" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>
{% endraw %}

Additional Reading
------------------

* [Dangerous Python Functions, Part 1](http://kevinlondon.com/2015/07/26/dangerous-python-functions.html)
* [Dangerous Python Functions, Part 2](http://kevinlondon.com/2015/08/15/dangerous-python-functions-pt2.html)

Referenced Resources 
--------------------

* [22 Million Affected by OPM Hack, Officials Say](http://abcnews.go.com/US/exclusive-25-million-affected-opm-hack-sources/story?id=32332731)
* [OPM says 5.6 million fingerprints stolen in cyberattack](https://www.washingtonpost.com/news/the-switch/wp/2015/09/23/opm-now-says-more-than-five-million-fingerprints-compromised-in-breaches/)
* [Ashley Madison's members by the numbers](http://www.cbc.ca/news/technology/ashley-madison-s-members-by-the-numbers-1.3208152)
* [Almost None of the Women in the Ashley Madison Database Ever Used the Site](http://gizmodo.com/almost-none-of-the-women-in-the-ashley-madison-database-1725558944)
* [IRS Revises Tax Return Hack Numbers, Says Over 300,000 Accounts Were Hacked](http://www.ibtimes.com/irs-revises-tax-returns-hack-numbers-says-over-300000-accounts-were-hacked-2057783)
* [Hackers Remotely Kill a Jeep on the Highway -- with Me in It](http://www.wired.com/2015/07/hackers-remotely-kill-jeep-highway/)
* [Anthem: Hacked Database Included 78.8 Million People](http://www.wsj.com/articles/anthem-hacked-database-included-78-8-million-people-1424807364)
* [TSA Master Keys](https://www.schneier.com/blog/archives/2015/09/tsa_master_keys.html)
