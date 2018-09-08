---
layout: post
title: An Intro to AWS Certifications
date: 2018-09-04 20:23:08
---

I'm skeptical of certification programs, especially in the software
industry.
[Uncle Bob
Martin](https://en.wikipedia.org/wiki/Robert_C._Martin)
has written about certifications programs and says ["Don't Waste Your
Time!"](https://sites.google.com/site/unclebobconsultingllc/home/articles/certification---don-t-waste-your-time).
Usually you spend a few days in seminars, spend some money,
and go on your way. What do you actually get from it, aside from the piece of
paper?

[Amazon Web Services](https://aws.amazon.com/) certifications seemed different
from the others because they focus on
how to build scalable and reliable services.
I started studying for them when
I joined [Amazon.com](http://amazon.com/) a few months ago. So far, I've
completed the [Solution Architect - Associate](https://aws.amazon.com/certification/certified-solutions-architect-associate/)
and [Developer - Associate](https://aws.amazon.com/certification/certified-developer-associate/)
certifications. As a disclaimer, although I work at Amazon, I don't work in the
AWS organization and these
views are my own.

It's been a worthwhile investment to get certified. In this post, we'll talk about
why I think you should get certified and how to prepare for the tests.

## Why Get Certified?

Before working at Amazon, I used AWS services like
[EC2](https://aws.amazon.com/ec2/) and [VPCs](https://aws.amazon.com/vpc/) so
I felt comfortable with those tools.  I didn't realize, however, how many AWS
services I'd never even touched. There's over 100 AWS services listed in the
console!
I wanted to learn more about what's available. For example, I didn't know the
difference between [AWS Simple Workflow](https://aws.amazon.com/swf/) and [AWS
Step Functions](https://aws.amazon.com/step-functions/).

(_Spoiler / Aside_):

1. AWS [recommends using Step
   Functions](https://aws.amazon.com/step-functions/faqs/) over Simple Workflow for new projects.
2. SWF uses a "decider program" paradigm where you write the code to determine what to do.
3. Step Functions uses a declarative JSON syntax instead.)

(_End Aside_)

I also wanted to go into more depth for services I already knew.
For example, in [AWS Simple Queue
Service](https://aws.amazon.com/sqs/), what's [long
polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-long-polling.html)
and how does it differ from the default?

The certification process helped me improve in both areas. If
you want to learn more about AWS, it's helpful to get
certified. Even if you're not sure if you'll do something related to ops or
AWS, it's
good to know what's available in case something comes up.

## How to Get Certified

The basics for certification are easy:

1. Pick [a certificate you want](https://aws.amazon.com/certification/#roadmap)
2. Study!
3. Pay for and schedule an in-person test on [AWS's Certification
   site](https://www.aws.training/certification?src=certification)
4. Take the test

### What Cert Do You Want?

AWS currently offers 5 main certificates and several specialty
certificates. The consensus is that it's best to pursue the AWS certifications
in this order:

1. All Associate
2. Specialty (Optional)
3. Professional

### Associate-level Certifications

For the associate level certificates, even if you're a developer or sysadmin,
this is the recommended order:

1. [Solutions Architect](https://aws.amazon.com/certification/certified-developer-associate/)
2. [Developer](https://aws.amazon.com/certification/certified-developer-associate/)
3. [SysOps Administrator](https://aws.amazon.com/certification/certified-sysops-admin-associate/)

#### Why?

Solutions Architect introduces you to most AWS services. It may
cover how to build the networks for a Virtual Private Cloud (VPC), for instance.
It also covers permissions, security, servers, database, and a general overview
of your options in AWS. The certification gives you a solid base on which to
build the rest of your knowledge and understanding of the AWS ecosystem.
[I wrote a full guide with notes]({{ site.baseurl
}}{% post_url 2018-09-08-aws-solutions-architect-associate %}) for this certification, if you'd like to
know more.

The Developer certification, at least in 2018, focuses
on serverless technologies like AWS Lambda and API Gateway. It touches on the
code-related suite of tools for AWS as well, such as CodeDeploy and
CodePipeline.

The SysOps Administrator certificate covers deploying, managing, and operating
services. The earlier versions of the certification covered similar ground to
Solutions Architect. I suspect the 2018 update will include serverless
technologies, like AWS X-Ray.

### Specialty Certifications

Between the Associate and Professional-level certifications, AWS offers a set of
certificates that have a more specific focus on an industry or use-case. Here's
the set of specialty certifications:

1.  [Security](https://aws.amazon.com/certification/certified-security-specialty/)
2. [Advanced Networking](https://aws.amazon.com/certification/certified-advanced-networking-specialty/)
3. [Big Data](https://aws.amazon.com/certification/certified-big-data-specialty/)

The Security certificate is particularly valuable. Any of the certifications
may ask security questions and they can be tricky to answer without prep. If
you'd like to read more about the certs, the links above have more info.

### Professional-level Certifications

Finally, you can wrap up with the professional level certificates:

1. [DevOps
   Engineer](https://aws.amazon.com/certification/certified-devops-engineer-professional/)
2. [Solutions
   Architect](https://aws.amazon.com/certification/certified-solutions-architect-professional/)

I can't speak in depth to either of these certificates as I haven't started
studying for them yet.

The DevOps Engineer certificate builds on the Developer and
SysOps Administrator Associate certifications. It's centered around building
scalable and distributed systems on AWS, including topics such as "migrating complex,
multi-tier applications" and cost management.

The Solutions Architect - Professional exam may go into just about any of the
services and it expects you to understand them at a deep level. I've heard it's
the hardest certification to pass.

## Studying Recommendations

### What to Study

Because the certifications can cover a lot of material, it's important to use
your time wisely. Here's what I used to prepare:

* Watch training videos

I watched videos from both [A Cloud Guru](https://acloud.guru/) and [Linux
Academy](https://linuxacademy.com/). They each have specialized courses for each
certification, which is great.

Each site has different strengths. A Cloud Guru, in my experience, has great
tests and shorter videos than Linux Academy. Linux Academy has good labs and
will provision AWS sandbox accounts on your behalf. You won't have to worry
about decommissioning services when you're done with them.

I recommend watching the videos at either 1.5x or 2.0x
speed, if you're familiar with the services they're covering. If it's too fast,
you can always slow down. When I took the Linux Academy Solutions
Architect course, it had ~25 hours of video lectures. 2.0x-ing
that can help shorten the amount of time you need to study for each certificate.

* Read AWS whitepapers

To supplement your understanding, it's helpful to review the [AWS
Whitepapers](https://aws.amazon.com/whitepapers/). They're well written. I've
read most of the papers
in the "Introduction to AWS" section and would recommend them. In particular,
check out the Overview of Amazon Web Services and Storage Services Overview
whitepapers.

* Read the AWS FAQs

Most services in AWS have an FAQ section. In the past, I'd only consulted them
when I needed to find a specific answer to a question I had. For the
exams, it's useful to review all FAQs for each main service in the
certification. For example, I reviewed
the [DynamoDB FAQs](https://aws.amazon.com/dynamodb/faqs/) or [AWS Lambda
FAQs](https://aws.amazon.com/lambda/faqs/) for Developer - Associate.

* Take practice tests

A good way to solidify your knowledge is to take practice tests. If you use
A Cloud Guru or Linux Academy, they each have ~60 question practice exams you
can take.

AWS offers a free practice exam with a few questions for each
certification type. For example, click the "Download sample questions" link on
[the Solutions Architect - Associate
page](https://aws.amazon.com/certification/certified-solutions-architect-associate/).

* Pace yourself

Studying each day helps improve your long-term memory and retention
better than cramming. Consider using [spaced repetition](https://www.gwern.net/Spaced-repetition)
(e.g. [Anki](https://apps.ankiweb.net/). It can help with remembering what each
service does.

* Try the labs

Either on your own or with the help of a site, use the services
you're learning about. The certifications are a great way to learn about
a service but, for me, there's no better way to learn something than to use it.

## Is it worth it?

The certification process gives you a good base in AWS.
I'm glad that I've spent the time doing it and I plan to finish at least a few
more certifications. Because dev and devops practices have an increasing amount
of overlap, it's likely that devs will be doing some amount of ops
work moving forward. I think learning more about AWS is a good investment.
