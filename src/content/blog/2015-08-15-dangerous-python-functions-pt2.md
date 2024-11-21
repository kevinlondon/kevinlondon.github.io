---
title:  "Dangerous Python Functions, Part 2"
pubDatetime: 2015-08-15T15:22:08
description: "A discussion of dangerous Python functions and how to avoid them"
---

As mentioned in the [first part of this series](http://kevinlondon.com/2015/07/26/dangerous-python-functions.html),
some functions in Python can be dangerous if you're not aware of their risks.
In this installment, we'll cover deserializing data with pickle and yaml and 
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
, which we covered in [part 1](http://kevinlondon.com/2015/07/26/dangerous-python-functions.html).
It enables users to craft input that executes arbitrary code on
your machine. Sound familiar?

Other libraries and modules rely upon Pickle to do their thing as well, which
makes them prone to the same risks.
One of those is [`shelve`](https://docs.python.org/2/library/shelve.html), 
which is another module related to serializing Python objects.

[Celery](http://www.celeryproject.org/), a popular package used for sending 
messages to queues, used pickle by default for communication with its workers 
before version 3.0.18. If you're using an older version of Celery,
make sure you're following the
[recommended security guidelines](http://celery.readthedocs.org/en/latest/userguide/security.html) or upgrade.

[Django](https://www.djangoproject.com/), a popular Python web framework, 
used `pickle` before version 1.6 to store session information. There's a
[scary warning in the Django docs](https://docs.djangoproject.com/en/1.8/topics/http/sessions/#session-serialization)
about how that can go wrong.


A dangerous example
===================

I'm going to use an example from Lincoln Loop's 
[Playing with Pickle Security](https://lincolnloop.com/blog/playing-pickle-security/)
and expand upon it. In our example, we will serialize a command to call the
command-line utility `ls` and deserialize it with `pickle.loads()`.

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
`ls` command. We could have used almost any shell command.


What to use instead
===================

You could use [`json`](https://docs.python.org/3/library/json.html) to
serialize data or, if you must, `yaml`. If you use `yaml`, please read the
section below on why it has its own set of risks.

If you're using Celery or Django, you should upgrade to a version that
does not use `pickle` for serialization.


If you must use it...
=======================

Be careful with your input! Never trust a pickle that has gone over
the network or come from someone else. It's too easy to exploit.


Additional references
=======================

* [Arbitrary code execution with Python pickles](https://www.cs.jhu.edu/~s/musings/pickle.html)
* [Sour Pickles](https://media.blackhat.com/bh-us-11/Slaviero/BH_US_11_Slaviero_Sour_Pickles_WP.pdf)


Loading YAMLs
------------------------

Why it's useful
==================

YAML files offer another option for serializing and deserializing data.  They
are useful for storing configuration or other immutable values.  I have used
YAMLs to store configuration values for web applications, where the
configuration differs depending upon the environment we're deploying to
(production vs staging, for example).

[`PyYAML`](http://pyyaml.org/wiki/PyYAMLDocumentation) 
does not live in the standard library but seems like the
most popular way to parse YAMLs in Python.

Why it's dangerous
=====================

The simplest way to load a YAML file is with `yaml.load()`.  Unfortunately,
`yaml.load()` is an unsafe operation that, you guessed it, enables maliciously
crafted files to execute arbitrary code on the host machine. 


A dangerous example
===================

As with pickle, we'll setup an example where we read the files in a directory
on the host machine.

In `exploit.yml`:

{% highlight yaml %}
your_files: !!python/object/apply:subprocess.check_output ['ls']
{% endhighlight %}

In a Python script (after perhaps running `pip install pyyaml`):

{% highlight python %}
import yaml

with open('exploit.yml') as exploit_file:
    contents = yaml.load(exploit_file)
    your_files = contents['your_files'].splitlines()
    for your_file in your_files:
        print(your_file)
{% endhighlight %}

Again, we can provide many different commands to subprocess, including those
that we discussed in 
[part 1](http://kevinlondon.com/2015/07/26/dangerous-python-functions.html).


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


If you must use it...
=======================

Use `yaml.safe_load()`. If you *must* use `yaml.load()` directly, then you
should be careful about which files you load and trust.


Additional references
=======================

* [War is Peace](http://nedbatchelder.com/blog/201302/war_is_peace.html)
* [Rails' Remote Code Execution Vulnerability Explained](http://blog.codeclimate.com/blog/2013/01/10/rails-remote-code-execution-vulnerability-explained/)


A few more dangers
------------------

I wanted to briefly touch on a few other things to keep in mind while writing
Python code.

SQL Injection
=============

SQL Injection is basically untrusted input meets your database. All the same
risks that we talked about with untrusted input above also apply here. 

As a quick example, here's how someone could exploit this:

{% highlight python %}
import sqlite3

def get_user_by_name(name, cursor):
    cursor.execute("SELECT * FROM users WHERE name = '%s'" % name)  # unsafe!


if __name__ == '__main__':
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()
    malicious_name = "Joe'; DROP TABLE users; --"
    get_user_by_name(malicious_name, conn) 
{% endhighlight %}

If you ran this example against a real database, the malicious name would drop
the user's table. Not great.

Python provides a database binding for
[`sqlite3`](https://docs.python.org/3/library/sqlite3.html) in the standard
library and there's a section in the Python docs where they talk about how to
properly escape variables (which we do not do in the example). 
Otherwise, I'd recommend using an ORM, such as the
one in [Django](https://www.djangoproject.com/) or
[sqlalchemy](http://www.sqlalchemy.org/). 

* [OWASP SQL Injection](https://www.owasp.org/index.php/SQL_Injection)


Information Leakage
===================

The `print` function and `logging` module are useful but potentially risky.
Ideally, any log files that we write have their permissions configured to allow
only sufficiently privileged users to read them. If anyone can read the log
file, it's easier for someone to access the logs when they shouldn't be able to
do so.  If you must log sensitive information (must you?), be sure to protect
it through access controls.

Thanks to [@goodwillbits](https://twitter.com/goodwillbits) for recommending
that I add this section.

* [OWASP Information Leakage](https://www.owasp.org/index.php/Information_Leakage)
* [Good logging practice in Python](http://victorlin.me/posts/2012/08/26/good-logging-practice-in-python)


In Conclusion
-------------

In this series, we've covered a few different ways in which Python functions
can be dangerous. Python's documentation is good about letting you know when
it's risky to use something but you have to know when and where to look.  If
you take nothing else away from this post, please remember to be careful when
it comes to accepting untrusted input.

Discussion on [Hacker News](https://news.ycombinator.com/item?id=10067207).
