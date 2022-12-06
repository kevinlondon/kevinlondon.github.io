---
layout: post
title: Backfill Considerations
date: 2022-11-30 20:57:01.000000000 -07:00
---


When I joined Amazon, I was tasked with backfilling millions of items through
our new system. For those who may not be familiar, a backfill is a process to
retroactively apply updates or changes to data. It can be challenging and
resource-intensive, which is why it's important to plan carefully, communicate
with stakeholders, and test the process on a smaller scale before running it on
the full production system.

I learned a few key things during my backfill experience that I'd like to share.

## Backfill Steps

I learned quickly that I needed a plan for the backfill. This is what I did (and
recommend):

1. **Plan** carefully, considering the potential impacts on the system and its
   users.
2. **Communicate** with other stakeholders and users to let them know about the
   planned backfill and any potential disruptions it may cause.
3. **Test** the process on a smaller scale to ensure it will work as expected on
   the full production system.
4. Run and **monitor** the backfill process closely to
   identify and address any potential issues that may arise.
5. Once the backfill is complete, **verify** that the data has been updated as
   expected and that the system is functioning properly.
6. **Document** the process and any issues that were encountered, as this
   information will be useful for future reference.

It's easy to overlook one of these steps, and risky to skip one! For example,
neglecting to communicate to a stakeholder could cause problems when you go to
run the backfill without their knowledge and they get paged. Would they know
to reach out to you?

By following these steps, developers can help ensure that the backfill process
is successful and has minimal impact on the production system and its users.
Let's go through each step in more detail.

## Plan

As I started thinking about backfilling the production system, I realized
I needed to consider many different aspects before I could get alignment on the
approach. I wrote a design document that covered the following areas:

### How will the backfill work?

Some questions I addressed in the design include:

* Which systems need to be involved in backfilling? Do I know who owns those
  systems, and how I can get ahold of them if something goes wrong?
* How can I get a complete list of all the records which I need to run through
  the backfill? What data do I need from each record to submit for backfilling?
  In my case, I could export the IDs associated with each production record and
  collect them into batches for submission.
* Where will we run the backfill? Is the data small enough or will the backfill
  be short enough that it can be run in a background process from a laptop? Are
  there security concerns which prevent local execution of the backfill?
* How will we pipe the records into the production system for backfilling? Does
  it take records into a queue? What authentication is required to submit the
  records?
* What does a success backfill look like? Do you need to process 100% of
  records, or is it acceptable if the backfill completes with 99.99%? This
  becomes important when evaluating if the backfill is done or needs to be
  re-run, and the level of rigor you'll need to apply during and after the
  backfill.

This is a non-exhaustive list!

### What can go wrong?

Once we have a [happy path](https://en.wikipedia.org/wiki/Happy_path) flow and
diagrams of affected systems, consider which parts can fail. Some starting
considerations:

* **Production Impact**: What if the backfill causes too much load on a production
  service? Is there a way to turn off the backfill, or throttle the rate at
  which it's providing records?
* **Partial Failure**: What if there's an issue in execution and it stops
  halfway through? Will it be possible to resume, or does it require starting
  all again? Thinking about how to checkpoint or resume a partially-successfully
  operation can prove invaluable for if (when!) it fails 2/3 through an 18-hour
  backfill. Not that it's happened to me...
* **Single Record Failure**: What if one record failed to submit through the
  system? How will you know that it still requires backfill?
* **Idempotency**: Is it safe to re-run the backfill on each record or
  destructive? Ideally, backfills are
  [idempotent](https://en.wikipedia.org/wiki/Idempotence) and re-running
  individual records after the backfill is a safe operation.

### Prepare for Edge Cases

Though not specific to a backfill, edge cases have a way of showing up when
you're processing millions of items. Something that happens once in a million is
a real edge case that you'll need to consider, especially if the backfill
requires 100% coverage over the data set. 100% includes *every* edge case,
conceivably including malformed data, one-offs, or regional quirks related to
the business.

You won't be able to anticipate all of these edge cases. It's worthwhile to
plan time to diagnose and work through the edge cases which will inevitably show
up.

## Communicate

Create a plan that outlines the
specific steps you will take to test the backfill. This plan should include
details about what data you will use for the test, how you will run the
backfill, and what metrics you will use to evaluate its performance.

It can be helpful to have a plan in place for how to respond to
any issues that arise during the backfill. This could include steps for
troubleshooting and fixing common issues, as well as a plan for how to roll back
the backfill if necessary.

If you've run through all the planning steps, it should be straight-forward to
write the execution plan.

### Solicit Feedback!

Once you finish the plan for your backfill, validate it with others.

At minimum, it's a good idea to run it by the stakeholders for up- or down-stream
systems from yours. For example, if you're planning to query another service to
get all the production records, do they know that? Are they ok with it?

Another good group is teammates, local experts, or more senior engineers who
might be able to point out potential blind spots. When reviewing designs with
others, something I try to keep in mind is that the goal is to build a better or
more resilient design. Feedback is a good thing!

## Test

Once you've planned how to run the backfill, and how it will work, the next
phase is running small-scale tests.

### Create a Test Environment

You should first create a test environment that closely mirrors the production
environment. This will ensure that the test results accurately reflect how the
backfill will behave in production. This could include a "shadow" or staging
environment which looks and acts similar to production.

If that's not possible, what about creating a test of test identifiers?
Can you create a set of records which match what currently exists in production?

### Dry-run

It's great to be able to preview what the script will do before you do it.
A dry-run mode is a way of writing the production backfill logic or scripts such
that it logs what will normally be logged but importantly **without** making the
production change.

The dry run should be the default - running production change should be hard to do
on accident, eespecially if it will cause problems. I've seen many a production
backfill accidentally started earlier than expected because of a forgotten
`--dry-run` or ``--test` flag. I recommend instead making the production mode
flag the one you have to opt into, for exmaple using `--production` or
`--perform-disruptive-backfill` or whatever you need to make it just ominous
enough to cause pause before running the backfill by accident.


### Run a Small Backfill

Choose a subset of identifiers for the backfill. I suggest choosing either
a randomly set of identifiers or a set of identifiers from a small or less risky
data set. For example, you may want to choose a group of known test identifiers,
or a lesser-used set of IDs to start. You can then follow the rest of the
backfill steps and treat it as you would the full production backfill.

## Monitor

To monitor a production backfill, you should first establish a set of metrics
that will help you understand the backfill's performance. These metrics may
include the amount of data that has been processed, the speed at which the
backfill is running, and any errors or issues that arise during the backfill.

Once you have established these metrics, set up a system for
monitoring the backfill in real-time. This could involve using monitoring tools
to track the backfill's performance, setting up alerts to notify you of any
issues that arise, and regularly checking in on the backfill to ensure that it
is running smoothly.

Overall, effective monitoring of a production backfill requires a combination of
monitoring tools, real-time monitoring, and a plan for responding to any issues
that arise.

When you're running the backfill, having this monitoring in place offers
peace-of-mind.

## Verify

This sounds obvious. It is also something I neglected to do when designing my
backfill solution.

I remember sitting in a design review session and a Principal Engineer asked me
how I planned to verify that it worked. I answered that the design included
a way for me to check that everything had been processed by the backfill
application.

Unfortunately, I found on the day of execution that simply knowing if it *had
executed* is not the same as knowing if it did what I intended by starting on
the process.

Tooling is your friend here. Build a way to verify that the solution is what you
expect to see once the backfill has been executed on a record. This could be
a command-line script, a scheduled job, an offline export, or some combination
of them. I've used a mix of all of these.

In my case, I wrote a collection of command-line tools for verifying individual
records and then performed an offline analysis to see where the backfilled
records had gaps or issues. Each day, I identified and fixed a few more issues,
which were addressed by re-backfilling the affected records.

In my case, though the backfill didn't initially go smoothly, we worked through
the issues, I learned a lot, and was able to build a set of tools which had
enduring value far past the initial backfill.

## Document

Now that you've successfully executed the backfill, you've probably learned all
sorts of interesting things you didn't know at the start. It's at this time,
before declaring victory, that it's best to capture the results of what you've
done.

Ideas for what to capture:

1. **Results**: How did it go? How many records successfully backfilled? How
   many needed manual intervention? How many are left? How long did it take?
   What production impact did you observe on up- or down-stream systems?
2. **Steps to Reproduce**: If we need to run the backfill again, do you have the
   steps written down or referenced in a place that the team can find? If you're
   out of the office, will they be able to complete the backfill without you?
3. **Recommended Changes**: What tooling do you wish you had? What would you do
   differently next time? Did the test environment work as well as you'd hoped?
   Are there longer-term initiatives which are worth doing even though the
   backfill is complete (for example, creating a more robust test environment or
   consistent staging environment)?

Lastly, send out an announcement that backfill is complete! You've earned it,
trumpet your success. One advantage of sending out an announcement is that it
encourages you to gather a concrete set of metrics, which is something that's
helpful when you're filling in annual performance reviews or promotion
documents.

Overall, testing a large-scale production backfill requires careful planning and
execution, and it is important to monitor the backfill in order to ensure that
it will be successful in production.

In my case, I learned many lessons the hard way and I hope this can help you
avoid some of the challenges that come with backfilling a large production
system. I eventually completed the backfill, and gained many long-term useful
tools along the way. I wish you luck on your next production backfill!
