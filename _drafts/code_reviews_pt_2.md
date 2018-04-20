
This is a collection of thoughts and things I thought I'd written down in the
past and somehow hadn't. In some cases, I will repeat myself in the earlier code
review post. In others, it's new thinking. Still, given that it's been three
years, I think it's ok if I retread some of the same ground as long as I provide
you with some new information or ways to think about things.

    * The value of code reviews, maybe.

I've been doing code reviews for four years or so now and I love them. I think
I've found them to be the single most valuable tool for getting better at
writing and thinking about code generally.

I've always found feedback useful,
and I view giving and receiving feedback as a kind of gift generally. I remember
inadvertently making someone depressed in high school when we peer-reviewed each
other's papers. I remember people racting to notes that I'd given them on
anything like a resume or whatever. People don't generally expect feedback on
things but it is important for growth.

# Dos and Don'ts

## Don't

* Focus on coding style

In the earlier post, I had a full section on style and I stand by that. In this
case, I'm talking specifically about language stylistic guidelines. For example,
how many spaces do we want between methods? How many spaces between arguments?
Where do our braces live?

These things do not belong in a code review. If you find yourself regularly
discussing coding style items, then I recommend that you codify the standards
you and your team expect to see into a tool and run that tool on every
submission of code. I find that this is a great way to reduce the noise of
a code review and reduce ambiguity. It's much better to have a tool tell me that
code isn't stylistically consistent than to hear that from a peer.

* No just
* No why
* No shaming

## Do

* Offer context on your own code in the review

In the initial post, I mentioned that I like to go through and review my own
code prior to committing it. I still like to do that. In addition to that,
something I've found useful is to pre-comment my CR and offer context.

Context provides value at multiple levels. The best context you can offer is why
you're making the change, at a broad level, as well as generally what the code
review covers. For example, mentioning that the code review includes adding an
API endpoint, functional tests, and rearchitecting module X to do Y instead of Z.
These provide an entry point for people that are new to your code.

After all, if
you've just submitted something for review, it's likely that you've been living
in it for the last few days. Whoever is going to read your code is coming in
fresh and doesn't have all that context loaded into their head.

In addition, I find it helpful to review my own code as if I were a reviewer and
explicitly mention why I made a particular choice or what happened to lead to
a choice in the review. Sometimes I will mention alternatives that I'd
considered in making the change.

If I find myself wanting to explain what the
code does with a comment, that's a good sign that the code I've written is
misleading and could be rewritten in a clearer and easier to understand way.

    * Comment on your own code review. Focus on why the change was needed, not what
        the code does. Comments about what the code does are better as code comments
        or, better yet, as code that does not need comments.

* Use code comments judiciously

Although some code review comments are helpful to offer to others (and maybe
yourself if you need to do forensics in the future), comments in the code should
only be included if they're necessary. Instead of commenting code heavily, often
times I've found it's preferable to rewrite the code such that the comments are
not necessary.

    * Commented code should be rewritten, generally, to make it at the level that
        you'd put a comment.

* Baby mind
* Do multiple passes
* Time-box your efforts
* Security!!

### TODO: Example
