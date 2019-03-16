---
layout: post
title: Don't Just Bake Me a Cake
date: 2019-03-16 10:35:08
---
Let's talk about baking cakes. Cakes are
great! Not everyone likes sweets but once in a while a cake can taste great.
Carrot, apple, boysenberry. Dang, now I want to eat cake.

In design, it can be frustrating to receive a cake. What do
I mean by that? A baked cake can't change. If I make
a carrot cake for your birthday only to find out you prefer Devil's Food... well,
nothing we can do about that now.  If I finish writing a design to solve some
problem, only to find when we're
reviewing the design that one of the central design decisions doesn't make
sense, it's too late.

Instead, I find it more effective to include examples of the forks in the road
and alternatives. Helping your audience chart the path you've taken as you've
investigated the blind alleys can be
helpful for driving alignment on a design.

In some ways, it's the old adage of "show your work". If you're like me, you've
had it drilled into your head from years of math classes. The instructor wanted
to see the work so they could help correct mistakes made in the
fundamental assumptions. It's much the same way in engineering.

### In Practice

As an example, I once worked on a design for rearchitecting engineering
infrastructure.
I had a blank check. I could choose any tools. That freedom had
its own cost. Dealing with ambiguity about how to build [devops from
scratch](https://www.kevinlondon.com/2016/09/19/devops-from-scratch-pt-1.html)
felt tough. And overwhelming.

As I worked through the ambiguous parts of the design, I made sure to get
incremental buy-in, both on the goal and on the
individual decisions along the way. For example, how would we manage standing up
servers?

Well, we could use Ansible, which has a set of AWS modules, CloudFormation, or
any other number of tools.


#### How It Looks

In a design document, I would write something like this:

> The infrastructure pipeline will use Terraform to create, manage, and update
> servers with a manual review and approval step after generating the planned
> diff.

And, in an appendix, a comparison like:

##### Tooling Alternatives

**Terraform**

Pros:
* Explains planned execution before making changes
* Infrastructure built via code
* Supports many cloud platforms, including Google Cloud and Azure
* Active and sizable developer community
* Terraform can store shared state in AWS S3

Cons:
*  Terraform cannot alter existing infrastructure and thus
    needs a migration plan and new accounts.
* No current way to import existing resources; will need to generate from
    scratch.
* Some advanced features only available through subscription
* . . .

This design favors Terraform because...


**Ansible**

Pros:
* Can manage servers and provision them after creation
* Python-based tooling; can customize if needed
* . . .

Cons:
* No real roll-back functionality
* . . .

**CloudFormation**

Pros:
* AWS-supported product
* Runs as a service rather than a tool on a developer's desktop
* . . .

Cons:
* Only supported in AWS
* Required using a JSON / YML generator such as X or Y
* No clear way to do iteration over resources

I'd include some context as well, such as rationale for final choices
and the trade-offs we're making, which I've omitted here for the
sake of brevity.

### Showing Your Work

Let's talk about short term and long term horizons on why this matters.

For the short term, it helps drive alignment on the immediate decision. Have
you ever given a presentation and had someone, after you've
completed, say "Have you looked at X or Y?". Showing your work in the document
will help people know that you've done your research. If
you researched something then you'll wind up talking about it anyway,
so you may as well document it.

Also, you might've
missed something! One of those alternatives may have something valuable
that you didn't consider. For example, something I appreciate more now about
CloudFormation is that it will roll back for you on failure. It's
nice to have that option.

In the long term, I can't count the number of times I've looked at a service and
asked "Why is this built this way?". Having a document to help understand it
helps with archaelogical
discoveries. Like it or not, most of us will not be around
for the entire life of project. At some point, we'll need to introduce the
service to someone else
 or transition it to the next maintainers. Providing
a historical narrative of why you've built it in a certain way can be helpful.

Lastly, the constraints you worked with at the start of a design may change. For
example, some service may support a max of 100 transactions per second and,
years later, support greater throughput (see: [AWS
S3](https://aws.amazon.com/about-aws/whats-new/2018/07/amazon-s3-announces-increased-request-rate-performance/)).

PS: This works for code reviews too!
Introducing the code review with details about the context and alternatives
I considered can be helpful.

So, in conclusion, don't just bake a cake. Chart the path from A to Z. Show the
work. Your audience will appreciate it and they may be able to help you better
achieve your goals if they know what you considered.
