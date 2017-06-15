---
layout: post
title: In Python, Rose == 'Red', Violet is not 'Blue'
date: 2017-06-14 22:17:10
---

I came across a bit of Python code that checked if a color was in a list this way:

{% highlight python %}
if color is 'red' or color is 'blue':
    do_something()
{% endhighlight %}

It felt wrong. In Python, we shouldn't be able to check if a color `is` another
color, since that's checking references. I opened an interpreter:

{% highlight python %}
>>> color = 'red'
>>> color is 'red'
True
{% endhighlight %}

That feels like it shouldn't work. After some more research, I came across
a StackOverflow question that talked about this some more and it got me
interested in it. I tweeted out the following:

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

## What's Python Doing?

The simplest answer to this is that the `is` comparison checks the unique IDs of
the references to those pointers. In other words, {% highlight python %}color is 'red'{% endhighlight %} is checking
if {% highlight python %} id(color) == id(red) {% endhighlight %}.

Here's what the above scenario looks like in an interpreter:

{% highlight python %}
>>> id('red')
4397469120
>>> id(color)
4397468952
>>> id('red') == id('red')
True
>>> id(color) == id('red')
False
{% endhighlight %}

The `color` variable is the constructed
result of joining a list. Even though the values are the same, the reference
that the variable's pointing to differs from the string literal of `'red'`
constructed earlier.

That explains the scenario above. We're comparing the IDs of each and, since the
reference to `'red'` is different than the reference to `color`, we get a False
value returned.


## String Interning and How it Works

https://stackoverflow.com/questions/15541404/python-string-interning

In Python 2, this is a global method while in Python 3, the intern call lives
on the sys module.

{% highlight python %}
>>> color is 'red'
False
>>> import sys
>>> interned_color = sys.intern(color)
>>> interned_color
'red'
>>> interned_color is 'red'
True
{% endhighlight %}

Adrien Guillo wrote an [excellent
explanation](http://guilload.com/python-string-interning/) on how Python handles
string interning.  The short version is that strings of length 0 and 1 are all
interned, and the rest are interned at compile time. It leaves an interpreter in
a weird spot. What gets interned and what doesn't?


## More Complications

Why does comparing sometimes yield a different result in a script as compared to an interpreter?
https://stackoverflow.com/questions/1504717/why-does-comparing-strings-in-python-using-either-or-is-sometimes-produce

https://stackoverflow.com/questions/3877230/why-does-id-id-and-id-id-in-cpython

## Deeper Down the Rabbit Hole

Now here's an example that really bends my brain.

{% highlight python %}
>>> id('red'), id('red')
(4397469008, 4397469008)
>>> id(id('red')), id(id('red'))
(4394823536, 4394823536)
>>> id('red') is id('red')
False
{% endhighlight %}

If the IDs are the same, then why does the id comparison fail? What's different
about this?

String comparison in Python: https://stackoverflow.com/questions/2988017/string-comparison-in-python-is-vs
