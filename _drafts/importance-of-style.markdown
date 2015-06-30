How this applies to Software Engineering
----------------------------------------

I think the same principles apply to software engineering. This is a bit more
of a stretch, so bear with me.

In Thinking Fast and Slow, Kahneman mentions that using a less contrasty
font means that the reader has to spend more cognitive energy to read and
understand the text. I think that this means that we could apply the same
kind of thinking to stylistic consistency. 

[FACT CHECK]

If we keep code stylistically consistent, then it allows us to use more of the
System 1 thinking - which is good at processing information quickly and
subconsciously. The upside of this is readability. It's much simpler to
understand what code is doing if it all kind of looks the same because the form
will get out of the way for the most part.  I think this is what makes thinks
like Pep8 and gofmt so great. 



Pycon as well. In it, he says that a foolish emphasis on style guidelines can
get in the way. We want to 'pep8' everything as opposed to actually reading it
and making sure it does what it's supposed to do. 

One of my coworkers, Zach, was doing a refactoring in our tests last month.  We
were also simultaneously evaluating automatic code formatting tools (in this
case, yapf). I suggested he use one to help speed up his process and he wisely
said no. He said that the fact that the modules were not pep8-compliant meant
that there was more that could be done to improve them. He was absolutely right.
