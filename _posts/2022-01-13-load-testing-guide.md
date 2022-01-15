---
layout: post
title: Load Testing and Lessons Learned
date: 2022-01-13 20:00:01.000000000 -07:00
---

I once designed a service to handle hundreds of thousands of requests per
second with a tight latency threshold. I theorized how to build such
a system, and designed for it during the design process. I never
built something that would actually need to handle that
level of traffic. How would I know if it would work at scale?

We needed to simulate the projected traffic to the service to check if it
could meet the requirements, a process known as load testing. We built the
first version of the service, prepared a comprehensive load test, alerted
everyone that we were going to run it, and started the test.

We dialed up the load testing traffic to the service. 5%... 10%... 15%...
of its projected traffic. No issue. At 20%, the service
fell over. We saw skyrocketing latency and a dramatically increased
errors. We pulled the plug on the test run and evaluated what to do next.

This can sound like a nightmare scenario but
we built and ran the load test to tell us just this kind of
information! If the service can't sustain its required load, I'd much rather
find that out under a controlled circumstance than when
customers go to use it and can't.

There's a line I think about from [The Zen of Python](https://www.python.org/dev/peps/pep-0020/):

> In the face of ambiguity, refuse the temptation to guess.

Load testing is one way to reduce ambiguity. It helps us avoid guessing if the
service will meet our expectations. I'd like to share what we learned along the
way while building out our load tests and optimizing that service.

## Working Backwards from the Customer

One lesson I've taken from my time at Amazon is
to [work backwards from the customer](https://www.amazon.jobs/en/principles).
We run load tests because we want to make sure the service is ready for customer
traffic at scale.

Perhaps we want to ensure our service is ready for a big initial launch,
a high-profile event such as a big event or holiday sales spike, or large-scale
data backfill. In any case, we can't know that our service will work without
testing that it does.

We first need to consider what customer access patterns might look like for the
service. We can then make some assumptions about the event
and model traffic on a per-service and even per-API basis.

### A Sample Application

For this post, we'll consider load testing a
new service we're adding to a pre-existing food ordering website. We want to
make sure it's ready to launch. This service,
which we'll call MenuService, provides menus to customers and allows them to
browse items they can order from each restaurant.

Let's assume we have the following APIs for our MenuService:
1. `GetMenusForRestaurant`: Returns menus for the restaurant. This could include
   breakfast, lunch, etc, and time ranges for the menus.
2. `GetMenuSummary`: Returns all the items on the menu, their descriptions, and prices.
3. `GetMenuItem`: Returns a single menu item and any pictures associated with it.

We'll revisit these APIs in the next few sections.

### Preparing for Launch

On a typical day, let's say we receive 1 million orders.
These orders likely aren't evenly distributed across the day. Perhaps our
US-based service receives 80% of its traffic between 3 PM Pacific (6 PM
Eastern) and 9 PM Pacific. That means our typical order volume is 80% * 1 million / 6 hours,
or 133K orders per hour. Our new service will
need to handle traffic to support about 40 orders per second on a typical day.

We're launching MenuService in August and the business is nervous about launching
before Halloween. They'd like assurance that the service is ready for the
traffic spike.

In the US, Halloween is one of the [biggest online ordering
days](https://get.doordash.com/en-us/blog/busiest-days-for-food-delivery), with
volume significantly higher than usual. Let's assume Halloween order volumes are
5x the average day, which gets us
to about 200 orders per second. How do we provide assurance to the business that
the service can easily handle that order volume?

### Translating Projections into API Traffic
We have an assumption about how much orders the business will receive. How can
we translate from order volume to service traffic?

We can make some more assumptions and / or base it on pre-existing metrics. If
we say that a customer will typically place an order 40% of the time they
browse, and the average customer to conversion ratio is something like 20:1, we
can use that for modeling API traffic.

We can capture our assumptions and confirm them with others. These values
will be important for evaluating success, and making sure the service is
successful when we need it.

In our example, let's consider the typical call flows for a customer browsing
the ordering site. Possible customer scenarios to model:

1. Customer chooses a restaurant they like and loads the menu. They don't see
   anything they like and close the site.
2. Customer chooses a restaurant, adds a few items to cart, and again changes
   their mind and stops browsing.
3. Customer tries to check out and their credit card is rejected.
4. Customer adds a few items and successfully places their order.

### Traffic Projections

Given our three APIs defined above (`GetMenusForRestaurant`, `GetMenuSummary`,
`GetMenuItem`), we can mimic traffic for these scenarios.
This can include capturing different access
patterns such as a popular restaurant, where
we distribute a higher percentage of requests to that restaurant during the load
test.

Let's make a few more assumptions about traffic. From our numbers
before, we projected there will be 200 orders per second at projected peak. If
we assume that there's a 20:1 conversion, that means there's approximately 4000
customers active on the site at any time. From these assumptions, we can derive
traffic projections on a per-API basis.

### Example Projections
Prospective hungry diners hit the `GetMenusForRestaurant` API at least once per
restaurant they browse. If we have 4000 customers on the site at any given time,
and we assume a customer will load a menu once per minute, we need to
support ~70 requests per second (4000 / 60) request for this API.

We can go through this exercise for all APIs and provide traffic projections.
These traffic projections will help inform how we build our load tests as well.
If we go through these projections,
we may end up with numbers like this at 100% traffic:

* **GetMenusForRestaurant**: 70 TPS
* **GetMenuSummary**: 100 TPS
* **GetMenuItem**: 500 TPS

## Defining Success
Once we have our forecast for traffic during the load test, and a plan for how
to distribute the traffic, we can think about what a successful load test looks
like.

### Defining SLAs
An SLA is a [Service-Level
Agreement](https://en.wikipedia.org/wiki/Service-level_agreement). It's
a contract to the business and your
customers for how your service will behave, including uptime, latency, and so forth.
To check whether our test is successful, we need to define the SLAs for it.

Questions we can ask:
* How many errors are acceptable? Is there a percentage, such as 99.99% of
  requests are successful? An absolute threshold such as no more than 25 errors
  in a 5 minute period?
* What latency is acceptable for your service and at what
  [percentiles](https://blog.bramp.net/post/2018/01/16/measuring-percentile-latency/)?
  Is a 99th percentile request at 100 ms response acceptable for your service?
* Under what criteria should we halt the test's execution?

### Instrumenting Code
After we define SLAs, how can we check if the service meets them? We'll need
metrics to help us find out.
Does the service emit metrics on each API indicating how long it took and
whether it was successful? If not, it's the perfect time to add
[profiling](https://en.wikipedia.org/wiki/Profiling_(computer_programming)) and
metrics to your code.

Profiling will help us dig more into the performance details. For example, we
should be able to tell what's slow for each primary point in the request. If
something is slow, why is it slow? Is it because of network calls? A slow
database query? Repeated or inefficient algorithms? Profiling can help us answer
these questions.

Something that has happened to me before is running a load test, failing it, and
not being able to find out what went wrong. At least when that happens, it's an
opportunity to improve monitoring!

### Ensuring Alarm Coverage
We want to know if our service is unable to meet its SLAs. That means it's
time to build alarms that will let us or our on-call know if there's a problem.

A good start here would be to look at your SLAs and consider how quickly you'd
like to know if you're in violation. Is a 5 minute delay before someone
starts to look at the issue ok? 15 minutes? Longer?

Something I like to do is build in layers of alarms. We should likely get paged
if we're well above SLA. If our service is almost out of SLA, or inconsistently
above SLA, we may want our system to alert us during business hours.
Having different alarm severities at different levels allows us to detect issues
before things get too bad.

## Load Testing

### Configuring the Load Test
We can finally start building out the load tests! Here's a few tips:

* **Gradually increase traffic to desired levels**. For example, maybe orders on
  Halloween are not immediately at 100% traffic.
Perhaps they reach that over an hour as more people decide they want to order.
Our earlier assumptions can be a good starting point for modelling
how long the ramp-up should take.

* **Go where your customers are.** Your load testing run should try to emulate
your customers as much as possible, including (if possible) being outside of
your code or infrastructure to capture network latency. We're trying to model
how slow the experience will be from their perspective. Cheating by putting your
load test
source in or near your service infrastructure leads to an inaccurate picture of
the latency. What if the public facing load balance or API Gateway is causing
latency which we don't see until we start to test with actual customers?

* **Set up the world**. Your test will likely run a lot of requests against
a pre-defined set of identities. For example, in our earlier assumptions for MenuService, we
mentioned that there will be a popular restaurant that gets more requests than
others. Perhaps we need to pre-configure or ensure a test restaurant exists.
Or, we could create a list of restaurant IDs to
access, and store those in a configuration file on [Amazon
S3](https://aws.amazon.com/s3/) or similar that the tests pull.

* **Run outside of production if you can**. To reduce risk, it's best to run
  in a non-production environment such as a staging environment.

* **Coordinate [Game
  Days](https://wa.aws.amazon.com/wellarchitected/2020-07-02T19-33-23/wat.concept.gameday.en.html)**.
  When running a load test for a high traffic event, the
  service under test will not be the only one experiencing higher than usual
  traffic volumes. Consider running your load tests in coordination with your
  dependencies to see how the overall customer experience will be.
  Perhaps your service can handle its traffic in isolation. When your service and
  your downstream dependency each have to handle increased request volume,
  something may fall over.

* **Minimize Variables**. When testing, try to isolate to a single variable
  under test. For example, perhaps we'd like to validate how instance size (e.g.
  memory or CPU) affects throughput. If a medium-sized instance can handle 100
  TPS per instance, can a large handle 200? It's tempting to try to test
  multiple things at once! If we test multiple changes at one time, it
  can be hard to tell which change yielded the improvement (or regression), and
  will wind up taking longer overall.

### Before Running the Test
As we prepare for the load test, consider what can go wrong. Here's what I've done:

* **Make a checklist**. Build the steps you're going to follow for running the test.
* **Start small**. Do a small scale test up to 5-10% to test that everything works as you expect.
* **Communicate**: To build trust, let your team and any interested parties
  (including potentially your cloud vendor!) know:
  * The timelines for your test run
  * The conditions under which you'll halt the test
  * Any other precautions you'll be taking during the time

### Running the Load Test
Before you run the test, check that the service is in a healthy state
before starting, and there's no issues in your downstream or upstream services.
If there's already a problem, it may be a good idea to delay until a later time
when the surrounding environment is more stable.

Let others know when you start the test and communicate as you run through your
checklist above. I suggest running the service at each threshold and making sure
it's healthy before progressing to the next one. For example, let the service
stabilize at 15% before going to 25%.

Keep an eye on your dashboards and metrics. If you start to see errors beyond
your SLAs, or issues in your downstream dependency, stop the run. It's easier to
stop a test and resume another time than to take down your site or service
during the load test.

## Tuning
When the test concludes, we can review the results and improve the service with
what we've learned.

### Capturing Results
After your test run, capture a snapshot of all the graphs during your test if
you can. It'll make analysis later easier. For example, if you can point to all
the graphs the moment you dialed up and started seeing exceptions, it'll
be easier to pinpoint what started the service to fall over. Maybe you had
a database issue or a cache which didn't behave as expected.

Another tip would be to make it so you can easily grab a graph of your load testing.
This may include making a specific load testing dashboard, which you can then
change the time bounds. That way, the next time you run these tests, you have
little extra work to capture all the graphs and dig through them.

### Digging into Your Results
Do a small write-up of what you found and what you'd like to do more
investigation on.

Some questions to ask:
* Looking at the graphs and performance, did you meet your goals? If not, how
  far were you from meeting them?
* Are the servers you're using optimal for your usage? Could they use more RAM,
  CPU, or disk? What was the bottleneck for scaling?
* How long did it take to add capacity? If you're using autoscaling of some
  kind, how long did it take new capacity to come online and start serving
  traffic? For example, I found that using larger servers would (sometimes) take
  longer to bring online (as long as 45 minutes), while we could provision
  a larger number of small server quickly.
* How did your database or caching layer do during the exercise?
* What leading indicators did you have that there was a problem? Did one API
  start to experience problems before the others?
* Did the hosts receive an approximately even distribution of traffic?

### Making Improvements
You may find many things to change! I recommend making these changes iteratively.

We've established a baseline with the initial tests and can measure against it
as we improve the service. It's helpful to get specific numbers for the
optimizations. For example, "We optimized the queueing behavior of server
workers and took latency at p99 from 55 ms to 35 ms".

If you make several improvements at once before re-running or re-evaluating your
load test, it can be hard to see how effective one change was. We may also optimize
something only to find it introduces a new problem! Keeping the changes small
between re-tests limits that risk too. Run a small test - it doesn't necessarily
need to be full scale.

### Preventing Regressions

A good way to ensure your service stays fast and
healthy is to build in load testing as part of your [deployment
process](https://continuousdelivery.com/). It'll help pinpoint if you make
a code change which introduces a slowdown, and help prevent customers from
seeing a performance regression.

In addition, after completing load testing and ensuring the service can handle its projected traffic,
we can test the service's resilience with chaos engineering. For example, we
could inject latency into dependency calls, increase memory usage, or take out
an availability zone. Chaos engineering is out of the scope of this post. One
reference for further reading: [Chaos Engineering: the history, principles, and
practice](https://www.gremlin.com/community/tutorials/chaos-engineering-the-history-principles-and-practice/).

## Load Testing Takes Time

It takes time to understand your
customers, build out
tests that simulate their behavior (or at least approximate it), run these
tests, and optimize so that they have a good experience.

Going back to my story from this post's start, we did (eventually)
optimize enough of the application and its infrastructure to meet the required
projected traffic levels. It took investigation, persistence, and support from
many talented software engineers.

Regardless of the size of service you're looking to launch, I hope you'll find
at least a few of these practices helpful for ensuring that your service can
meet its requirements and delight your customers.

*Thanks to David Iola and Richard Cousart for comments/corrections/discussion.*
