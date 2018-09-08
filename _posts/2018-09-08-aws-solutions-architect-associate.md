---
layout: post
title: AWS Certified Solutions Architect - Associate Notes
date: 2018-09-08 16:23:08
---

I recently passed the [Solutions Architect - Associate
certification](https://aws.amazon.com/certification/certified-solutions-architect-associate/)
for AWS and thought I'd share notes on preparing for the
certification. In
a previous post, I covered the [overall certification process]({{ site.baseurl
}}{% post_url 2018-09-04-aws-certifications %}) and general tips. Let's get
to it!

## Frequently Asked Questions

### Why should I study for this cert in particular?

The AWS Certified Solutions Architect - Associate exam provides the best overview
of the certifications. It covers how to use most commonly used AWS services to
build highly available and reliable services. It's ideal if you
have some experience working with AWS and designing distributed applications,
but you don't need to be an expert in it.

### What does it cover?

We'll cover this in more detail below. In short, it covers the core AWS services
that you're like to encounter. It primarily covers:

* [Identity and Access Management (IAM)](https://aws.amazon.com/iam/)
* [Virtual Private Cloud (VPC)](https://aws.amazon.com/vpc/)
* [Simple Storage Service (S3)](https://aws.amazon.com/s3/)
* [Elastic Compute Cloud (EC2)](https://aws.amazon.com/ec2/)
* [Relational Database Service (RDS)](https://aws.amazon.com/rds/)
* [DynamoDB](https://aws.amazon.com/dynamodb/)
* [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)
* [Simple Queue Service (SQS)](https://aws.amazon.com/sqs/)
* [Simple Notification Service (SNS)](https://aws.amazon.com/sns/)
* [Cloudwatch](https://aws.amazon.com/cloudwatch/)

### Which version should I take?

At the time of writing, there's two versions of the certification:

* Pre-2018
* [The 2018 version, released in
    February](https://aws.amazon.com/about-aws/whats-new/2018/02/updated-aws-certified-solutions-architect-associate-exam-now-available/)

If you're starting now, I'd recommend taking the 2018 version as it will cover
newer services and includes segments from the [Well-Architected
Framework](https://aws.amazon.com/architecture/well-architected/) material.
I took the pre-2018 version because the material I found online only covered
that version at the time. Because I studied for the older exam, some of the tips
in this guide may not be applicable to the newer exam.

### How did you prepare?

I covered my general study recommendations in the [Intro to AWS
Certifications]({{ site.baseurl
}}{% post_url 2018-09-04-aws-certifications %})
post, so please check that out. In addition, I consulted posts about other
people's experience taking the exams. In particular, I read through:

* [My Path to Solutions Architect
    Associate](https://acloud.guru/forums/aws-certified-solutions-architect-associate/discussion/-KKr5HCv2bzH3EOBSUAt/my_path_to_solutions_architect)
* [A Cloud Guru
    FAQs](https://acloud.guru/forums/aws-certified-solutions-architect-associate/discussion/-KSS5nf3pekHgwDEuNnF/new_here__read_this_through!)
* [Exam
    Feedback](https://acloud.guru/forums/aws-certified-solutions-architect-associate/discussion/-KSDNs4nfg5ikp6yBN9l/exam_feedback)

One final note is that you should build things in AWS.
Reviewing the lectures and reading through docs is helpful, but actually working
with the services will help it stick.

### How long did it take you?

The test took me longer than the Developer - Associate exam because it was my
first AWS cert. I may have overprepared because I wanted to pass on the first attempt.
Some numbers:

* [LinuxAcademy course](https://linuxacademy.com/cp/modules/view/id/228):
    * ~12 hours: 20 hours of lectures at 1.5 or 2x speed
    * ~10 hours: Labs
    * 5 hours: 4x final practice exams
* 4 hours: 3x final practice exams from [ACloudGuru
    course](https://acloud.guru/course/aws-certified-solutions-architect-associate/)
* 5 hours: Reading online resources and other posts
* ~10 hours: Reading the AWS Whitepapers and FAQs

That's about 46 hours total. It sounds like a long time when
I look at the numbers. In practice, I'd often spend an hour or so a night and
sometimes a few hours on the weekend. I studied over 2 or 3 months before I took
the exam.

### What should I know about the test?

* It's multiple choice or multiple answer.
* For the newer exam (2018), you have 130 minutes to answer 50 to 70 questions.
* It costs $150 to take the exam.

## Study Notes

This is roughly ordered in the frequency you'll encounter topics for the course.
For each service, I've included a set of questions with reference links for the
kinds of things the certification covers.

### IAM

* [What is it and how does it fit in with the rest of the
    services?](https://aws.amazon.com/iam/)
* [What's an IAM
    user?](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html)
* [Group?](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html)
* [What's an IAM role and when should you use
    it?](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)
* [How do you generate IAM Access
    Keys?](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)
* [How should you grant permission for an AWS instance to call AWS
	services?](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html)

### VPC

* [What's a VPC and why would you want one?](https://aws.amazon.com/vpc/)
* [How do you do networking in
    a VPC?](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Networking.html)
* [What's a private subnet?
    Public?](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-public-private-vpc.html)
* [What's an Internet
    Gateway?](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html)
* [What's a NAT
    Gateway?](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)
* [How do you build a secure
    network?](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html)

### EC2

* [What is EC2 and why is it useful?](https://aws.amazon.com/ec2/)
* [How do you create a copy of your EC2
    instance?](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html)
* [How can you control what the server does on
    boot?](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html)
* [What are some different ways you can purchase
    instances?](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html)
* [What's an instance type?](https://aws.amazon.com/ec2/instance-types/)
* [What's a public IP?
    Private?](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-instance-addressing.html)
* [How do you access instance metadata from within the
    host?](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html)
* [What are security groups and how do you use
    them?](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html)
* [What are the different storage
    options?](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Storage.html)
* [How do you connect to an EC2
    instance?](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html)
* [If you can't connect to a server, what should you
    check?](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/TroubleshootingInstancesConnecting.html)
* [What's an ELB?](https://aws.amazon.com/elasticloadbalancing/)
* [What's an Availability Zone and how does it differ from
    a Region?](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)


### S3

* [When should you use S3?](https://aws.amazon.com/s3/)
* [What's a lifecycle policy and how do you use
    them?](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-lifecycle.html)
* [What limits are there on S3 operations (e.g. reads / writes per
    second)?](https://docs.aws.amazon.com/AmazonS3/latest/dev/request-rate-perf-considerations.html)
* [How do you control permissions for
    S3?](https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html)
* [How can you host a website on
    S3?](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)
* [What's CORS and why does it
    matter?](https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html)
* [What's CloudFront and how does it relate to
    S3?](https://aws.amazon.com/cloudfront/)

### RDS

* [What kinds of database can you create in
    RDS?](https://aws.amazon.com/rds/details/)
* [What security concerns should you keep in
    mind?](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.html)
* [What's a multi-AZ deployment and when should you use
    it?](https://aws.amazon.com/rds/details/multi-az/)
* [What's a read replica and how does it help with
    performance?](https://aws.amazon.com/rds/details/read-replicas/)
* [What happens if the database instance
    fails?](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html#Concepts.MultiAZ.Failover)

### DynamoDB

* [What are the advantages of DynamoDB?](https://aws.amazon.com/dynamodb/)
* [How do you control how much throughput your table can
    handle?](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ProvisionedThroughput.html)
* [What's the difference a Global and Local Secondary
    Index?](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html)

### Elastic Beanstalk

* [When would you use Elastic
    Beanstalk?](https://aws.amazon.com/elasticbeanstalk/)
* [How do you control the configuration of your EBS
    deploy?](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html)

### SQS

* [What's SQS and why would you use it?](https://aws.amazon.com/sqs/)
* [What does AWS say make about message ordering?](https://aws.amazon.com/sqs/faqs/)
* [What's long polling? Why is it better than the
    default?](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-long-polling.html)
* [What's the VisibilityTimeout parameter? What are the limits for
    it?](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)
* [What's the maximum retention time you can have on an SQS
    message?](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SetQueueAttributes.html)
* [What's the difference between the default SQS implementation and
    FIFO?](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html)

### SNS

* [What can you use SNS to do?](https://aws.amazon.com/sns/)
* [What's pubsub?](https://aws.amazon.com/pub-sub-messaging/)
* [What requirements are there for emailing someone through
    SNS?](https://docs.aws.amazon.com/sns/latest/dg/SubscribeTopic.html)

### Cloudwatch

* [What are the primary uses of Cloudwatch?](https://aws.amazon.com/cloudwatch/)
* [How do you view logs in
    Cloudwatch?](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)
* [What's the minimum time metric resolution can you select for
    Cloudwatch?](https://aws.amazon.com/blogs/aws/new-high-resolution-custom-metrics-and-alarms-for-amazon-cloudwatch/)

### Others

These are covered in less depth. It's still helpful to know about them and play
around if you have time.

* [Lambda](https://aws.amazon.com/lambda/)
* [Route53](https://aws.amazon.com/route53/)
* [ElastiCache](https://aws.amazon.com/elasticache/): When to use, how it can helps with database performance.
* [Storage Gateway](https://aws.amazon.com/storagegateway/): When to use, different types.
* [Redshift](https://aws.amazon.com/redshift/)
* [Kinesis](https://aws.amazon.com/kinesis/): What's a data stream? How long are items retained?
* [EMR](https://aws.amazon.com/emr/)
* [CloudTrail](https://aws.amazon.com/cloudtrail/)
* [CloudFormation](https://aws.amazon.com/cloudformation/)

## Wrapping Up

Best of luck getting your AWS Certification! Pace yourself and try to enjoy the
process. Please let me know if you get certified and / or if you found this
helpful in your studies.
