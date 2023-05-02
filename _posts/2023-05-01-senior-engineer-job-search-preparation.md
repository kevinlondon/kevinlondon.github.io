---
layout: post
title: Senior Engineer Job Search Preparation
date: 2023-05-01 19:53:01.000000000 -07:00
---

### Editor's Note

I wrote this entry shortly after concluding my job search in spring 2022.
The economic landscape looked different then, and some of the advice may feel out of place in the current climate.
I hope the process and strategies prove helpful for your next search.

### Original Post

I recently concluded a job search and am excited to say I'm joining Snapchat.
In this post, I'll walk through the process I used to decide where to go, navigate
interviews, and select a new role.

## Preparation

My main advice is to start preparing early. Preparing for a job
search requires time, (potentially) an understanding partner, and a long
timeline. While it is possible to do less work and receive an offer, I had these
tenets:

1. **Preparation is part of career development.**
   I believe it is a net-good to understand time and space
   complexities, system design, and better describe one's work to others.
2. **Maximize odds of converting opportunity to offer.**
   I'm willing to invest more time in the hypothesis that it raises
   my odds of success (though never guarantee it)
3. **Hiring is a system**. Understanding systems is part of my role.

### Determine What You Want

I recommend working through the guidance in https://www.jobsearch.dev/ to determine
what you'd like from your next role.

### Coding

Plan to spend time each day working through sample
problems, writing clean and maintainable code, and solving the problems in an
optimal or near optimal runtime. The best sites I've found for this are
[LeetCode](https://www.leetcode.com) and
[neetcode.io](https://neetcode.io/).

I recommend starting with the original "Blind 75" list tab, working
through each category, and then, if you still have time, go to the 150
recommended.

Try your best to understand each problem.
I worked on each problem for ~30 minutes.
If I couldn't find a solution, I read through the
discussion to find what worked for others. Sometimes reading what others
tried and implementing it helped me understand it.

If I needed to look at the discussion solution to solve the problem,
I added it to a list to retry within a few days to make sure
I understood it. I liked watching a video walkthrough for problems where
I felt particularly stuck or confused.

By the end of my search, I completed ~300 LeetCode (LC) problems, with the
distribution as roughly 1/3 Easy, 1/2 Medium, rest Hard. Hard LCs utilize a
combination of Medium-level techniques to solve in effectively. Your
interviewer will probably ask a flavor of Medium LC in interviews, and
understanding the techniques and patterns provides the most leverage.

### System Design

Here are some useful resources for system design:

- [Designing Data-Intensive
  Applications](https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321)
  by Martin Kleppmann. A master-class in building resilient and scalable
  systems. Takes a ground-up approach from looking at database fundamentals and
  how data is managed on a single system through to distributed systems,
  consensus, and combining systems to mitigate trade-offs. Fantastic book and
  [well-reviewed on
  GoodReads](https://www.goodreads.com/book/show/23463279-designing-data-intensive-applications)
  too. It's also available [as an audio
  book](https://www.audible.com/pd/Designing-Data-Intensive-Applications-Audiobook/B08VLGDK32)
  (which is what I used). Worth more than one read / listen.
- [System Design Interview – An insider's
  guide](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)
  by Alex Xu. A helpful guide for getting a feel for
  a framework and kinds of problems you might see in a System Design interview.
  Read through all the resources linked at the end of each
  chapter to cement your learnings.
- [System Design Interview – An Insider's Guide: Volume 2](https://www.amazon.com/System-Design-Interview-Insiders-Guide/dp/1736049119) by Alex Xu and Sahn Lam. Came out in early March 2022. Fantastic resource which goes into greater depth than the first System Design book. Same recommendations apply.

#### Other Reading

- [Amazon's Dynamo paper](https://www.allthingsdistributed.com/2007/10/amazons_dynamo.html).
- [Kafka
  paper](https://www.microsoft.com/en-us/research/wp-content/uploads/2017/09/Kafka.pdf):
  I haven't had the opportunity to work professionally with Kafka yet so
  I wanted to understand more of its use cases and advantages.
- [System Design Primer](https://github.com/donnemartin/system-design-primer):
  For Senior-level interviews, I think the breakdown of each problem is a bit
  shallower than some other resources.

#### Videos

- [System Design Interview channel](https://www.youtube.com/c/SystemDesignInterview): An amazing resource from a Senior SDE at Amazon. I recommend watching each of these videos at least twice.
- [Mastering Chaos - a Netflix Guide to
  Microservices](https://www.youtube.com/watch?v=CZ3wIuvmHeM): Interesting
  breakdown of how Netflix systems fit together and some challenges at scale.
  I like the presenter's presentation style and use of analogies.
- [System Design Interview with a FAANG engineer: Build
  LeetCode](https://www.youtube.com/watch?v=hmoqH48JV00): A sample System Design
  interview walkthrough with a paid interview prep service. Good to get a feel
  for the kinds of back-and-forth that you may see or experience during an
  interview.
- [Designing for Understandability: The Raft Consensus
  Algorithm](https://www.youtube.com/watch?v=vYp4LYbnnW8): Presentation on the
  design of Raft, a consensus algorithm that aims to be understandable.
  Consensus is a really interesting aspect of distributed systems and their
  approach to decomposing a complex domain is interesting!

##### Scaling Talks

- [Scaling Memcache at Facebook](https://www.youtube.com/watch?v=m4_7W4XzRgk)
- [Scaling Facebook Live Videos to a Billion Users](https://www.youtube.com/watch?v=IO4teCbHvZw)
- [Scaling Instagram Infrastructure](https://youtu.be/hnpzNAPiC0E)
- [Scaling Push Messaging for Millions of Devices @Netflix](https://youtu.be/6w6E_B55p0E)
- [TAO: Facebook’s Distributed Data Store for the Social Graph](https://youtu.be/sNIvHttFjdI)

### Behavioral

Describe your experiences using the [STAR method](https://www.themuse.com/advice/star-interview-method).

Additional resources:

- [Exponent's behavioral questions](https://www.tryexponent.com/questions?type=behavioral)
- [Tech Interview Handbook: Behavioral Interview Prep](https://www.techinterviewhandbook.org/behavioral-interview/)

#### Videos

- [All You Need to Know About Behavioral
  Interviews](https://www.youtube.com/watch?v=6rW01g6Obwk): High-level talk that
  covers some aspects and considerations during behavioral interviews.
- [Don't Get Down-Leveled or How to Tell a Good
  Story](https://www.youtube.com/watch?v=hU6BVxtGd5g): Good framework for
  thinking about how to favorably describe your work and role from past
  experience while providing signal to interview panels.

## Process

### Find companies of interest

My list of potential companies was about 30 at this point. Of these companies,
I talked to 10 of them.

**Do not waste anyone's time**. If you cannot see yourself working for a company, or
you're only interviewing to get a competing offer, don't reach out or cancel the
interviews as soon as you feel that way. Interviews are expensive for both the
company and you.

### Participate in the Hiring Process

Participating in interview panels at your current employer is a great way to
get more comfortable talking with others in a 1:1 basis. You also have to explore
LeetCode style problems (if this is what your company asks), which is a good
motivation to do a bit of extra research. In addition, by participating as an
interviewer, you can look at what effective candidates do that sets them apart
and model that in your own interviews.

### Contact recruiters / referrals

You may have had recruiters
reach out in the past and identify you as a good candidate. I hope you've been
kind to those people because now is a good time to follow up with them.
I searched through my email and LinkedIn past to see if I had received messages
from companies of interest and followed up with them if so. This led to
discussions with most of the 10 companies I identified.

### On-Site Prep

- Schedule on-sites in the same period, if possible.
- Split the interview loop over two days, if the company allows it. Interviews are taxing.
- Schedule well in advance. More time gives lets you better prepare.

### On-Site Day

On the day of the onsite interview, be well-rested, have a clear
head, and get ready to tackle the day's challenges.
Maintain a positive attitute throughout the day, even if you encounter setbacks.
You could be doing well even if it doesn't feel like it in the moment.

- Be friendly.
- Demonstrate a genuine interest in the company and role.
- Be prepared to answer questions about yur past work, thought process, and approach.
- Don't forget to ask questions and try to learn more about the company!

### Conclusion

Preparing for a job search requires time, effort, and dedication. I spent about
300 hours in total preparation outside of work over about a 6 month period. I
feel fortunate I landed at Snap and I'm happy with the outcome.

In summary, preparation, determining what you want, and coding and system design prep
can play a pivotal role in successfully navigating a job search. Start early if you can!
I hope this advice proves useful for you if you're looking for your next role.
