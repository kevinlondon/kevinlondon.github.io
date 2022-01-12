---
layout: post
title: Load Testing Guide:
date: 2022-01-13 20:00:01.000000000 -07:00
---

> In the face of ambiguity, resist the temptation to guess.
-- pep8

Brief story about service failing to reach scale and instead hitting 20% before
experiencing massive errors

Going to go over how, and why.

### A Sample Application

For example, consider we have an online ordering application for food.

### Working Backwards from the Customer

I've been at Amazon for nearly four years. One lesson I've taken from Amazon is
to work backwards from the customer. This means, what are the reasons we're load
testing? What are we trying to validate or model with our load tests? Perhaps we
want to ensure our service is ready for a big initial launch, a [high-profile
event] such as a big event or holiday sales spike, projected load X weeks from
now, or a large-scale backfill. In any case, we can't assume that our service
will work without first validating that it does.

To work backwards from the customer, evaluate what your target is for the
service you're working on. We can then make some assumptions about the traffic
patterns for that event and project what load we'll need to model on
a per-service and even per-API basis.

Hopefully you already have done this exercise during the design process. If not,
there's no better time than now!

#### Applying the Analogy

Using our Food Service analogy, let's assume we're launching our service in
August. Halloween in the US is one of the [biggest online ordering
days](https://get.doordash.com/en-us/blog/busiest-days-for-food-delivery) in the
year, with volume significantly higher than the rest of the week or month.

Let's say on a typical day we receive 1 million orders. It's important to note
these most likely aren't evenly distributed across the day. Let's assume we have
a US-based service and 80% of our traffic falls between 3 PM Pacific (6 PM
Eastern) and 9 PM Pacific. That means our typical order volume is 80%
* 1 million / 6 hours -> 133K orders per hour. That means our service will
typically need to handle about 40 orders per second on a typical day.

Now, let's assume Halloween order volumes are 5x the average day, which gets us
to about 200 orders per second.

### Translating Projections into API Traffic
Now we have an assumption about how much business-based traffic we'll have. What
about our projected load? 200 orders per second likely means we need to model
significantly higher loads for our actual service.

We can make some more assumptions, or base it on actual metrics. If we say that
a customer will typically place an order 40% of the time they browse, and the
average clicks to order conversion is something like 10:1, we can use that for
modelling API traffic.

We should also carefully capture our logic here as this will be important for
evaluating how successful we were.

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

### Before Running Your Test
* Clue in your dependencies, including other services or AWS
* Communicate to your team, and any interested parties, the timelines for your
  test, what conditions you'll stop under, and any other precautions you're
  taking. We should aim to inspire confidence with this communication, and build
  trust with the others.

### Running the Load Test
* Be sure to stop if you find that the service is tipping over, or if your
  dependencies are starting to see escalated error rates.

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

### All done!
Yay!
