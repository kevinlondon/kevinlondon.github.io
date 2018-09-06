---
layout: post
title: AWS Certification Prep
date: 2018-09-04 20:23:08
---

After joining [Amazon.com](http://amazon.com/), I started studying for the
[Amazon Web Services](https://aws.amazon.com/) Certifications. So far, I've completed the [Solution Architect - Associate](https://aws.amazon.com/certification/certified-solutions-architect-associate/)
and
[Developer - Associate](https://aws.amazon.com/certification/certified-developer-associate/)
certifications. In this post, we'll talk about why you should get certified and how to go about it.

As a disclaimer, I don't work in the AWS organization and these views are my own.

## Why Get Certified?

I'd worked with AWS tools such as [EC2](https://aws.amazon.com/ec2/) and
[VPCs](https://aws.amazon.com/vpc/) before working at Amazon but I'd never
thought to get certified. I started studying because I wanted to both broaden
and deepen my knowledge of AWS services. For example, I didn't know the
difference between [AWS Simple
Workflow](https://aws.amazon.com/swf/) and [AWS Step
Functions](https://aws.amazon.com/step-functions/).

(_Spoiler / Aside_):

1. AWS [recommends using Step
   Functions](https://aws.amazon.com/step-functions/faqs/) over Simple Workflow for new projects.
2. SWF uses a "decider program" paradigm where you write the code to determine what to do.
3. Step Functions uses a declarative JSON syntax instead.)

(_End Aside_)

I also wanted to learn more about services I used in greater depth.
For example, in [AWS Simple Queue
Service](https://aws.amazon.com/sqs/), what's [long
polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-long-polling.html)
and how does it differ from the default?
I've found that the certifications have helped me improve in both areas. If
you're looking to learn more about AWS, it's worthwhile to get
certified.

## How to Get Certified

The basics for certification are easy:

1. Pick [a certificate you want](https://aws.amazon.com/certification/#roadmap)
2. Study!
3. Pay for and schedule an in-person test on [AWS's Certification
   site](https://www.aws.training/certification?src=certification)
4. Take the test

## What Cert Do You Want?

AWS currently offers 5 primary certificates and several specialty
certificates. I've heard that it's best to pursue the AWS certifications in the
following order:

### Associate-level Certifications

1. [Solutions Architect](https://aws.amazon.com/certification/certified-developer-associate/)
2.
[Developer](https://aws.amazon.com/certification/certified-developer-associate/)
3. [SysOps
   Administrator](https://aws.amazon.com/certification/certified-sysops-admin-associate/)

#### Why?

Solutions Architect introduces you to most AWS services. For example, it may
cover how to build the networks for a Virtual Private Cloud (VPC).
The certification gives you a base to build the rest of your knowledge and
understanding of the AWS ecosystem.

The Developer certification, at least in 2018, focuses
on serverless technologies like AWS Lambda and API Gateway. It touches on the
code-related suite of tools for AWS as well, such as CodeDeploy and
CodePipeline.

The SysOps Administrator certificate covers deploying, managing, and operating
services.  The earlier versions of the certification covered similar ground to
Solutions Architect. I suspect the 2018 update will also include serverless
technologies, like AWS X-Ray.

### Specialty Certifications

If you'd like, you can pursue the specialty certs:

1.  [Security](https://aws.amazon.com/certification/certified-security-specialty/)
2. [Advanced Networking](https://aws.amazon.com/certification/certified-advanced-networking-specialty/)
3. [Big Data](https://aws.amazon.com/certification/certified-big-data-specialty/)

The Security certificate is particularly valuable. Any of the other
certifications may ask security questions and security is tricky.

### Professional-level Certifications

Finally, you can wrap up with the professional level certificates:

1. [DevOps
   Engineer](https://aws.amazon.com/certification/certified-devops-engineer-professional/)
2. [Solutions
   Architect](https://aws.amazon.com/certification/certified-solutions-architect-professional/)

I can't speak in depth to either of these certificates as I haven't started
studying for them.

The DevOps Engineer certificate builds on the Developer and
SysOps Administrator Associate certifications. It also builds on the
the Security and Advanced Networking certification
materials.

The Solutions Architect - Professional certificate covers most of the AWS
services at a deep level.
I've also heard that it's the hardest certification to pass.

## Studying Recommendations

### What to Study

This is what I've done so far to pass certifications and I'd recommend the same
for anyone else:

* Watch training videos

I've watched videos from both [A Cloud Guru](https://acloud.guru/) and [Linux
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
certifications, it's useful to review the full FAQs for main service. For example, I reviewed
the [DynamoDB FAQs](https://aws.amazon.com/dynamodb/faqs/) or [AWS Lambda
FAQs](https://aws.amazon.com/lambda/faqs/) for Developer - Associate.

* Take practice tests

A good way to solidify your knowledge is to take practice tests. If you use
A Cloud Guru or Linux Academy, they each have comprehensive practice exams you
can take.

AWS also offers a free practice exam with a few questions for each
certification type. For example, click the "Download sample questions" link on
[the Solutions Architect - Associate
page](https://aws.amazon.com/certification/certified-solutions-architect-associate/).

* Pace yourself

Studying each day helps improve your long-term memory and retention
better than cramming. Consider using [spaced repetition](https://www.gwern.net/Spaced-repetition)
(e.g. [Anki](https://apps.ankiweb.net/). It can help with remembering what each
service does.

* Try the labs

Either on your own or with the help of a study site, try to use the services
you're learning about. The certifications are a great way to learn about
a service but, for me, there's no better way than using it a project.

## Is it worth it?

It's worthwhile to [learn and be curious](https://www.amazon.jobs/principles).

I'm glad that I've spent the time doing it. Learning more about the AWS
ecosystem has allowed me to get up to speed on new projects in less time than
before. The certification process gives you a good base in AWS. It's
also satisfying to overcome a challenge so I'd do it again and plan to finish
out the certs.
