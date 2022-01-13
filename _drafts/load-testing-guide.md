---
layout: post
title: Load Testing Guide:
date: 2022-01-13 20:00:01.000000000 -07:00
---

I once designed a service to handle hundreds of thousands of requests per
second with a tight latency threshold. I had theorized how to build such
a system, and carefully designed for it during my design process. I had never
built something that would actually need to handle that
level of traffic. How would I know if it could sustain those levels of traffic?

We needed to simulate the projected traffic against the service to ensure it
could satisfy its requirements, a process known as load testing. We built the
first version of the service, prepared a comprehensive load test, alerted
everyone that we were going to run it, and started the test.

We dialed up the load testing traffic to the service. 5%... 10%... 15%...
of its projected traffic. No issue. At 20%, the service
completely fell over. We saw skyrocketing latency and dramtically increased
errors. We pulled the plug on the test run and evaluated what to do next.

This can sound like a nightmare scenario. In a way, it's ideal.
We built and ran the load test to tell us just this kind of
information. If the service can't sustain its required load, I'd much rather find
that out under a controlled circumstance than when
customers go to use it at that level and can't.

There's a line I think about from [The Zen of Python](https://www.python.org/dev/peps/pep-0020/):

> In the face of ambiguity, resist the temptation to guess.

Load testing is one way to reduce ambiguity. It helps us avoid guessing if the
service will meet our expectations. I'd like to share what we learned along the
way while building out our load tests and optimizing this service.

## Background

### Working Backwards from the Customer

I've been at Amazon for nearly four years. One lesson I've taken from it is
to [work backwards from the customer](https://www.amazon.jobs/en/principles).
We're running these load tests because we want to make sure the service is ready
to handle the load when we launch it and incorporate it in the production
infrastructure.
Perhaps we
want to ensure our service is ready for a big initial launch, a high-profile
event such as a big event or holiday sales spike, projected load X weeks from
its launch, or to handle a large-scale data backfill. In any case, we can't
assume that our service will work without first validating that it does.

To work backwards from the customer, evaluate what your target is for the
service you're working on. We can then make some assumptions about the traffic
patterns for that event and project what load we'll need to model on
a per-service and even per-API basis.

Hopefully you already have done this exercise during the design process. If not,
there's no better time than now!

### A Sample Application

For our discussion, we'll consider load testing a hypothetical online food
ordering website. Let's assume it's a small service we're adding to
a pre-existing food ordering platform, and we want to make sure it'll be ready
to handle the projected load when we launch it. This service, which we'll call
MenuService, gives menus to customers and allows them to browse what food they
can order from the restaurant.

Let's assume we have the following APIs for our MenuService:
1. `GetMenusForRestaurant`: Returns menus for the restaurant. This could include
   breakfast, lunch, etc, and time ranges for the menus.
2. `GetMenuSummary`: Returns all the items on the menu, their descriptions, and prices.
3. `GetMenuItem`: Returns a single menu item and any pictures associated with it.

### Preparing for Launch

We're launching MenuService in August. The business is nervous about launching
before Halloween and would like assurance that it is ready for the
traffic spike. In the US, Halloween is one of the [biggest online ordering
days](https://get.doordash.com/en-us/blog/busiest-days-for-food-delivery), with
volume significantly higher than usual.

Let's say, on a typical day, we receive 1 million orders.
These orders likely aren't evenly distributed across the day. Perhaps we have
a US-based service and 80% of our traffic falls between 3 PM Pacific (6 PM
Eastern) and 9 PM Pacific. That means our typical order volume is 80%
* 1 million / 6 hours, or 133K orders per hour. Our new service will
need to handle about 40 orders per second on a typical day.

Let's assume Halloween order volumes are 5x the average day, which gets us
to about 200 orders per second. How do we provide assurance to the business that
the service can easily handle that order volume.

### Translating Projections into API Traffic
We have an assumption about how much business-based traffic we'll have. What
about our projected load? How does the order volume translate to service traffic?

We can make some more assumptions and / or base it on pre-existing metrics. If
we say that a customer will typically place an order 40% of the time they
browse, and the average customer to conversion ratio is something like 20:1, we
can use that for modelling API traffic.

We should also carefully capture our logic here as this will be important for
evaluating how successful we were.

In our example, let's consider the typical call flows for a customer browsing
the ordering site.

Possible customer scenarios to model:

1. Customer chooses a restaurant they like and loads the menu. They don't see
   anything they like and close the site.
2. Customer chooses a restaurant, adds a few items to cart, and again changes
   their mind and stops browsing.
3. Customer tries to check out and their credit card is rejected.
4. Customer adds a few items and successfully places their order.

### Traffic Projections

Given our three APIs defined above (`GetMenusForRestaurant`, `GetMenuSummary`,
`GetMenuItem`), we can model traffic for these scenarios.

Let's make a few more assumptions about overall traffic. From our numbers
before, we project there will be 200 orders per second at projected peak. If we
assume that there's a 20:1 conversion, that means there's approximately 4000
customers active on the site at any time.

From these assumptions, we can derive traffic projections on a per-API basis.

### GetMenusForRestaurant Example Projections
All prospective customers hit this API at least once per restaurant they
browse. If we have 4000 customers on the site at any given time, and we assume
a customer will load a menu once per minute, we only need to support ~70
requests per second (4000 / 60) request for this API.

We can go through this exercise for all APIs and provide traffic projections.
These traffic projects will help inform how we build our load tests as well.

### Defining SLAs
* How many errors are acceptable? Is there a percentage? An absolute threshold?
* What latency is acceptable for your service? At what percentile? Is a p99 100
  ms response good or bad for your service?

#### Ensuring Alarm Coverage
After you've defined your thresholds, it's time to establish your alarm
threshold.
A good start is to look at your SLA and see how it can be enforced to let you
know if something is going wrong, and to evaluate how quickly you'd like to know
that.

### Instrumenting Code
* Profile your code. You should be able to tell what's slow for each primary
  point along your chain. If something is slow, why is it slow? Is it because of
  network calls? Hot keys in your database due to the access patterns? We should
  be able to answer by the profiling we implement here. There's nothing worse
  than running a load test and coming back with a failing result but
  inconclusive data on what went wrong. But if it happens, it exposes a valuable
  opportunity to improve your monitoring presence!

## Load Testing

### Configuring the Load Test
* Model the assumptions we laid out before
* Configure a gradual increase until it reaches the maximum projected load.
  Ideally this is also informed by the assumptions made earlier. For example,
  maybe orders on Halloween are not immediately at 100% load, but reach that
  state after about an hour. This can be a good starting point for modelling how
  long your ramp-up should take.
* Go where your customers are. Your load testing run source should try to
  emulate your customers as much as possible. We're trying to model how slow the
  experience will be from their perspective. Cheating by putting your load test
  source in or near your service leads to an inaccurate picture of the latency.
  For example, what if the public facing load balance or API Gateway is causing
  latency which we don't see until we start to test with actual customers?
* Setting up the world.

### Before Running Your Test
* Clue in your dependencies, including other services or AWS
* Communicate to your team, and any interested parties, the timelines for your
  test, what conditions you'll stop under, and any other precautions you're
  taking. We should aim to inspire confidence with this communication, and build
  trust with the others.

### Running the Load Test
* Be sure to stop if you find that the service is tipping over, or if your
  dependencies are starting to see escalated error rates.

## Tuning

### Capturing Results
* Gather a graph of all the outcomes, ideally in a commonly reproducible way.
  It's great if you can find your analysis and refer to back-history.

### Digging into Your Results
* Look at your graphs and performance
* Did you meet your goals? If not, what's required to meet the next set of goals?
* How long did it take your service to scale? When adding capacity, did it take
  1 minute, 5, or 50?

### Making Improvements
* Make small, incremental changes. Check some small representative run to evaluate.
  Did it get better? Did it get worse?

### Preventing Regressions
It can be great to have a small scale load test baked into your pipeline to
ensure that your service can continue to meet performance guarantees before
deploying to customers.

## It Takes Time

Load testing takes time. It takes time to understand your customers, build out
tests that simulate their behavior (or at least approximate it), run these
tests, and optimize so that they have a good experience.

Going back to the original story at the start of this exercise, I'd like to
share that we did (eventually) optimize enough of the application, its runtime,
the hosts, networking, and other variables to meet the required traffic levels.
It took investigation, engineering, and support from a talented of software devs.

Regardless of the size of service you're looking to launch, I hope you'll find
at least a few of these practices helpful for ensuring that your service can
meet its requirement and thrill your customers.
