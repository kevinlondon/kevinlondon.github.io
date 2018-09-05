---
layout: post
title: AWS Certification Prep
date: 2018-09-04 20:23:08
---

I started at Amazon.com a few months ago and began studying for the AWS
Certifications. So far, I've passed two (Solution Architect - Associate and
Developer - Associate (2018)). I'd worked with AWS tools such as EC2 and VPCs
prior to starting at Amazon but I'd never thought to get certified. As
a disclaimer, I don't work in or on AWS and these views are my own.

## Why Get Certified?

I started studying because I wanted to both broaden and deepen my knowledge of
AWS services. There's many AWS services and I had a hard time remembering the
difference
between, for example, [AWS Simple Workflow](https://aws.amazon.com/swf/) and [AWS Step Functions](https://aws.amazon.com/step-functions/).

(Spoiler / aside:

1. AWS [recommends using Step
   Functions](https://aws.amazon.com/step-functions/faqs/) over Simple Workflow for new projects.
2. SWF uses a "decider program" paradigm where you write the code to determine what to do.
3. Step Functions uses a declarative JSON syntax instead.)

In terms of technical depth, I wanted to learn more about specific behaviors in
services I'd used. For example, in [AWS Simple Queue
Service](https://aws.amazon.com/sqs/), what's [long
polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-long-polling.html)
and how does it differ from the default?

I've found that the certifications have helped me improve in both areas. If
you're looking to learn more about AWS, I think it's worthwhile to get
certified.

[Mooner
Rifai](https://hackernoon.com/3-reasons-why-you-should-get-aws-certified-this-year-7e44dbc51519)
also wrote a good article on why he thinks you should get AWS certified, if
you're looking for more reasons.

## How to Get Certified

The basics for certification are easy:

1. Pick [a certificate you want](https://aws.amazon.com/certification/#roadmap)
2. Study!
3. Pay for and schedule an in-person test on [AWS's Certification
   site](https://www.aws.training/certification?src=certification)
4. Take the test

We'll cover #1, #2, and #4 in more depth below.

## What Cert Do You Want?

AWS currently offers 5 primary certificates and several specialty
certificates. I've heard that it's best to pursue the AWS certifications in the
following order:

### Associate-level Certifications

1. Solutions Architect - Associate
2. Developer - Associate
3. SysOps Administrator - Associate

#### Why?

Solutions Architect introduces you to most of the AWS
services with some technical depth. For example, it may require you to understand
how to build the networking for a Virtual Private Cloud (VPC).
It gives you a base to build the rest of your knowledge and
understanding of the AWS ecosystem.

Developer - Associate, at least the 2018 version, focuses
on severless technologies like AWS Lambda and API Gateway. It touches on the
code-related suite of tools for AWS as well, such as CodeDeploy and
CodePipeline.

The SysOps Administrator certificate covers deploying, managing, and operating
services on the AWS platform. The earlier versions of the certification
(pre-2018) covered similar ground to the Solutions Architect with an extra focus
on CloudWatch and ops-related tooling. I expect that the 2018 update will focus
more on serverless technologies, like AWS X-Ray.

### Specialty Certifications

If you'd like, you can pursue the specialty certs:

1. Security - Specialty
2. Advanced Networking - Specialty
3. Big Data - Specialty

The Security certificate is especially valuable because any of the
certifications (associate or professional) may cover security topics. An
understanding of AWS' security models and recommendations can make some of that
studying easier.

### Professional-level Certifications

Finally, you can wrap up with the professional level certificates:

1. DevOps Engineer - Professional
2. Solutions Architect - Professional

I can't speak in depth to either of these certificates as I haven't started
studying for them.

The DevOps Engineer certificate builds on the Developer and
SysOps Administrator Associate certifications. It also touches on some of the
same concepts as in the Security and Advanced Networking certification
materials.

I'm told the Solutions Architect - Professional certificate touches almost all
of the AWS services and require in-depth technical knowledge of how each service
works. I've also heard that it's the hardest certification to achieve.

## Studying Recommendations

### What to Study

This is what I've done so far to pass certifications and I'd recommend the same
for anyone else:

* Watch training videos

I've watched videos from both [A Cloud Guru](https://acloud.guru/) and [Linux
Academy](https://linuxacademy.com/). They each have specialized courses that aim
to teach the concepts for each certification, which is great. Each site has
different strengths.

A Cloud Guru, in my experience, has great tests and shorter videos than Linux
Academy. Linux Academy has good labs and will provision AWS sandbox accounts on
your behalf, so you don't have to worry about decomissioning services when
you're done with them.

For either service, I'd recommend watching the videos at either 1.5x or 2.0x
speed, if you're familiar with the services they're covering. If it's too fast,
you can always slow down. I think when I took the Linux Academy Solutions
Architect course, there was something like ~25 hours of video lectures. 2.0xing
that can help shorten the amount of time you need to study for each certificate.

* Read AWS whitepapers

The sites above won't offer a comprehensive view of the AWS services. To
supplement your understanding, it's helpful to review the [AWS
Whitepapers](https://aws.amazon.com/whitepapers/). They're well written and
provide a great overview of the concept they cover. I've read most of the papers
in the "Introduction to AWS" section and would recommend them. In particular,
check out the Overview of Amazon Web Services and Storage Services Overview
whitepapers.

* Read the AWS FAQs

Each service in AWS has an FAQ. In the past, I'd only consulted them
when I needed to find a specific answer to a question I had. For the
certifications, however, it's useful to review the full FAQs for any services
that get mentioned repeatedly. For example, you might find it helpful to review
the [DynamoDB FAQs](https://aws.amazon.com/dynamodb/faqs/) or [AWS Lambda
FAQs](https://aws.amazon.com/lambda/faqs/) for the Developer - Associate
certification.

* Take practice tests

A good way to solidify your knowledge is to take practice tests. If you use
A Cloud Guru or Linux Academy, they each have practice exams you can take that
will approximate the in-person test conditions.

AWS also offers a free practice exam with around 10 questions for each
certification type. For example, click the "Download sample questions" link on
[the Solutions Architect - Associate
page](https://aws.amazon.com/certification/certified-solutions-architect-associate/).

* Pace yourself

Studying a little bit each day helps improve your long-term memory and retention
better than cramming. Consider using [spaced repetition](https://www.gwern.net/Spaced-repetition)
(e.g. [Anki](https://apps.ankiweb.net/) to help with remembering what each
service does and some of the specifics for each, such as the maximum
[Amazon SQS
VisibilityTimeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)
value.

* Try the labs

Either on your own or with the help of a study site, try to use the services
you're learning about. The certifications are a great way to learn about
a service but, for me, there's no better way than using it a project.

## Is it worth it?

I think it's worthwhile to [learn and be
curious](https://www.amazon.jobs/principles). I'm glad that I've studied so far
because it allows me to drop into projects that use different AWS tech than
I've used in the past. In other words, it's a good base. It's also good to learn
about services that you might not have used but that can be really useful, like
the API Gateway, AWS Lambda, or AWS DynamoDB.

There's some anecdotal data that achieving the certificates can yield higher
paying jobs and / or raises. I think it's better to pursue the certifications
for the challenge and knowledge than for an expected reward.
