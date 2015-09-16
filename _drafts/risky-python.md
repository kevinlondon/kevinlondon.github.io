Talk ideas

Never Trust Input
-----------------

Why is security important? Examples, stories.

Have you heard about the recent hacks? Ashley Madison. US Office of
Personnel Management. Anthem. It's constant. In fact, it's so constant
that it's easy to become blase about them. Ultimately, hacking usually comes 
down to a couple of things and we have to do as much as we can to prevent 
shooting ourselves in the foot down the line or becoming a headline.

So, if we can't prevent hacks completely, what are our options? There's so many
things that can go wrong, where do we start? I'd like to discuss some vulnerabilities
around input that can show up in unexpected ways and how you can be
proactive in defending yourself against the vulnerabilities.

In Python, there's a number of functions that have serious side effects.
They're covered in documentation, but often it's easy to miss one.
It's important to get them all right the first time, because often you won't have
a second shot at it and, if you find out after it's been deployed, it will
usually be because someone has already used it as a way to get into your system. 
It can sometimes even
be easier to accidentally introduce a vulnerability, so we have to be dilligent
about preventing them from getting into our code to begin with.

Today, we're going to cover untrusted input. What's untrusted input? Well,
essentially *any* input. If you're getting it from a user, it's untrusted.
If you're getting it from yourself, it might also be untrusted. 

There's a few primary categories of untrusted input that we'll cover today
and then we'll talk about some ways to protect yourself.


Command Injection

- subprocess.call() / os.system(), etc

Examples of where this used: Salt by default in older versions would call
using shell=True, it's been fixed. I had an application structured around
running local commands. Could have accidentally rm -rf'ed ourselves.


Code Injection

- exec / eval

I haven't used these much. I have used them in the past for evaluating strings
into JSON so I can read through logs that were printed as strings. Basically
they enable shell execution too.


Pickle

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


Ways to Combat - 5 min

So, there's all these problems. We have to manually track them, we have to 
make sure we're doing the right things when we write code that involves them.
How do we protect ourselves moving forward?

1. Whenever you're accepting user input or loading settings using one
of the vulnerable modules above, beware.

2. Keep it simple. Many software bugs and security holes from come complexity.
Studies have been done that show that the best metric for finding the number of
bugs is number of lines of code in a codebase.

3. Bandit - open source tool created by OpenStack. Install it in CI! It'll give
you some false positives but that's better than nothing. Show example.

4. Code reviews. 

5. Check your third party packages.

Writing secure code constant battle. There will always be new holes.
Given prevalence of recent hacking attempts, we have to do a better job.
