---
isDraft: true
title: Prioritizing tech debt vs features
---

A colleague asked me in a one-on-one how we think about technical debt and where to prioritize it relative to building out new functionality. How do we balance these large efforts? Here's my perspective.

Perhaps controversially, I don't like to pitch tech debt fixes as discrete
tasks. It's super hard to get the business to buy in on spending an unknown
amount of time delivering something without a concrete deliverable. 

For example, if we say a significant rewrite or refactor might take a month, there's a chance we've underestimated and it actually takes 2-3 months. That's a significant underestimation, but there are two factors at play:
1. The "90-90 rule" - the first 90% of the code takes 90% of the time, the remaining 10% takes the other 90%
2. We're historically bad at estimating complex refactoring tasks

If it takes months, the business will understandably be upset if it doesn't ship something meaningful!

Getting such a rewrite approved can be hard unless it's tied to a concrete business deliverable - for example, "this refactor will enable us to support X initiative or long-standing feature request that we can't otherwise implement." Which brings me to my second point: rarely should we pitch technical debt allocations in isolation from feature work.


Perhaps controversially, I don't like to pitch tech debt fixes as a discrete
task. It's super hard to get the business to buy in on spending an unknown
amount of time delivering something without a concrete deliverable. 

For example,
if we say a significant rewrite or refactor might take a month, there's a chance we've underestimated and it actually takes about 2-3 months. That's a significant underestimation, but there's two things working here: 1 - the idea that there's two parts to a project, the first 90 percent and the second 90 percent, and 2 - that we're really bad at estimating tasks.

Getting such a rewrite can be hard to resource unless it's couched in a discrete business deliverable, such as this will allow us to support this big initiative or long-standing feature request which we can't otherwise do. Which brings me to my second point - rarely should we pitch technical debt allocations without it being included as part of something we build. 

Further, when we build that thing, it's preferable to build it in the Kent Beck style - make the change you want easy (warning, this may be hard), then make the easy change.

## What if you really need to manage some kind of technical debt?

A few more things to consider. In a few years, supposedly, we'll get "powerful AIs" for some definition of that. Some folks think 2027 or so. Is what you're working on so pressing that we need to invest time and energy into it now, before 2027? If so, I encourage you to do it. If not, maybe it can wait. Refactoring and addressing technical debt seems like one of the best uses for an LLM to me. It's already got a working solution, often tests may pre-exist for it. It will still of course need a wise steward to make sure that it outputs something reasonable.

OK, so you've established that you really do need to do it. In that case, you *still* need to make a strong business pitch that what you're doing is reasonable and worth investing in over something else. If you can do that, great!

So this is a pretty long-winded way of capturing my thoughts on it. But I think, in summary, we want to avoid rewrites as much as possible.