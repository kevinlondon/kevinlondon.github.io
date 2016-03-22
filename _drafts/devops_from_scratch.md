---
layout: post
title: "DevOps From Scratch"
date:  2016-02-24 21:09:00
---

Let's say you're at a startup and everything is going great. Your app is
growing, users are happy, money is coming in when, all of a sudden, your ops guy
quits.

What happens as you start to scale
up? What's your plan for building out your infrastructure? Does it involve
manually clicking around to setup new servers? What happens when you need to add
5 servers at 3 AM because some story broke in Europe and your site is buckling
under the load? What happens if half of your application servers are deleted by
a well meaning but over-permissioned intern?

Think about how nice it would be if we could scale up the number of servers we
have, deploy new application code to it, and add them into our load balancer
with a few small code changes. We'd get the opportunity to look like a hero
while saving ourselves work in the long term. If something goes wrong with an
infrastructure change, we could refer back to our version controlled code and
roll it back easily and quickly. Doesn't that sound great?

We can solve most of these problems by automating our infrastructure. But how do
you start? There's so many tools out there, how do we know which ones to pick?
And how do we get to a working site at the end?

We'll walk through automating infrastructure and deploying an application to
Amazon using modern DevOps tools such as Ansible, Terraform, and Vagrant. Along
the way, we'll talk about a few other tools as well for deploying our
application, such as uwsgi.


The Goal
========

We're a startup and we have a small proof-of-concept application that we want to
deploy on some new servers. In this case, our application is a Python-based
Flask app. For the most part, any other framework or thing could get slotted in
here too. We're going to deploy with Git for now.

Our end goal is to have a site that we can access.

We simply cannot cover everything. We'll do our best.

Start manually, then automate.
Alternatively, just automate from the beginning.

Local Development
=================

Let's start a Flask application. If you already have one, feel free to use it.
Otherwise we're going to assume that you're working from a basic Flask
application. We'll build everything as we go.

To get started, we'll assume that you have Git already installed. You can run
`git clone https://github.com/kevinlondon/flask-hello-world.git` to get a copy of
the small project we'll be working with. It's directly from the [Flask
quickstart](http://flask.pocoo.org/). They do an excellent job explaining what
the code does as well.

In order to run it, we'll first need a few packages. From your command line,
run:

{% highlight bash %}

easy_install pip
pip install flask gunicorn

{% endhighlight %}

Alternatively, you can run `pip install -r requirements.txt` from the cloned Git
directory to install the requirements.

After you've installed them, run `python app.py` from your Terminal. When you go
to `http://localhost:5000`, you should see our "Hello World!" page, as below.

![Hello World!](/assets/localhost_helloworld.png)

Nice! In our case, that's all the more we'll do with setting up the Python
application.

Let's say we want to make it so anyone can develop on our application. We could
pass out the instructions we just gave (not too hard, right?). That works for
a while. For our case, we're pretending this is an easier bit of a mucher larger
project which might have many more steps.

Up next, we want to move our development into a virtual machine with Vagrant.

We want to deploy it though, right? So let's move toward that.

Running Our App with Vagrant
============================

Install Vagrant
`vagrant init`

Change `config.vm.box` to `'ubuntu/trusty64'` to set our base box as one of the
latest Ubuntu distributions. This might take a little while, depending on your
connection speed.

* Uncomment the 'private_network' line and note the IP address (by default,
    it's `192.168.33.10`

`vagrant up`
`vagrant ssh`

`sudo apt-get install git python-pip`
`git clone https://github.com/kevinlondon/flask-hello-world.git`
`cd flask-hello-world`
`sudo pip install -r requirements.txt`
`python app.py`

Go to your browser, should see it on `192.168.33.10:5000`!

Now, before we continue, we should start automating these bits so we can track
them over time.


Our First Ansible Playbook
==========================

Let's install Ansible.

`pip install ansible`

Make the first playbook.

https://raw.githubusercontent.com/kevinlondon/devops-from-scratch/cd497a8cab16f16531431639dcb32fa9a5b8b309/site.yml

Explain why the pieces are in the playbook.

Go into Vagrant file, add this line:

`thing`

Then, let's reprovision your host. `vagrant provision` should take care of it.

Just to show how confident we are, let's start it from scratch. Tearing things
down and reprovisioning them is a good way to make sure your code is idempotent.

`vagrant destroy`. Enter 'y' at the prompt. After it's destroyed, type `vagrant
up` to recreate the virtualmachine and to provision it in one go.


When it comes back up, we should be able to `vagrant ssh` in and `cd` into our
directory and run the server.

{% highlight bash %}

cd flask-hello-world
python app.py

{% endhighlight %}

We're going to assume that the rest of what you're doing here will be run within
the Vagrnat box unless otherwise specified.

Setting up gunicorn
===================

Now that we have a decent base, we can start building up our application on top
of it. One of the things we'll need is a webserver to serve requests. Serving
requests through the application's debug server has poses serious security risks
and it's not intended for anything like a production load.

To serve our requests, we're going with gunicorn. Another popular option is
uWSGI or gevent but, for the sake of constraining choice, we'll go with this
one.

We've already installed gunicorn in the earlier requirements doc.  If you're not
working from the stock repo, add a line for `gunicorn` to your
`requirements.txt` file.

After it's been installed, you should be able to run the following:

{% highlight bash %}

$ gunicorn --bind 0.0.0.0:8000 app:app

{% endhighlight %}

This will use gunicorn to serve your application through WSGI, which is the
traditional way that Python webapps are served.

This is the simplest way to serve our application for now.


Upstart for Gunicorn
====================

Now that we have gunicorn roughly configured (it's not perfect yet of course!),
we'll want to set up a script so that we can run our server automatically
when our server restarts or just kick the process if it's stuck.

How we'll do that is with an [upstart](http://upstart.ubuntu.com/) script.
Upstart handles starting and stopping tasks, so it's a good fit for us.

We're going to use a slightly modified script from the
[gunicorn](http://docs.gunicorn.org/en/stable/deploy.html#upstart) examples.
Create this file in `/etc/init/hello-world.conf`.

{% highlight bash %}

description "hello-world"

start on (filesystem)
stop on runlevel [016]

respawn
setuid nobody
setgid nogroup
chdir /home/vagrant/flask-hello-world

exec gunicorn app:app --bind 0.0.0.0:8000

{% endhighlight %}

When you've created the file, you should be able to run `sudo service
hello-world start` to start the task, go in your browser, and then view
the service at `http://192.168.33.10:8000`, as before. The big difference is now
we have something that will run it for us, so we don't need to SSH in to run
our server. It's also on a more robust tool that we can trust.

Great, now that we have that set up, let's automate that process! Editing files
on a server is a sure way to forget something long-term.


Automating Upstart
==================

Let's go back and modify our original Ansible provisioning file. We have this
file that we want to setup, so that's good. We could directly copy the file we
have above as-is into our Ansible directory and use it but we'd be missing out
on some of the benefits of Ansible.

Namely, in this case, it's using the file as
a template. What if we have a different user than `vagrant`? Would we need
a different file? Templating helps us avoid that fate.

In the same directory (for now) as our `site.yml` file, create a new file:
`hello-world.conf.j2`. The `.j2` extension implies that we're going to be using
it as a [Jinja2](http://jinja.pocoo.org/) template. Jinja2 is a popular template
engine and the one that Ansible has blessed for their use case.

All that said, let's look at the new file we'll write:

{% highlight bash %}

description "hello-world"

start on (filesystem)
stop on runlevel [016]

respawn
setuid nobody
setgid nogroup
chdir {{ repository_path }}

exec gunicorn app:app --bind 0.0.0.0:8000

{% endhighlight %}

Subtle difference, right? We're plugging in the same variable that we're using
in our `site.yml` file into this one.

Ok, now that we have this template file, we'll need to set up Ansible to copy it
into the directory that we did.

Let's add a section to the bottom of our `site.yml` file.

{% highlight bash %}

- name: Configure application
  hosts: all
  vars:
      repository_url: https://github.com/kevinlondon/flask-hello-world.git
      repository_path: /home/vagrant/flask-hello-world

  tasks:
    . . .

    - name: Copy Upstart configuration
      template: src=hello-world.conf.j2 dest=/etc/init/hello-world.conf

    - name: Make sure our server is running
      service: name=hello-world state=started

{% endhighlight %}


What we're saying is that we want to copy the template file that we defined into
the directory that we used before. It will use the variables we have defined in
our file, inject them into the template, and write them to disc at the
destination path we have defined.

Then, we want to make sure our service has started (just like before!). If it
hasn't been started yet, start it.

Run another `vagrant provision`, make sure everything's looking good, and we can
move on to the next step! By the way, you're doing great if you're still with
us.


Setting up a basic nginx server
===============================

Now that we have gunicorn configured, we need an HTTP server to handle the
requests themselves and make sure we route our users to the right application.
We'll use nginx to do this, though you could use any number of other
alternatives too. I like nginx and I've worked with it the most.

Let's get started, shall we? As before, we'll do the steps manually and then
automate the process.

To install the package, `vagrant ssh` into your box and run `sudo apt-get install nginx`.
Confirm the prompt and let that package fly!

You should be able to go to your browser at `192.168.33.10` currently and see
nginx's version of "Hello world!".

[picture of nginx hello world]

Once you're back at your command prompt, we'll set up our first nginx
configuration file.

We're going to more or less copy the [stock nginx recommended
file](http://docs.gunicorn.org/en/stable/deploy.html) for
the sake of time. The goal of this configuration file is to make sure that we
can access our server at the same host (`192.168.33.10`) but without needing to
specify an HTTP port manually. Can you think of the last time you went to a site
like ebay.com and put in a port? Exactly.

We'll write our file to `/etc/nginx/nginx.conf` and it should
look like this:

{% highlight bash %}

worker_processes 1;

user nobody nogroup;
# 'user nobody nobody;' for systems with 'nobody' as a group instead
pid /tmp/nginx.pid;
error_log /tmp/nginx.error.log;

events {
  worker_connections 1024; # increase if you have lots of clients
  accept_mutex off; # set to 'on' if nginx worker_processes > 1
  # 'use epoll;' to enable for Linux 2.6+
  # 'use kqueue;' to enable for FreeBSD, OSX
}

http {
  include mime.types;
  # fallback in case we can't determine a type
  default_type application/octet-stream;
  access_log /tmp/nginx.access.log combined;
  sendfile on;

  upstream app_server {
    # fail_timeout=0 means we always retry an upstream even if it failed
    # to return a good HTTP response

    # for UNIX domain socket setups
    #server unix:/tmp/gunicorn.sock fail_timeout=0;

    # for a TCP configuration
    server 0.0.0.0:8000 fail_timeout=0;
  }

  server {
    # use 'listen 80 deferred;' for Linux
    # use 'listen 80 accept_filter=httpready;' for FreeBSD
    listen 80 default;
    client_max_body_size 4G;

    keepalive_timeout 5;

    location / {
      # checks for static file, if not found proxy to app
      try_files $uri @proxy_to_app;
    }

    location @proxy_to_app {
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      # enable this if and only if you use HTTPS
      # proxy_set_header X-Forwarded-Proto https;
      proxy_set_header Host $http_host;
      # we don't want nginx trying to do something clever with
      # redirects, we set the Host: header above already.
      proxy_redirect off;
      proxy_pass http://app_server;
    }
  }
}

{% endhighlight %}

Our file tells nginx to look for our server at 0.0.0.0:8000 which, if our
gunicorn server is running properly, should be accessible!

At this point, if we do a `sudo service nginx restart`, we see this:

{% highlight bash %}

$ sudo service nginx restart
 * Restarting nginx nginx
   ...fail!

{% endhighlight %}

Hm... ok. So there's some problem. Well, we defined the path for our error log
in the above nginx configuration file to be at `/tmp/nginx.error.log`, so let's
look at that file.

If we do `sudo tail -n 10 /tmp/nginx.error.log`, we see the following:


{% highlight bash %}

sudo tail -f -n 100 /tmp/nginx.error.log
2016/03/05 23:15:54 [emerg] 6249#0: bind() to 0.0.0.0:80 failed (98: Address
already in use)
2016/03/05 23:15:54 [emerg] 6249#0: bind() to 0.0.0.0:80 failed (98: Address
already in use)
2016/03/05 23:15:54 [emerg] 6249#0: bind() to 0.0.0.0:80 failed (98: Address
already in use)
2016/03/05 23:15:54 [emerg] 6249#0: bind() to 0.0.0.0:80 failed (98: Address
already in use)
2016/03/05 23:15:54 [emerg] 6249#0: bind() to 0.0.0.0:80 failed (98: Address
already in use)
2016/03/05 23:15:54 [emerg] 6249#0: still could not bind()

{% endhighlight %}

Ah, so there's a server that's already running and it can't get access to the
port. Right. Well, in this case, it's a problem with the `default` site
that's [enabled by
nginx](http://stackoverflow.com/questions/14972792/nginx-nginx-emerg-bind-to-80-failed-98-address-already-in-use). We don't need it, so let's remove it with `sudo rm /etc/nginx/sites-enabled/default`.

Run `sudo service nginx restart` and it should work. Check it out in your browser
at `http://192.168.33.10`. Cool right? It's coming along!


As before, the next step will be to automate this.


Automating nginx
================

This is actually quite simple to add to our Ansible setup.
Create another file in the same directory as `site.yml` named `nginx.conf.j2`
and copy the file that we defined above.

This time, we won't use any template variables yet. It's easy to imagine where
we might want some (error logs at `/tmp/nginx.error.log` are not the greatest),
but we will leave that as a project for later.

At the bottom of our `site.yml` file, we'll add this section:

{% highlight bash linenos %}

  tasks:
    - name: Install packages
      apt: update_cache=yes name={{ item }} state=present
      with_items:
        - git
        - python-pip
        - nginx
    . . .

    - name: Copy nginx configuration
      template: src=nginx.conf.j2 dest=/etc/nginx/nginx.conf
      notify:
        - reload nginx

    - name: Remove default site
      file: path=/etc/nginx/sites-enabled/default state=absent

    - name: Make sure nginx is running
      service: name=nginx state=started

  handlers:
    - name: reload nginx
      service: name=nginx state=reloaded

{% endhighlight %}

Woah, what's a handler? What are we notifying? We're introducing a new Ansible
concept.  A
[handler](http://docs.ansible.com/ansible/playbooks_intro.html#handlers-running-operations-on-change)
is something that takes action at the end of your chain of events.  In this
case, we're saying "If the nginx configuration changes, please notify nginx
that it should reload itself." It won't run otherwise, because we don't need to
restart nginx if everything's going great.

We also added a section in here to remove the default site. `state=absent`
means that Ansible will make sure it's not there for us.

Finally, note that we added nginx to the list of packages we need to install.

Let's run `vagrant provision` again, check out our server, and move on to the next
thing!

Wait, actually, what's the next step?
We have our app running with the web server and code, so that's all good.
The next step, in our case, should be to do one final check and make sure
we don't need any of the manual configuration we did along the way.

One more time, let's run a `vagrant destroy`, `vagrant up` to make sure it all works.
You should not have to SSH at any time, you should just be able to go to your
browser at `http://192.168.33.10` when it's done and see our 'Hello World' example!


Setting up Amazon EC2
=======================

The next step for us with our tiny app is actually to deploy it into the wild!
We're going to deploy to Amazon's EC2 service. Other options include Digital Ocean,
Linode, Heroku, etc.

Sign up for an Amazon account if you don't have one yet. Our work here should be
eligible under the free tier if you've never done something with Amazon. Even if
you have, it shouldn't cost much unless you forget and leave it running
forever.

https://aws.amazon.com/console/

Now, sign into your Amazon console. You should see something like this:

(amazon console)

Make sure the dropdown in the top right says "N. Virginia".

Let's create a new Cloud server, hereby referred to as an instance.

Select "EC2" from the list of services.

Click "Launch Instance". Select "Ubuntu Server 14.04 LTS (HVM), SSD Volume Type - ami-fce3c696".

Click "Review and Launch".

There's some warnings here. They're valid, but we're
going to ignore them for now. Click "Launch"

In the next screen, select "Create a new key pair". Name it 'flask-hello-world'
and click "Download Key Pair". Then click "Launch Instances".

Click "View Instances".

You should return to the main Instances page and see your instance launching.
Nice!

Let's quickly ssh into your box using the private key that we generated
just to make sure everything is working. You can get the public IP address on
the instance page.

In your terminal:

Type `ssh -i <your-key-path>/flask-hello-world.pem ubuntu@<your-server-ip>` (without
the brackets, of course). This will try to use the private key we downloaded
from Amazon to log in as the `ubuntu` user that's included in the image we used
to start the instance. We'll see something like this:

{% highlight bash %}

$ ssh -i /Users/kevinlondon/Downloads/flask-hello-world.pem 54.172.44.73
The authenticity of host '54.172.44.73 (54.172.44.73)' can't be established.
ECDSA key fingerprint is SHA256:Br7lA5pReSmk+WVcr9xKwPKZrs5uLaUOg1eAngkZNxU.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '54.172.44.73' (ECDSA) to the list of known hosts.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for '/Users/kevinlondon/Downloads/flask-hello-world.pem' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "/Users/kevinlondon/Downloads/flask-hello-world.pem": bad permissions
Permission denied (publickey).

{% endhighlight %}

Well... oops. Okay let's change the permissions on it. Run `chmod 400
<your-key-path>/flask-hello-world.pem`. That'll change the file so that only our
user can read it. Retry your ssh connection after you've done it. Once you're
sure you can log in, that will be the last time we SSH manually into our
instance.


Ansible x EC2 Setup
===================

Now that we have a box up, let's configure Ansible to provision it.

Let's first make sure Ansible can ping your host and use SSH to log in to it.
Before we can begin, we need to set up the
[inventory](http://docs.ansible.com/ansible/intro_inventory.html) file so
Ansible knows about our server.

Create a file called `hosts` in your Ansible directory. It'll be quite short for
now!

{% highlight bash %}

[webservers]
<your-server-ip>

{% endhighlight %}

In this file, we're describing a group of servers (`webservers`), with a single
host: the server IP we grabbed above. Once you've saved the file, you can run
the following command:

Run `ansible -m ping webservers --private_key=<your-key-path>/flask-hello-world.pem --inventory=hosts --user=ubuntu`. Here's what I saw:

{% highlight bash %}
$ `ansible -m ping webservers --private_key=~/Downloads/flask-hello-world.pem
--inventory=hosts --user=ubuntu`

54.172.44.73 | SUCCESS => {
    "changed": false,
    "ping": "pong"
    }

{% endhighlight %}

It's quite similar to what we did for `ssh`ing into the box, and with good
reason. Ansible is entirely built upon SSH. That said, this is dumb right?
I don't want to type all these command line arguments.

Great, let's make ourselves an [Ansible config
file](http://docs.ansible.com/ansible/intro_configuration.html) to automate most
of that. Create a file named `ansible.cfg` in your directory that contains the
following:

{% highlight bash %}

[defaults]
inventory = hosts
remote_user = ubuntu
private_key_file = <your-key-path>/flask-hello-world.pem

{% endhighlight %}

Now, we should be able to run `ansible ping -m all` or `ansible ping -m
webservers` without any arguments. Give it a try!


Deploying to AWS with Ansible
=============================

With all that footwork out of the way, deploying is actually very simple.
Run `ansible-playbook -v site.yml`.

It'll start deploying to your instance. Wait, what? Yep! The same file that set
up your Vagrant file can be used to configure this one. Since the `webservers`
is considered to be in the `all` group, it gets broomed up. After a minute or
so, your server should be in the same state as your Vagrant virtual machine.

At the end, we should see something like this:

{% highlight bash %}

PLAY RECAP *********************************************************************
54.172.44.73               : ok=9    changed=8    unreachable=0    failed=0

{% endhighlight %}

Then let's go to your server at `http://<your-server-ip>` annndddd....

Hm.

It's not loading. Oh, right, remember those warnings that Amazon gave us about
the security groups when we launched the instance? Yep. Now we have to take care
of that.

Setting up AWS Security Groups for your Instance
=================================================

Click "Security Groups".

Click "Create Security Group" button along the top.

Add a new security group named `web`. Click "Add Rule". For the first, select
`HTTP`. For the second, select `HTTPS`. That will allow web traffic to travel
through to your instance.
Click "Create".

Now we have to associate it with our instance.  Click the "Actions" dropdown and
select "Networking" - "Change Security Groups".  Select the new group in
addition to the previous one.

After you've associated the group, you should actually be able to visit your
instance. Go to `http://<your-server-ip>`.

TODO: Revisit socket / nginx settings. Remake from scratch.

Hooray! We have a server!

Notice all those screenshots we need to accomplish this. Too much, right? Let's
automate that too. Automate all the things.

We won't need the original instance anymore, we can destroy it. Select EC2
instances again, right click your instance, and select Instance State ->
Terminate.

We should also destroy the security group we created for it. Go into Security
Groups, select Web, then select Actions -> Delete Security Group.

Ok, all set! No more clicking around in the AWS console for us.

Automating AWS Instance with Terraform
======================================

Graphic

Time for another tool! In this case, we'll use
[Terraform](https://www.terraform.io/) to provision our
infrastructure. Again, there are many options here - including CloudFormation
and others, but we'll use Terraform.

Download and install Terraform from their `Downloads` page. If you use Mac OSX,
you can do a `brew install terraform` if you have [homebrew](http://brew.sh/)
installed.

Basically how Terraform works is that we'll define the different resources that
we want to set up and then we'll use Terraform to plan out what our changes will
do and, finally, apply the plan.


In the same directory as we've been working, let's make a new folder for
Terraform with `mkdir terraform`.

Then, cd into that directory and make a single new file called `main.tf`.
`*.tf` extensions indicate that they're using the Terraform syntax.

In that file, add the following:

{% highlight bash %}

provider "aws" {
    access_key = "${var.aws_access_key}"
    secret_key = "${var.aws_secret_key}"
    region = "${var.aws_region}"
}

resource "aws_instance" "hello_world" {
    ami = "ami-fce3c696"  # Ubuntu 14.04 for us-east-1
    instance_type = "t2.micro"
    vpc_security_group_ids = ["${aws_security_group.web.id}"]
}

resource "aws_security_group" "web" {
    name = "web"
    description = "Allow HTTP connections."

    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
    }
}

resource "aws_key_pair" "hello_world" {
    key_name = "hello_world"
    public_key = "${file(var.public_key_path)}"
}

{% endhighlight %}

`variables.tf`

{% highlight bash %}

# These variables come from the terraform.tfvars file
variable "aws_access_key" {}
variable "aws_secret_key" {}

variable "aws_region" {
    description = "AWS region in which to launch the servers."
    default = "us-east-1"
}

variable "public_key_path" {
    default = "~/.ssh/id_rsa.pub"
}

{% endhighlight %}

`terraform.tfvars`

{% highlight bash %}

aws_access_key = "your-key"
aws_secret_key = "your/secret/key"

{% endhighlight %}

Need a secret key and key?
Make a new account in Amazon for your Terraform user

Make a public key for your Terraform state by following Github's [RSA creation
guide](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/).

Set your public key path in your variables file. It should be something like the
above.

Run `terraform plan`.

{% highlight bash %}

$ terraform plan -out initial

Refreshing Terraform state prior to plan...


The Terraform execution plan has been generated and is shown below.
Resources are shown in alphabetical order for quick scanning. Green resources
will be created (or destroyed and then created if an existing resource
exists), yellow resources are being changed in-place, and red resources
will be destroyed.

Your plan was also saved to the path below. Call the "apply" subcommand
with this plan file and Terraform will exactly execute this execution
plan.

Path: initial

+ aws_instance.hello_world
    ami:                      "" => "ami-fce3c696"
    availability_zone:        "" => "<computed>"
    ebs_block_device.#:       "" => "<computed>"
    ephemeral_block_device.#: "" => "<computed>"
    instance_state:           "" => "<computed>"
    instance_type:            "" => "t2.micro"
    key_name:                 "" => "<computed>"
    placement_group:          "" => "<computed>"
    private_dns:              "" => "<computed>"
    private_ip:               "" => "<computed>"
    public_dns:               "" => "<computed>"
    public_ip:                "" => "<computed>"
    root_block_device.#:      "" => "<computed>"
    security_groups.#:        "" => "<computed>"
    source_dest_check:        "" => "1"
    subnet_id:                "" => "<computed>"
    tenancy:                  "" => "<computed>"
    vpc_security_group_ids.#: "" => "<computed>"

+ aws_key_pair.hello_world
    fingerprint: "" => "<computed>"
    key_name:    "" => "hello_world"
    public_key:  "" => "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDICLUGBvrrYfuNCOGNSXUapZXH26sZMVGZq/MlaiYBEWebAGY/ilf/GjppkEn+Jsy7NZPHUe/Hzzhrh8D8RX2wu8nV7iZD1TDsIeyjvDTNsZI3/eBUAclOaqb6hQ/u66PLreDIiiAqTrXBOiFls7cWCP37MkEIJWjkqyO/hPiWlzn9gBUsDjWqgjtP8fEmf9WqtYzum38f9X+vOSEQQFNj1zIitToUyXywbTuK7CLbVlD+dQ79/xifG5odwg1usiMRku8lQzkvzkeMQkPnXDEyZU11np8BL8zeVUt4IFVNKvwA2Y9JlbXVQ4wLj8NSek5mMHNbjkmTnjROY1SM44x/Tejvpts9uV9xJrK27YNrUWMR+20DmzVDrUF3fTlM97PbKHsEKBef+Mf/jqsI/5PFzgNMNYRjJgLHtVe5aeSLHWxPAryy7S4tf7VeVrzjWN3vBTwHhHJh0BCDTdWG8U3nF0wPx6jbWxONvK5GVDB9NonsC2/KrI3F9/+h7BQoiPE9wpY5hyml0NkbJ7vfTC8iqWen+ncPeBpfgNX/UM1MAQD3/6aUq28JqH23lBJytdgVPQMHQMXGM7axeg5vmu+hvZrkCaZkOGRilrsSApWagbmncktazTgq0lPonQJ8j6YuNV49RsfWHbF17UNw6zLj+PzGRv9u3ypLjx4BDiep8w== kevinlondon@gmail.com"

+ aws_security_group.web
    description:                          "" => "Allow HTTP connections."
    egress.#:                             "" => "<computed>"
    ingress.#:                            "" => "1"
    ingress.1145654509.cidr_blocks.#:     "" => "0"
    ingress.1145654509.from_port:         "" => "80"
    ingress.1145654509.protocol:          "" => "tcp"
    ingress.1145654509.security_groups.#: "" => "0"
    ingress.1145654509.self:              "" => "0"
    ingress.1145654509.to_port:           "" => "80"
    name:                                 "" => "web"
    owner_id:                             "" => "<computed>"
    vpc_id:                               "" => "<computed>"

{% endhighlight bash %}

And, now that we've generated a plan, we can apply it with `terraform apply
initial`.

Terraform output setup. outputs.tf

{% highlight bash %}

output "ip" {
    value = "${aws_instance.hello_world.public_ip}"
}

{% endhighlight %}

Run a `terraform plan; terraform output` and grab your ip. Now, modify your
Ansible inventory file to include the new ip.


Provisioning Our Server
=======================

Okay, now that that's done, we can modify our settings just a little bit for
Ansible and be done!

Modify your config to look like this: (include the new ssh path)

then run `ansible-playbook -v site.yml`.

At the end, you should be able to go to your site's IP.


"This is dumb why do I have to do all of this"

This is more about an investment in your future of devops.



Setup Terraform to do the same thing as you just did
Terraform some infrastructure
Apply your Ansible stuff to AWS
Victory!

Bonus Section:
Deploys

Next Steps:
-----------

* Jenkins for CI / CD?
* Immutable infrastructure?
* Deploys?
* Docker?
* VPC?
* Security Groups?
* virtualenv
* dynamic provisioning


Provide steps for setting up an application stack from scratch!

Terraform
Ansible
Vagrant

Walk them through the process *you* followed.

This post assumes you already have an application you'd like to stand up from
scratch. If not, then let's do this thing instead!

This mirrors our existing methodology. It might not be perfect, it might not be
for everyone.

Other things we'll need to talk about:

Flask
nginx
uwsgi


https://www.upwork.com/job/Amazon-Web-Services-DevOps-from-scratch-for-Startup_~01513371d4528ef639/
https://www.reddit.com/r/devops/comments/3prm8g/building_deployment_pipeline_from_scratch_advice/
https://www.digitalocean.com/community/tutorials/how-to-deploy-python-wsgi-apps-using-gunicorn-http-server-behind-nginx
