---
layout: post
title: Finding Insecure Python Code with Bandit
date: 2015-09-10 22:17:10
---

It's hard to keep track of all the ways we can shoot ourselves in the foot.  In
C, they had stack overflow problems if you didn't check your bounds.  TODO: Go
into stack overflows a bit more.  Eventually, the tooling (and compilers) caught
up and started offering sane defaults. 

In Python, we don't have a compiler, so we don't have any compile-time checking.
Static analysis is also notoriously hard to do with a dynamic language.  It's
only been recently that we've even seen the introduction of types in Python with
the changes coming in Python 3.5 for static typing. As such, finding any
security holes in Python is, by its nature, a challenging task.

OpenStack created a tool to solve this very problem - Bandit. Bandit is an open
source tool that runs security checks for all the most common insecure Python
functions in your code and gives you an output of the results.

Let's cover how we'd use Bandit, some results I found while testing it out, and
some other thoughts on how to use Bandit to improve the security of your code.

How to Use Bandit
-----------------

Their README is pretty good and helpful with walking through all the options.
Basically, when Bandit runs, it will scan a directory of your choice and look
for a set of pre-defined vulnerabilities. If it finds them, it reports them to
you.  You can specify the levels of feedback you'd like from the tool, ranging
from "show me all the things!" to "only report something if it could blow up my
car".

For example, let's run a check on one of my old projects.

What does it check?
------------------
List some things.


Field Results
-------------

I wanted to know how we were doing as a community. In general, are our open
source projects secure and well-written? Are we accidentally performing `gem
install hairball` each time we install a community package? The nature of open
source, of course, is that something can change from insecure to secure with
a single pull request.  I checked a few of the trending projects on Github to
see what we could find and to see if I could help address any security problems.
Here's what I found:

Note: For the protection of the projects, I will change identities and sample
code.

I checked X projects with an average of Y stars each. In general, I found
X critical vulnerabilities, which I helped address.

Include Bandit in your CI Pipeline
----------------------------------

One of the great things about running discrete programs is that you can run them
whenever you want and it won't slow you down. The obvious downside to that is
that you have to remember to run them. I know if I only ran flake8 when
I explicitly ran the program as opposed to every save in Vim, I would never
bother with the output.  The key, I think, is to hold ourselves accountable. 

If you're using something like TravisCI or another CI server, consider setting
Bandit as one of the steps to a successful build. I'd recommend setting the
threshold at a severity of 3, to start, and perhaps gradually ratcheting it up.
I'm still getting a feel for the project myself so I'm not sure how accurate all
the mid-level warnings are. If you accidentally check in dangerous code, it's
better to know about it early rather than after someone has hacked you.

Adding Checks
-------------

Bandit's also expandable, so if you find that there's a vulnerability that's not
adequately covered already in the project, you can easily add another one. 
Let's pick one ourselves to include.
