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

What does it check?
------------------

There's not currently a comprehensive list of what Bandit checks. From looking
through the list of plugins, here's a few items that are getting checked by
default:

- Items falling within a set of blacklisted imports, calls, or functions are used.
  Defaults include md5, eval, mark-safe, pickle, yaml, etc.
- Exec called.
- Hardcoded or non-secret passwords
- Shell injections.
- Hardcoded SQL statements
- Calling Linux commands with wildcards (`*`)
- Requests with certificate validation turned off
- Bad SSL settings
- Using try / except / pass

The closest thing to a comprehensive list can be found by looking at the
default [`bandit.yaml`](https://github.com/openstack/bandit/blob/master/bandit/config/bandit.yaml) configuration file.
Anything in the `profiles`:`All`:`include` section are run on each run by default
and the `blacklist` sections call out some of the insecure calls they're
looking for.

Personal Results
----------------

I ran this on an old program that I wrote, out of curiosity.

{% highlight python %}

    kevin$ bandit -r  ~/programming/my_old_app
    [bandit]    INFO    using config: ~/.virtualenvs/bandit/etc/bandit/bandit.yaml
    [bandit]    INFO    running on Python 2.7.6

    Run started:
        2015-09-11 20:09:47.141203

    Test results:

    >> Issue: Consider possible security implications associated with subprocess module.
       Severity: Low   Confidence: High
       Location: ~/programming/my_old_app/controllers/old_controller.py:1
    1   import subprocess
    2   import threading

    >> Issue: subprocess call with shell=True identified, security issue.
       Severity: High   Confidence: High
       Location: ~/programming/my_old_app/controllers/old_controller.py:123
    122             logging.info("Issuing command: %s" % item)
    123             p = subprocess.Popen(item, shell=True, stdout=subprocess.PIPE)
    124             process_list.append(p)

    >> Issue: Use of insecure MD2, MD4, or MD5 hash function.
       Severity: Medium   Confidence: High
       Location: ~/programming/my_old_app/controllers/old_controller.py:230
    229 def get_hex_digest(f, blocksize):
    230     checksum = hashlib.md5()
    231     while 1:

{% endhighlight %}

In this case, we have three results. One of them is low severity with a high
confidence. In other words, Bandit's certain we're doing something questionable
but it's not a big deal.

The second is more serious with a high severity and high confidence.
Using `shell=True` with subprocess can have
[serious security implications](http://kevinlondon.com/2015/07/26/dangerous-python-functions.html).
If we were to find this in our code, it would be a good idea to change it so it
no longer uses `shell=True` or at least sanitize our input before sending
it off to the shell.

The last case is medium severity with a high confidence, so somewhere in the
middle.  For this application, we made a conscious choice to use MD5s and we're
not using it for something that needs to be secure (like password hashing), so
that's working as expected. We might consider adding a `# nosec` annotation
at the end of the line so it ignores this on future runs.


Field Results
-------------

I wanted to know how we were doing as a community. In general, are our open
source projects secure and well-written? Are we accidentally performing [`gem
install hairball`](https://www.youtube.com/watch?v=rI8tNMsozo0) each time we
install a community package? The nature of open source, of course, is that
something can change from insecure to secure with a single pull request.  I
checked a few of the trending projects on Github to see what we could find and
to see if I could help address any security problems.  Here's what I found:

Note: For the protection of the projects, I will change identities and sample
code.

I checked X projects with an average of Y stars each. In general, I found
X critical vulnerabilities, which I helped address.

Include Bandit in your CI Pipeline
----------------------------------

One of the great things about running discrete programs is that you can run
them whenever you want and it won't slow you down. The obvious downside to that
is that you have to remember to run them. I know if I only ran
[flake8](http://flake8.readthedocs.org/en/latest/index.html) when I explicitly
ran the program as opposed to every save in Vim, I would never bother with the
output. The key, I think, is to hold ourselves accountable. 

If you're using something like TravisCI or another CI server, consider setting
Bandit as one of the steps to a successful build. I'd recommend setting the
threshold at a severity of 3, to start, and perhaps gradually ratcheting it up.
I'm still getting a feel for the project myself so I'm not sure how accurate all
the mid-level warnings are. If you accidentally check in risky code, it's
better to know about it early rather than after someone has hacked you.

Extending Bandit
---------------

Bandit's also extensible, so if you find that there's a vulnerability that's not
adequately covered already in the project, you can easily add another one. 
Let's pick one ourselves to include.
