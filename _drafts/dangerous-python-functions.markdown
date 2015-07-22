---
layout: post
title:  "Dangerous Python Functions"
date:   2015-07-19 15:54:08
---

Certain Python functions should not be used or should be used only with caution.
Python's documentation usually includes a note about the dangers but does not always
fully illustrate why the function is risky. We will discuss a few dangerous
categories of Python functions and some alternatives.
If you see these used in the wild, it may not be a bad thing, 
but it does mean that we should pay close attention to their usage.
 
The Command Injection Series
--------------------------

The first group of dangerous Python functions revolve around trusting
user-provided input and piping it into a shell. 


Why they're useful
==================

Sometimes you need to send a command directly to the shell. If you're
interacting with command-line utilities, it's convenient to provide a command
to Python with the Subprocess module using
[`subprocess.call`](https://docs.python.org/2/library/subprocess.html) and
setting `shell=True`. 

[`os.system()`](https://docs.python.org/2/library/os.html#os.system) and
[`os.popen*()`](https://docs.python.org/2/library/os.html#os.popen) have been
deprecated since Python 2.6 in favor of the subprocess module.
Their simple API and legacy reasons might be why they're still in use sometimes.


Why they're dangerous
======================

Using `shell=True` (or any of the similar command-line oriented tools in `os`),
can expose you to security risks if someone provides input that is crafted to
issue different commands to the shell. 


A dangerous example
===================

Let's say we want to write a command to transcode a user-specified video file
into a different format. We ask the user where to find the file on disk and
then run it through [ffmpeg](https://www.ffmpeg.org/) to transcode it. What
could go wrong?

{% highlight python %}
import subprocess

def transcode_file():
    filename = raw_input('Please provide the path for the file to transcode: ')
    command = 'ffmpeg -i "{source}" output_file.mpg'.format(source=filename)
    subprocess.call(command, shell=True)  # a bad idea!
{% endhighlight %}

What if someone provides a file with a name like `"; rm -rf /`?  If the host
machine runs the Python process as a priviledged user, that could delete all
of the files on the machine. That's bad.


What to use instead
===================

`subprocess` with `shell=False`. It protects you against most of the risk
associated with piping commands to the shell. If you go this route,
[`shlex.split()`](https://docs.python.org/3/library/shlex.html#shlex.split)
makes it easier to prepare the command (and is what the Python docs recommend).

[`sh`](https://amoffat.github.io/sh/) - Useful for issuing commands to other
applications. I had some trouble issuing complex commands through `sh` before
because of the way it quotes variables. That said, if it works for your use
case, then go for it!


If you must use them...
=======================

Be sure to escape all your variables! You can use
[`pipes.quote()`](https://docs.python.org/2/library/pipes.html#pipes.quote) for
that if you're using Python 2.x or
[`shlex.quote()`](https://docs.python.org/3.3/library/shlex.html#shlex.quote)
if you're using Python 3.3 or newer.


Additional references
=======================

* [Subprocess documentation on security implications](https://docs.python.org/3/library/subprocess.html#frequently-used-arguments)
* [OWASP Command Injection](https://www.owasp.org/index.php/Command_Injection)
* [Shellshock affects os.popen](http://security.stackexchange.com/a/68602)
* [PEP 324 - Subprocess](https://www.python.org/dev/peps/pep-0324/)


Code Injection - exec, eval
---------------------------

The second group of dangerous functions relate to taking input and 
running it as a script.

Why they're useful
==================

[`exec`](https://docs.python.org/3/library/functions.html#exec) and
[`eval`](https://docs.python.org/3/library/functions.html#eval) take strings
and turn them into executable code, which can be useful, especially if you are
the one who controls the input. As one example, I've used `eval` before 
to evaluate a large dict-like string into a dictionary.


Why they're dangerous
=====================

Again, we do not know what the user will provide in all cases. `eval()` and
`exec()` will execute whatever is given to them. A user could combine it with
other Python functions to potentially erase all your data, expose your secret
keys, dump your database, or perform other malicious actions.

A dangerous example
===================

Related to the previous example, suppose you're `eval`ing a string that looks
like this: `"os.system('rm -rf /')  # dangerous!"`. It, too, could erase all
your files.

What to use instead
===================

It depends. If you're trying to use `eval` or `exec`, 
there may be a better way to accomplish what you're trying to do. 
The functions can be used in many different ways so it is challenging to provide
an alternative that covers all use cases.

If you're using them to perform serialization / deserialization, it would
probably be better to use another format, such as JSON.

If you must use them...
=======================

Again, be sure to escape your input. You can also disable the builtins to help
a little, which Ned Batchelder covers in 
[Eval really is dangerous](http://nedbatchelder.com/blog/201206/eval_really_is_dangerous.html).


Additional references
=======================

* [OWASP Code Injection](https://www.owasp.org/index.php/Code_Injection)
* [Be careful with exec and eval in Python](http://lucumr.pocoo.org/2011/2/1/exec-in-python/)


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
