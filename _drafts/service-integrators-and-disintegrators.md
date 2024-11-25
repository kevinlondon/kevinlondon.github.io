---
layout: post
title: Service Integrators and Disintegrators
date: 2022-01-13 20:00:01.000000000 -07:00
---

When building out a service or group of services, it's rare that we get it
exactly right. Or, even if we do, the facts and assumptions that led us to
build it that way may change. Maybe the service becomes more popular than we
anticipated. Services last longer than we expect or business needs morph it
into something other than our original vision. Perhaps the service grows more
than it had been intended to handle or support. We start to look at whether the
service should be split up. If we decide to that, how do we decide into which
bucket functionality goes? How small or large should our services be?

One way to make this decision is through considering service granularity
integrators and disintegrators. Integrators are factors that point towards code
or functionality that should live together. Disintegrators point us to
boundaries and cut points. In this post, we'll examine service and
disintegrators which we can use to help make these kinds of decisions.

This post and its ideas are a partial re-cap of a chapter from
[Software Architecture: the Hard Parts](https://www.amazon.com/Software-Architecture-Trade-Off-Distributed-Architectures/dp/1492086894)
by Neal Ford, Mark Richards, Pramod Sadalage, and Zhamak Dehghani. They explore
the topic of breaking down a monolith into component parts over the course of
the book.

## Service Disintegrators

Service Disintegrators are most commonly what we think of when we look at
a service. We see the places we'd like to cut them apart. It can be tempting to
start hacking off known bits that seem completely disparate from the rest of the
stack and making them their own service.

### Service Scope and Function
> Is the service doing too many unrelated things?


### Code Volatility
> Are changes isolated to only one part of the service?

### Scalability and Throughput
> Do parts of the service need to scale differently?

### Fault Tolerance
> Are there errors that cause critical functions to fail within the service?

### Security
> Do some parts of the service need higher security levels than others?

### Extensibility
> Is the service always extending to add new contexts?

## Service Integrators

When breaking apart services, something we can overlook is what attributes
we should use to keep the service together.

### Database Transactions
> Is an ACID transaction required between separate services?

### Workflow and Choreography
> Do services need to talk to one another?

### Shared Code
How much code is shared between the various components? It may make sense to
keep services together because they have shared code affinity.

### Data Relationships
Perhaps the split services rely heavily on shared underlying data. Perhaps it
can't be split across services and it's better to keep them together after all.

