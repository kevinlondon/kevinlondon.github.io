---
layout: post
title:  "Dangerous Python Functions, Part 2"
date:   2015-07-19 15:54:08
---

Untrusted Input Part 2: Pickle and friends
------------------------------------------

Pickle serializes Python objects or data to a file and can restore it as well.


Why they're useful
==================

Pickle enables you to store state to disk. In the past, I've used pickle
to support pause and resume functionality with large file transfers. I did not
want to store the information in a database so I used pickle files to track what
had been done and what had not.

Why they're dangerous
=====================

Pickle, unfortunately, is prone to the same problems as `exec` and `eval`
because it enables users to craft input that executes arbitrary code on
your machine. Sound familiar?

Other services rely upon pickle to do their thing as well.
One of those is [`shelve`](https://docs.python.org/2/library/shelve.html), 
which is another module related to serializing Python objects.

[`Celery`](http://www.celeryproject.org/), a popular package used for sending 
messages to queues, used pickle by default for communication with its workers 
before version 3.0.18. If you're using an older version of Celery, check and 
make sure you're following the
[recommended security guidelines](http://celery.readthedocs.org/en/latest/userguide/security.html).


A dangerous example
===================

Examples are best illustrated by the linked articles below so please read those
if you're interested in learning more about pickle's dangers.


What to use instead
===================

You could use [`json`](https://docs.python.org/3/library/json.html) to
serialize data or, if you must, `yaml`. If you use `yaml`, please read the
section below on why it has its own set of risks.


If you must use them...
=======================

Be extra careful with your input.


Additional references
=======================

* [Arbitrary code execution with Python pickles](https://www.cs.jhu.edu/~s/musings/pickle.html)
* [Sour Pickles](https://media.blackhat.com/bh-us-11/Slaviero/BH_US_11_Slaviero_Sour_Pickles_WP.pdf)
* [Playing with Pickle Security](https://lincolnloop.com/blog/2013/mar/22/playing-pickle-security/)


Loading YAMLs
------------------------

YAML stands for `YAML Ain't Markup Language` and offers another way to
serialize data. [`PyYaml`](http://pyyaml.org/wiki/PyYAMLDocumentation) 
does not live in the standard library but seems like the
most popular way of parsing YAMLs in Python so I'm including it here.


Why they're useful
==================

YAML files are useful for storing configuration or other values that should not
change much. As such, having something that can easily load and
manipulate YAML files is great. I have used YAMLs to store 
configuration values for Python apps in the past.

Why they're dangerous
=====================

Calling `yaml.load()` is the simplest way to load a YAML file but `yaml.load()`
is an unsafe operation that, you guessed it, enables maliciously crafted files
to execute arbitrary code on the host machine. 

A dangerous example
===================

Please see the linked articles below if you're interested in an example.
The Rails-related YAML exploit that came out a few years ago applies to Python
as well.

What to use instead
===================

The `yaml` module has a safe way to load yaml files: `yaml.safe_load()`.
I wish the package had the safe method as the default, rather than the
dangerous one.

As Ned Batchelder says:

> Why do serialization implementers do this? If you must extend the format with
> dangerous features, provide them in the non-obvious method. Provide a .load()
> method and a .dangerous_load() method instead. At least that way people would
> have to decide to do the dangerous thing. 


If you must use them...
=======================

Use the `yaml.safe_load()` method. Again, if you *must* use `yaml.load()`
directly, then you should be extra careful with the files that you load with
it.


Additional references
=======================

* [War is Peace](http://nedbatchelder.com/blog/201302/war_is_peace.html)
* [Rails' Remote Code Execution Vulnerability Explained](http://blog.codeclimate.com/blog/2013/01/10/rails-remote-code-execution-vulnerability-explained/)


Additional dangers
------------------

SQL Injection
=============

SQL Injection is basically untrusted input meets your database. All the same
risks that we talked about with untrusted input above also apply here. Python
provides a database binding for `sqlite3` and there's a section in the Python
docs where they talk about how to properly escape variables. Otherwise, I'd
recommend using the ORM in [Django](https://www.djangoproject.com/) or
[sqlalchemy](http://www.sqlalchemy.org/).

* [OWASP SQL Injection](https://www.owasp.org/index.php/SQL_Injection)
* [Python sqlite3 documentation](https://docs.python.org/3/library/sqlite3.html)


Information Leakage
===================

`print` and `logging` are useful but potentially risky.  Ideally, any log files
that we write have their permissions configured to allow only priviledged users
to read them.  If anyone can read the log file, it's more likely that the logs
will be leaked. If you must log sensitive information (must you?)
be sure to protect them through access controls.

Thanks to [@goodwillbits](https://twitter.com/goodwillbits) for recommending
that I add this section.

* [OWASP Information Leakage](https://www.owasp.org/index.php/Information_Leakage)


In Conclusion
-------------

We've covered a few ways in which Python functions can be dangerous,
particularly when it comes to user input. As a reminder, if you're going to
accept input from users, be careful what you do with it.
