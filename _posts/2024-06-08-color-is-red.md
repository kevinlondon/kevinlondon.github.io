---
layout: post
title: In Python, Rose == 'Red', Violet is not 'Blue'
date: 2024-06-08 09:57:10 -07:00
---

I came across a bit of Python code that checked if a color was in a list like this:

{% highlight python %}
if color is 'red' or color is 'blue':
do_something()
{% endhighlight %}

It felt wrong. In Python, we shouldn't be able to check if a string `is` another
string, since that's checking their references. I opened a Python interpreter:

{% highlight python %}

> > > color = 'red'
> > > color is 'red'
> > > True
> > > {% endhighlight %}

That feels like it shouldn't work! After research, I came across
a StackOverflow question that talked about this and it got me
interested. I tweeted:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a
href="https://twitter.com/hashtag/Python?src=hash">#Python</a>
trivia<br>&gt;&gt;&gt; &#39;red&#39; is &#39;red&#39;<br>True<br>&gt;&gt;&gt;
color = &#39;&#39;.join([&#39;r&#39;, &#39;e&#39;, &#39;d&#39;])<br>&gt;&gt;&gt;
color<br>&#39;red&#39;<br>&gt;&gt;&gt; color is
&#39;red&#39;<br>False<br>&gt;&gt;&gt; color == &#39;red&#39;<br>True</p>&mdash;
Kevin London (@kevin_london) <a
href="https://twitter.com/kevin_london/status/872519943530598400">June 7,
2017</a></blockquote> <script async src="//platform.twitter.com/widgets.js"
charset="utf-8"></script>

Why does it work this way? What's Python doing under the hood?

\*\*[Editor's Note: This blog post is originally from 2017, and I didn't finish it until now.
It's Python 2-centric, though I still think it's interesting!]\*\*

## What's Python Doing?

The simplest answer to this is that the `is` comparison checks the unique IDs of
the references to those pointers.
In other words,
{% highlight python %}color is 'red'{% endhighlight %}
is checking if
{% highlight python %} id(color) == id(red) {% endhighlight %}.

Here's what the above scenario looks like in an interpreter:

{% highlight python %}

> > > id('red')
> > > 4397469120
> > > id(color)
> > > 4397468952
> > > id('red') == id('red')
> > > True
> > > id(color) == id('red')
> > > False
> > > {% endhighlight %}

The `color` variable is the constructed
result of joining a list. Even though the values are the same, the reference
that the variable's pointing to differs from the string literal of `'red'`
constructed earlier.

That explains the scenario above. We're comparing the IDs of each and, since the
reference to `'red'` is different than the reference to `color`, we get a `False`
value returned.

## String Interning and How it Works

String interning is a method of storing only one copy of each distinct string
value, which must be immutable. Interning is done to optimize memory usage and
speed up comparisons
(see more [here](https://stackoverflow.com/questions/15541404/python-string-interning)).

In Python 2, string interning is global. In Python 3, the `intern` call lives
in the `sys` module. Coming back to our example, using Python 3:

{% highlight python %}

> > > color is 'red'
> > > False
> > > import sys
> > > interned_color = sys.intern(color)
> > > interned_color
> > > 'red'
> > > interned_color is 'red'
> > > True

{% endhighlight %}

Adrien Guillo wrote an [excellent
explanation](http://guilload.com/python-string-interning/) on how Python handles
string interning. The short version is that strings of length 0 and 1 are all
interned, and the rest are interned at compile time.

As such, the IDs of the two items are different since one was created (interned) at
compile time and the other at runtime.

## More Complications

Why does comparing sometimes yield a different result in a script as compared to an interpreter?
Here's a few interesting discussions:

- [Why does comparing strings in Python using either '==' or 'is' sometimes produce different results?](https://stackoverflow.com/questions/1504717/why-does-comparing-strings-in-python-using-either-or-is-sometimes-produce)
- [Why does id() == id() and id() is id() produce different results in CPython?](https://stackoverflow.com/questions/3877230/why-does-id-id-and-id-id-in-cpython)

## Deeper Down the Rabbit Hole

Now here's an example that really bends my brain.

{% highlight python %}

> > > id('red'), id('red')
> > > (4397469008, 4397469008)
> > > id(id('red')), id(id('red'))
> > > (4394823536, 4394823536)
> > > id('red') is id('red')
> > > False

{% endhighlight %}

If the IDs are the same, then why does the id comparison fail? What's different
about this? This discrepancy arises because the `id()` function returns a new
integer object each time it is called, even if the integer values are the same.

## It all leads to `dis`

To truly understand what’s happening under the hood, we need to look at the
disassembled bytecode. The `dis` module can show us how Python translates our code
into lower-level instructions.

Here’s a good read on this topic: [Introduction to the Python Interpreter](http://akaptur.com/blog/2013/11/17/introduction-to-the-python-interpreter-3/).

Finally, here’s an additional resource on string comparison in Python: [String comparison in Python: '==' vs 'is'](https://stackoverflow.com/questions/2988017/string-comparison-in-python-is-vs).

## Conclusion

Understanding the nuances of string comparison and interning in Python can be
tricky, but it’s essential for writing efficient and bug-free code.
The `is` operator should generally be avoided for string comparison because it checks for
object identity, not equality. Instead, use `==` to compare string values.

By learning how Python handles strings, you can write more efficient code and avoid subtle bugs.

Thanks for reading, and I hope this deep dive into Python string interning was enlightening!
