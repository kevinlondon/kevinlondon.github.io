---
layout: post
title:  "Dangerous Python Functions"
date:   2015-07-19 15:54:08
---

Certain Python functions should not be used or should be used only with caution.
The documentation usually includes a note about the dangers but does not always
fully illustrate why the function is risky. We will discuss a few dangerous
categories of functions in Python and mention what alternatives exist.
If you see some of these used in the wild, it may not be bad, 
but we should pay extra attention to their usage.
 
The Command Injection Series
--------------------------

The first group of dangerous Python functions revolve around the risk associated
with trusting external input and piping it into a shell. 


Why they're useful
==================

Sometimes you need to send a command directly to the shell. If you're
interacting with command-line utilities, it's simple to provide a command to
Python with the Subprocess module using
[`subprocess.call`](https://docs.python.org/2/library/subprocess.html) and
setting `shell=True`. It'll execute similar to how it would using the shell
directly. 

[`os.system()`](https://docs.python.org/2/library/os.html#os.system) and
[`os.popen*()`](https://docs.python.org/2/library/os.html#os.popen) have been
deprecated since Python 2.6 in favor of the subprocess module so they're less
useful now. They have a simple API, which I think is their strongest allure.


Why they're dangerous
======================

Using `shell=True` (or any of the similar command-line oriented tools in `os`),
can expose you to security risks if someone provides input that is crafted to
issue different commands to the shell. 


A dangerous example
===================

Let's say we're writing a command to transcode a user-specified video file into
a different format. We ask the user where to find the file on disk and
then run it through [ffmpeg](https://www.ffmpeg.org/) to transcode it. What
could go wrong?

{% highlight python %}
import subprocess

def transcode_file():
    filename = raw_input('Please provide the path for the file to transcode: ')
    command = 'ffmpeg -i "{source}" output_file.mpg'.format(source=filename)
    subprocess.call(command, shell=True)  # a bad idea!
{% endhighlight %}

What if someone provides a file with a name like `"; rm -rf /`?  If the Python
process is running as a priviledged user, you could be in for a bad time
because it will erase your files.


What to use instead
===================

`subprocess` with `shell=False`. 

[`sh`](https://amoffat.github.io/sh/) - This may not be right in every
circumstance but it can solve the problem of interacting with the command line
in some ways. I've had trouble getting it to properly quote the variables I've
used in the past so I tend to stick with `subprocess` directly. That said, if
it works for you, then go for it!


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

The second group of dangerous functions relate to the ability for users to
craft input so that it runs arbitrary code.

Why they're useful
==================

[`exec`](https://docs.python.org/3/library/functions.html#exec) and
[`eval`](https://docs.python.org/3/library/functions.html#eval) take strings
and turn them into executable code, which can be useful, especially if you are
the one who controls the input. I've used `eval` before 
to evaluate a large dict-like string into a dictionary, as an example.


Why they're dangerous
=====================

Again, we're not sure what the user will provide in all cases. `eval()` and
`exec()` will execute whatever is given to them, so a user could combine it with
other Python functions to potentially erase all your data, expose your secret
keys, dump your database, or perform other malicious actions.

A dangerous example
===================

Related to the previous example, suppose you're `eval`ing a string that looks
like this: `"os.system('rm -rf /')  # dangerous!"`. It, too, would erase all
your files.

What to use instead
===================

It depends. If you're trying to use `eval` or `exec`, 
there's likely to be a better way to accomplish what you're trying to do. 
The functions are so broad in scope that it's a challenge to provide an
alternative for all use cases.

If you're using them to perform serialization / deserialization, it would
probably be better to use another format, such as
[`json`](https://docs.python.org/3/library/json.html) instead.

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

Pickle is great because it enables you to store state to disk. Perhaps you want
to create some pause and resume functionality and you want to store the
information outside of a database. You could do that by saving a pickle to 
disk with the current progress, for example. Alternatively, Celery used it
as the message format to send to the message brokers in earlier versions.

Why they're dangerous
=====================

Pickle, unfortunately, is prone to the same problems as `exec` and `eval`
because it enables users to craft input that executes arbitrary code on
your machine. Starting to sound familiar?

There's a number of other services that rely upon pickle to do their thing. 
One of those is `shelf`, which is another module related to serializing
data. `Celery`, a popular package used for sending
messages to queues, used pickle by default before version 3.0.18. If you're
using an older version of Celery, check and make sure you're following the
recommended security guidelines.


A dangerous example
===================

Examples are best illustrated by the linked articles so please read those
if you're interested in learning more about pickle's dangers.


What to use instead
===================

If you're trying to serialize data, you could use `json` or, if you
must, `yaml`. If you use `yaml`, please read the section below on why it has
its own set of risks.


If you must use them...
=======================

Be extra careful with your input.


Additional references
=======================

* [Arbitrary code execution with Python pickles](https://www.cs.jhu.edu/~s/musings/pickle.html)
* [Sour Pickles](https://media.blackhat.com/bh-us-11/Slaviero/BH_US_11_Slaviero_Sour_Pickles_WP.pdf)
* [Playing with Pickle Security](https://lincolnloop.com/blog/2013/mar/22/playing-pickle-security/)
* [Celery Security Guidelines](http://celery.readthedocs.org/en/latest/userguide/security.html)


PyYaml's unsafe defaults
---------------

YAML stands for `Yet Another Markup Language`, so its purpose is right in the
name. PyYaml is not in the standard library but seems to be the most popular
way of parsing YAMLs in Python so I'm including it here.


Why they're useful
==================

YAML files are useful for storing configuration or other values that should not
change much. As such, having something that can easily load and
manipulate YAML files is great. We use YAMLs often at Wiredrive for
configuration of our various services.

Why they're dangerous
=====================

Calling `yaml.load()` is the simplest way to load a YAML file but `yaml.load()`
is an unsafe operation that, you guessed it, enables maliciously crafted files
to execute arbitrary code on the host machine. 

A dangerous example
===================

Please see the linked articles if you're interested in an example as it's
a complicated exploit. It's suspectible for the same reasons as the
Rails-related YAML exploit that came out a few years ago.

What to use instead
===================

The `yaml` module has a safe way to load yaml files, which is
`yaml.safe_load()`.  It's unfortunate that the dangerous method is the simplest
and the safe method is something that you have to look up. I'm guessing they
did not want to break their backwards compatibility.

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
risks that we talked about with untrusted input above also apply here.  The
database binding provided in the Python standard library is for `sqlite3`.
There's a section in the Python docs where they talk about how to properly
escape variables. I'd recommend reading it if you're going to roll your own
database connection. Otherwise, I'd recommend using an ORM within
[Django](https://www.djangoproject.com/) or
[sqlalchemy](http://www.sqlalchemy.org/).

* [OWASP SQL Injection](https://www.owasp.org/index.php/SQL_Injection)
* [Python sqlite3 documentation](https://docs.python.org/3/library/sqlite3.html)


Information Leakage
===================

`print` and `logging` are useful but potentially risky. Ideally you will want
to make sure that anything that is being logged is written only to files that
can be read by priviledged users. If anyone can read the log file, it means
it's more likely that the logs will be leaked at some point. If you must log
sensitive information (must you?) be sure to protect them as best as you can
through access controls.

* [OWASP Information Leakage](https://www.owasp.org/index.php/Information_Leakage)

Thanks to [@goodwillbits](https://twitter.com/goodwillbits) for recommending
that I add this section.


In Conclusion
-------------

We've covered a few ways in which Python functions can be dangerous,
specifically as it relates to untrusted input from the user. There are many
other potential dangers so please do not consider this an exhaustive list.

As a reminder, if you're going to accept input from users, be careful what you
do with it.
