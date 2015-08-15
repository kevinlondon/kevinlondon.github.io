---
layout: post
title:  "Dangerous Python Functions, Part 2"
date:   2015-07-19 15:54:08
---

As mentioned in the [first part of this series](http://kevinlondon.com/2015/07/26/dangerous-python-functions.html),
some functions in Python can be dangerous if you're not aware of their risks.
In this installment, we'll cover deserializing data, loading yamls and 
information leakage.

Pickle and friends
------------------------------------------

Why it's useful
==================

[`pickle`](https://docs.python.org/3/library/pickle.html) enables you to store
state and Python objects to disk so that you can later restore them. Pickle can
be useful for storing something that doesn't quite need a database or for data
that's inherently temporary.

In the past, I've used pickle to support pause and resume functionality for
large file transfers. I saved the progress to a pickle file and then, 
on resume, picked up where it left off and removed the pickle.

Why it's dangerous
=====================

Pickle has the same weaknesses as `exec` and `eval`
,which we covered in [part 1](http://kevinlondon.com/2015/07/26/dangerous-python-functions.html),
because it enables users to craft input that executes arbitrary code on
your machine. Sound familiar?

Other libraries and modules rely upon Pickle to do their thing as well, which
makes them prone to the same risks.
One of those is [`shelve`](https://docs.python.org/2/library/shelve.html), 
which is another module related to serializing Python objects.

[`Celery`](http://www.celeryproject.org/), a popular package used for sending 
messages to queues, used pickle by default for communication with its workers 
before version 3.0.18. If you're using an older version of Celery, check and 
make sure you're following the
[recommended security guidelines](http://celery.readthedocs.org/en/latest/userguide/security.html).

[Django](https://www.djangoproject.com/), a popular Python web framework, 
used `pickle` before version 1.6
(they're currently on v1.8) to store session information. There's a
[scary warning in the Django docs](https://docs.djangoproject.com/en/1.8/topics/http/sessions/#session-serialization)
about how that can go wrong.


A dangerous example
===================

To demonstrate how this might be exploited, I'm going to use an example from 
Lincoln Loop's 
[Playing with Pickle Security](https://lincolnloop.com/blog/playing-pickle-security/).
and expand upon it. In our example, we will serialize a command to call 
`ls` and then deserialize it with `pickle.loads()`.

{% highlight python %}
import os
import cPickle


# Exploit that we want the target to unpickle
class Exploit(object):
    def __reduce__(self):
        # Note: this will only list files in your directory.
        # It is a proof of concept.
        return (os.system, ('ls',))


def serialize_exploit():
    shellcode = cPickle.dumps(Exploit())
    return shellcode


def insecure_deserialize(exploit_code):
    cPickle.loads(exploit_code)


if __name__ == '__main__':
    shellcode = serialize_exploit()
    print('Yar, here be yer files.')
    insecure_deserialize(shellcode)
{% endhighlight %}

In this case, we only wanted to list the files in the directory using the
`ls` command. We could have used almost any shell command we wanted.


What to use instead
===================

You could use [`json`](https://docs.python.org/3/library/json.html) to
serialize data or, if you must, `yaml`. If you use `yaml`, please read the
section below on why it has its own set of risks.

If you're using Celery or Django, you should upgrade to a version that
does not use `pickle` for serialization.


If you must use them...
=======================

Be careful with your input! Never trust a pickle that has gone over
the network or come from someone else. It's too easy to exploit.


Additional references
=======================

* [Arbitrary code execution with Python pickles](https://www.cs.jhu.edu/~s/musings/pickle.html)
* [Sour Pickles](https://media.blackhat.com/bh-us-11/Slaviero/BH_US_11_Slaviero_Sour_Pickles_WP.pdf)


Loading YAMLs
------------------------

YAML stands for `YAML Ain't Markup Language` and offers another way to
serialize data. [`PyYaml`](http://pyyaml.org/wiki/PyYAMLDocumentation) 
does not live in the standard library but seems like the
most popular way to parse YAMLs in Python.


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
