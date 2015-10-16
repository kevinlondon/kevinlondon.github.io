Talk ideas

Finding Insecure Code with Bandit
---------------------------------

Why is security important? Examples, stories.

You've probably heard of some companies getting hacked recently. Here's
just a few from this year.

1. US Office of Personnel Management - 21.5 million goverment records, including background check information.
2. Ashley Madison - 25 million men and 5 million female bots had their personal information exposed.
3. Anthem - 79 million people had their information exposed, including social security numbers.
4. Jeep Cherokee - At Blackhat, they showed that you could remote in through
the entertainment system and shut down a car on the freeway. 
5. and the IRS had 100k accounts hacked.

I think the scariest thing is how common place it's become.
As a software developer, sometimes I feel like we're helpless to do anything
against this. What can you do to protect yourself against a nation state?
I feel like we have to do as much as we can to prevent shooting ourselves
in the foot or becoming another headline.

We have a few tools in our arsenal for fighting against hacks.

1. Beware input of any kind. We'll cover some examples later.

2. Keep it simple. Many software bugs and security holes from come complexity.
The more branches in the code, the more opportunities for problems. If we're
doing something complex, it has a good shot at introducing bugs. At the least,
there have been studies done before showing that lines of code correlate to 
new bugs. They will not always be security bugs, but they may be.

3. Code reviews. Peers are great at finding problems in code.
"Code review is probably the single-most effective technique for identifying security flaws."
But that's a talk for another day, I think. Feel free to come up afterward
and we can always talk about code reviews.

4. Static code analysis. Usually helpful to point you in the direction of code 
that has potential flaws. We have some options here, pyflakes, pylint, etc.
But we didn't have a lot of great options for security analysis.
Checkmarx has a commercial tool, Whitehat is working on one.
So, a few months ago, the security team at OpenStack did the 
same research and eventually built and open sourced their own. Bandit.


Let's talk about Bandit, then we'll cover what it is designed to check for,
and we'll circle back to some problems related to it.

Bandit is a tool that you run from the command line. It looks through
your code for a set of vulnerabilities and reports and problems that might come
up. For example, here's a set of output from when I ran it on an old project.

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


Let's quickly cover a few examples of what it looks for.

Command Injection

- subprocess.call() / os.system(), etc

Salt by default in older versions would call
using shell=True, it's been fixed. I had an application structured around
running local commands. Could have accidentally rm -rf'ed ourselves.


Code Injection

- exec / eval

I haven't used these much. I have used them in the past for evaluating strings
into JSON so I can read through logs that were printed as strings. Basically
they enable shell execution too.


Pickle / marshal

- pickle.load() in all forms

Examples of where it's used:
- Django before 1.6 if the secret key gets out can enable injection. Secret keys
can get accidentally commited, so be careful! I did a search on Github for
SECRET_KEYS and found a number of projects that had checked in their secret keys.
- Pylons, Pyramid, Flask also susceptible if you have the secret key.
- Celery before 3.0.18 used pickle. If you had access to the queue, you could put
in bogus data to enable remote shell access. Pretty rough.


Yaml 

- PyYaml's load vs safe_load

`safe_load` is not the default. Use that instead of `load`.


XML expansion

- Just found out about this one actually.
- Billion Laughs exploit. http://stackoverflow.com/questions/3451203/billion-laughs-dos-attack
- defusedxml


Basically XML can be self-referential and expand into something called an XML bomb.
One famous form of this is the "billion laughs" exploit, which we'll go over briefly.

Slide for this.


assert - surprisingly.

ssl

urllib with files.

mktemp / tmp

using md5

using random




So Bandit checks for all of these things, plus a few others. They may not
necessarily always be problems in your code, but you can use it as a kind
of sanity check. You could also add it to your CI process so that every time
code is checked in, it gets run.

Talk more about how Bandit works, I think.

Finally, you can add your own rules and configure what you want it to check.

In Python, there's a number of functions that have serious side effects.
They're covered in documentation, but often it's easy to miss one.
It's important to get them all right the first time, because often you won't have
a second shot at it and, if you find out after it's been deployed, it will
usually be because someone has already used it as a way to get into your system. 
It can sometimes even
be easier to accidentally introduce a vulnerability, so we have to be dilligent
about preventing them from getting into our code to begin with.

We can build better code, and tools like Bandit are one way to help us get there.
Let's do our best to avoid becoming another headline.

Thanks.
