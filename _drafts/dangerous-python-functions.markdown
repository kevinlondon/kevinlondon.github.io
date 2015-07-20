---
layout: post
title:  "Dangerous Python Functions"
date:   2015-07-19 15:54:08
---

Some Python functions should not be used or should be used only
with great caution. The warning messages
in documentation sometimes do not fully illustrate the dangers associated
with particular methods. Let's talk about some items that should be in the 
back of your mind when working with Python. If you see some of these used
in the wild, it may not be bad, but it should mean that we give them extra
attention.

The Command Injection Series
--------------------------

The first group of dangerous Python functions, including using
[subprocess](https://docs.python.org/2/library/subprocess.html) with
`shell=True`,
[`os.system()`](https://docs.python.org/2/library/os.html#os.system), and
[`os.popen*()`](https://docs.python.org/2/library/os.html#os.popen), all
revolve around the risks associated with trusting external input and piping it
into a shell.


Why they're useful
==================

Sometimes you really need to send a command directly to the shell. If you're
interacting with command-line utilities, it can be simplest to provide
a command to Python with the Subprocess module using `subprocess.call` and
setting `shell=True`. It'll execute similar to how it would using the shell. It
can be easier to use the function than by building a list of strings as
arguments. 

`os.system` and `os.popen` have been deprecated since Python 2.6 in favor of
the subprocess module so they're less useful now. They might be useful because
of their simple API.


Why they're dangerous
======================

Unfortunately, using `shell=True` or any of the similar command-line oriented
tools in `os` such as `os.system` and the `os.popen` series, can expose you to
security risks if someone provides input that is crafted to issue different
commands to the shell. 


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

What if someone provides a file with a name like `"; rm -rf /`? 
If the Python process is running as a priviledged user, 
you could be in for a bad time because it will erase all your files.


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

* [Subprocess documentation on security implications](https://docs.python.org/2/library/subprocess.html#frequently-used-arguments)
* [OWASP Command Injection](https://www.owasp.org/index.php/Command_Injection)
* [Shellshock affects os.popen](http://security.stackexchange.com/a/68602)
* [PEP 324 - Subprocess](https://www.python.org/dev/peps/pep-0324/)


Code Injection - exec, eval
---------------------------

The second group of dangerous functions relate to the ability for users to
craft input so that it runs arbitrary code.

Why they're useful
==================

`exec` and `eval` take strings and turn them into executable code, which 
can be quite useful on some occasions, especially if you are the one who
crafts what the input values will be. I've used them in some
cases to evaluate a large dict-like string into a dictionary.

Why they're dangerous
=====================

Again, we're not sure what will be in the user's input in all cases. `eval` and
`exec` will execute whatever is given to them, so a user could combine it with
other Python functions to potentially erase all your data, expose your secret
keys, dump your database, or any other number of malicious things.

A dangerous example
===================

Related to the previous example, suppose you're `eval`ing a string that looks
like this: `"os.system('rm -rf /')  # dangerous!"`. It, too, would erase all
your files.

What to use instead
===================

It really depends, unfortunately. If you're trying to use `eval` or `exec`, 
there's likely to be a better way to accomplish what you're trying to do. 
The functions are so broad in scope that it's a challenge to provide an
alternative. 

If you're using them to perform serialization / deserialization, it would
probably be better to use another format, such as
[`json`](https://docs.python.org/3/library/json.html) instead.


If you must use them...
=======================

Again, be sure to escape your input. You can also disable the builtins. TODO.

Additional references
=======================

* [OWASP Code Injection](https://www.owasp.org/index.php/Code_Injection)
* [Eval really is dangerous](http://nedbatchelder.com/blog/201206/eval_really_is_dangerous.html)
* [Be careful with exec and eval in Python](http://lucumr.pocoo.org/2011/2/1/exec-in-python/)


Untrusted Input Part 2: Pickle and friends
------------------------------------------

Pickle is a way of serializing data to a file and restoring it from a file.
There's a number of other services that rely upon pickle to do their thing
as well. One of those is `shelf`, which is another module related to serializing
data to files. 

More importantly, `Celery`, a popular package used for sending
messages to queues, used pickle by default before version 3.0.18. If you're
using an older version of Celery, check and make sure you're following the
recommended security guidelines.


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


A dangerous example
===================

Examples are best illustrated by the linked articles so please read those
if you're interested in learning more about why pickle is insecure.


What to use instead
===================

Again, if you're trying to serialize state, you could use `json` or, if you
must, `yaml`. If you use `yaml`, please read the section below on why it, too,
is insecure.


If you must use them...
=======================

Be extra careful with your input. TODO.


Additional references
=======================

* [Arbitrary code execution with Python pickles](https://www.cs.jhu.edu/~s/musings/pickle.html)
* [Playing with Pickle Security](https://lincolnloop.com/blog/2013/mar/22/playing-pickle-security/)
* [Celery Security Guidelines](http://celery.readthedocs.org/en/latest/userguide/security.html)


PyYaml's unsafe defaults
---------------

* PyYaml's `yaml.load` 

Why they're useful
==================

Why they're dangerous
=====================

A dangerous example
===================

What to use instead
===================

If you must use them...
=======================

Additional references
=======================

* [Ned Batchelder - War is Peace](http://nedbatchelder.com/blog/201302/war_is_peace.html)


Additional dangers
------------------

SQL Injection
=============


* [OWASP SQL Injection](https://www.owasp.org/index.php/SQL_Injection)
* [Python sqlite3 documentation](https://docs.python.org/3/library/sqlite3.html)


Mutable Arguments
=================

This one is not actually a security hole but rather a thing to be aware of.


Information Leakage
===================

Print and logging.
