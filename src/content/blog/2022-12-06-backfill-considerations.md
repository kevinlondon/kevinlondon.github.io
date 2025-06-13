---
title: Backfill Considerations
pubDatetime: 2022-12-06T11:20:00
description: "Planning a data backfill? Here are the key considerations: impact assessment, rollback strategies, monitoring, and how to avoid common pitfalls that can bring down production systems."
tags:
  - process
---

When I joined Amazon, I needed to send millions of production records through
a new service. This is also known as backfilling. A backfill is a process that
applies updates or changes to existing records in a dataset. I had never run
a backfill at Amazon-scale. I learned a few things while planning and executing
the backfill that I’d like to share.

## Backfill Steps

Backfills need careful planning so you don't take down production systems. It
can be challenging and resource-intensive. This is the plan I followed (and
recommend):

1. **Plan** the backfill, considering the potential impacts on the system and its
   users.
2. **Communicate** with other stakeholders. Let them know about the
   planned backfill and any potential disruptions it may cause.
3. **Test** the process on a smaller scale to ensure it will work as expected on
   the full production system.
4. Run and **monitor** the backfill process to identify and address potential
   issues.
5. Upon completion, **verify** that the backfill updated
   the records as you intended.
6. **Document** any issues that the backfill hit.

It’s easy to overlook one of these steps, and risky to skip one! For example,
neglecting to communicate to a stakeholder could cause problems. Let's say you
run the backfill without their knowledge and they get paged. Would the affected
team know to reach out to you?

Let's go through each step in more detail.

## Plan

Planning how to run the backfill is the most important step. I wrote and
circulated a design document that covered the following areas:

### How will the backfill work?

Some questions I addressed include:

* Which systems could the backfill effect? Who owns those
  systems, and how can you get ahold of them if something goes wrong?
* Where will you get a complete backfill record list?
  What data do you need from each record to submit for backfilling?
* Where will the backfill run? Could you run it from a laptop?
  What security considerations might prevent a local backfill execution?
* How will the records get sent to the production system? Does
  it take records into a queue?
* What does a successful backfill look like? Do you need to process 100% of
  records, or is it acceptable if the backfill completes with 99.99%?

### What can go wrong?

Once we have a [happy path](https://en.wikipedia.org/wiki/Happy_path) flow and
diagrams of affected systems, consider which parts can fail. Some starting
considerations:

* **Production Impact**: What if the backfill causes too much load on a production
  service? Is there a way to turn off the backfill, or throttle the rate at
  which it's providing records?
* **Partial Failure**: What if there's an issue in execution and it stops
  halfway through? Will it be possible to resume the backfill from a checkpoint,
  or does it need a full restart?
* **Single Record Failure**: What if one record failed to submit through the
  system? How will you know that it still requires backfill?
* **[Idempotence](https://en.wikipedia.org/wiki/Idempotence)**: Is it safe to
  re-run the backfill on each record or
  destructive?

### Prepare for Edge Cases

Edge cases have a way of showing up when you’re processing millions of items.
Something that happens once in a million is a real case to consider. If the
backfill requires 100%, that every edge case, including malformed data.

You won't be able to anticipate every edge case.
Plan time to diagnose and address them. They'll show up.

## Communicate

Create a document and a checklist that outlines the specific steps you will take
to run the backfill. Include details about what you’re backfilling and when, how
to run it, and what metrics you'll monitor.

Have a plan in place for how to respond to
any issues that arise during the backfill.
This could include steps for identifying issues and how to halt the backfill.

### Request Feedback!

Once you finish the plan for your backfill, confirm it with others.

As a starting point, run it by stakeholders for the involved systems. For
example, let's say you're planning to query another service to
get all the production records. Is the service owner aligned with that approach?

For larger backfills, reach out to colleagues that can identify potential blind
spots. Feedback is a good thing!

## Test

Once you've planned how to run the backfill, and how it will work, the next
phase is running small-scale tests.

### Create a Test Environment

Create a test environment that mirrors the production
environment. This ensures that the test results reflect how the
backfill will behave. This could include a “shadow” or staging environment which
acts like production.

If that's not possible, what about creating a test of test identifiers?
Can you create a set of records which match what currently exists in production?

### Dry Run

It’s great to be able to preview what the script will do before you do it.
A "dry run" mode is a way of allowing the backfill to run without making
production changes. During a dry run, the backfill logs what it would do without
actually doing it.

The dry run should be the default option. Running in production should be
difficult to do by accident. I recommend making the production mode flag the one
you have to opt into. For exmaple: having a flag for `-–production` or
`-–perform-disruptive-backfill`. Whatever you need to make it ominous enough to
cause pause.

### Run a Small Backfill

Choose a subset of identifiers for the backfill, such as those from a small or
less risky data set. For example, you may want to choose a group of known test
identifiers, or a lesser-used set of IDs to start. You can then follow the rest
of the backfill steps and treat it as you would the full production backfill.

## Monitor

Establish a set of metrics that will help understand the backfill’s performance.
These metrics may include:
1. The amount of data the backfill processed
2. The rate at which the backfill is running
3. Any errors or issues that arise during the backfill.

Then, set up a system for monitoring the backfill in real-time. This could
involve creating dashboards and setting up alerts to notify you of any issues.
When you're running the backfill, having this monitoring in place offers
peace-of-mind.

## Verify

This sounds obvious. It is also something I neglected to do when designing my
backfill solution.

I remember sitting in my design review session. A Principal Engineer asked me
how I planned to verify that it worked. I answered that the design included
a way to check that the backfill processed every record.

I later found that seeing it backfilled a record is not the same as the backfill
doing what I wanted.

Tooling is your friend here. Build a way to verify that the solution is what you
expect to see once the backfill processes each record. This could be
a command-line script, a scheduled job, an offline export, or some combination.

I wrote a collection of command-line tools for verifying individual records.
I then performed an offline analysis to see where the backfilled records had
gaps or issues. As I identified and fixed the issues, I re-backfilled the
affected records.

My backfill didn’t go smoothly at first. I worked through the issues and we
built a set of tools which had enduring value, far past the initial backfill.

## Document

After the backfill, you've likely learned all sorts of interesting things you
didn’t know at the start. It’s now, before declaring victory, that it’s best to
capture the results of what you’ve done.

Ideas for what to capture:

1. **Results**: How did it go? How many records backfilled as you expected? How
   many needed manual intervention? How long did the process take? What
   production impact did you observe on up- or down-stream systems?
2. **Steps to Reproduce**: If we need to run the backfill again, do you have the
   steps written down where the team can find them? If you're
   out of the office, will they be able to complete the backfill without you?
3. **Recommended Changes**: What tooling do you wish you had? What would you do
   next time? Did the test environment work as well as you’d hoped? Are there
   longer-term initiatives to prioritize, such as creating a staging
   environment?

## 🎉

When you're done, send out an announcement that backfill is complete! You've
earned it. This encourages you to gather a concrete set of metrics and impact.
(It can be helpful when filling in annual performance reviews or promotion
documents!)

Executing a large-scale production backfill requires careful planning. With
these steps, I hope you will feel more prepared when you run your next one.
I wish you luck!
