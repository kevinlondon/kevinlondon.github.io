---
layout: post
title: "DevOps From Scratch"
date:  2016-02-24 21:09:00
---

Let's say you're at a startup and everything is going great. Your app is
growing, users are happy, money is coming in.

What happens if some story about your app breaks on TechCrunch and you need to
scale up at 3 AM to prevent your site from crashing?
What if someone accidentally deletes a few of your application servers?
Would it be easy to replace them?

If you handle infrastructure manually, these scenarios can sound spooky.
It can be hard to make sure you've captured everything about your
servers when they've been set up manually.

How great would it be if we could automate our infrastructure and make adding new
servers simple and easy?

But where do you start? There's so many DevOps tools, it can be overwhelming to
pick when you're starting from scratch.

In this tutorial, we'll walk create and deploy a Python web
application to Amazon. We'll use some DevOps tools such as Ansible,
Terraform, and Vagrant and talk about other services that support our
application, such as Flask and gunicorn.

Let's get started!


## Overview

At the end, we'd like a tiny application that we can automatically provision
and deploy.

We'll use the Python-based Flask framework for our web application because it's
easy to pick up. We'll also say that we'd like to deploy new versions of our
application with `Git`.

Neither of these may be exactly the way you'd choose to
do it. That's okay! The goal of this tutorial is to reduce choice enough to
get to an end goal. If there are things you'd like to change afterwards,
awesome.

We'll do each step manually and then automate the action we've just done. I find
that doing something manually the first time helps me understand why we're doing
it. Doing it twice will also help show why it's useful to automate it because of
the time it saves.

You could bypass this process by using something like
[Heroku](https://www.heroku.com/) but it's helpful to understand how the app
works under the hood and why it is constructed in the way that it is.

Our general workflow will be as follows, we'll:

1. Get the application running on our local machine
2. Setup the application on a virtual machine with Vagrant
3. Automate setting up the application in Vagrant with Ansible
4. Manually set up our Amazon instance and deploy our application to it
5. Automate the Amazon setup with Terraform
6. Automatically provision our Amazon account with Terraform and deploy with
   Ansible

## Local Development

Let's start a [Flask](http://flask.pocoo.org/) application. We're going to
pretend that this tiny app is part of a much larger picture.

To get started, we'll assume that you already have [Git](https://git-scm.com/)
installed. You can run `git clone
https://github.com/kevinlondon/flask-hello-world.git` to get a copy of the small
project we'll be working with. It's from the [Flask
quickstart](http://flask.pocoo.org/). They do an excellent job explaining what
the code does as well.

In order to run it, we'll first need a few packages. From your command line,
within the directory of our `flask-hello-world` project, run:

{% highlight bash %}

$ easy_install pip
$ pip install flask gunicorn

{% endhighlight %}

Alternatively, you can run `pip install -r requirements.txt` from the cloned Git
directory to install the requirements.

After you've installed them, run `python app.py` from your Terminal. When you go
to `http://localhost:5000`, you should see our "Hello World!" page, as below.

![Hello World!](/assets/devops_from_scratch/localhost_helloworld.png)

Nice! That's about as complicated as the application itself will be.

Let's say we want to make it so anyone can develop on our application. We could
pass out the instructions we just gave (not too hard, right?). That works for
a while. We're pretending this is part of a larger project, which might have
many more steps.

Up next, we want to move our development into a virtual machine with Vagrant.

## Running Our App with Vagrant

Keeping all of our code on our local machine works fine for a while. There's two
main challenges that you'll probably encounter:

1. We'll need to replicate what it's like to set up a new server. If you're
   using your local machine, it's tough to get it to act like a fresh machine.
2. It's possible that your local machine is a different type of box than your
   server. Perhaps you're working on a Mac but deploying to a Linux box, for
   example. Even if you're running on a Linux box, maybe you're deploying to
   a different version of the operating system or a different operating system
   all together.

We'll use [Vagrant](https://www.vagrantup.com/) as our development environment
because it allows us to address both of those problems. We'll set up a virtual
machine and run it there but still write code locally.

To get started, we'll need to first [install
Vagrant](https://www.vagrantup.com/docs/installation/).

Once that's done, we should set up another folder for our DevOps stuff. In my
case, I made a folder called `devops-from-scratch` and worked in there. I'll
refer to this folder as `devops-from-scratch` from now on, but feel free to use
whatever you'd like.

From within your `devops-from-scratch` folder, run `vagrant init` in your
Terminal. This sets up a basic Vagrant configuration file that we can modify to
suit our needs.

Here's what we should change in our `Vagrantfile`:

1. Change the `config.vm.box` value to `ubuntu/trusty64`. That sets our Virtual
   Machine to use one of the latest Ubuntu distributions.
2. Uncomment the line that has `private_network` in it and note the IP address.
   (By default, it's `192.168.33.10`).

With those modifications, it should look like this:

<script src="https://gist.github.com/kevinlondon/331321615b550fb03e2141db64510210.js"></script>

Next, in your terminal, run `vagrant up`. It will download the Ubuntu image that
we specified as the `config.vm.box` value and create your server as a virtual
machine. This might take a little while, depending on your connection speed.

Once it completes, run `vagrant ssh`. It will put us into the command line of
our virtual machine (from here, referred to as a VM).

In your VM's Terminal, run the following:

{% highlight bash linenos %}

sudo apt-get install git python-pip
git clone https://github.com/kevinlondon/flask-hello-world.git
cd flask-hello-world
sudo pip install -r requirements.txt
python app.py

{% endhighlight %}

This is pretty much the same set of steps that we had followed above when we
manually set up our environment.

Let's go through each line briefly as a refresher.

1. Using our operating system's package manager, install `git` and `python-pip`.
   We're going to use git to pull down our small sample project and `python-pip`
   to install requirements for our project.
2. Create a local copy of the application.
3. Change into the cloned application's directory.
4. Install the Python package requirements for the project from the
   `requirements.txt` file in the project's directory.
5. Run the application.

When it's done, go to your browser and type `192.168.33.10:5000` in the location
bar. You should see the app!

We've done these steps twice now, so that's a good sign that we should think
about automating them so that we can build out a foundation over time.
Let's start automating what we have so far before continuing.


## Our First Ansible Playbook

To automate the steps we followed above, we will use
[Ansible](https://www.ansible.com/). Essentially, it will remotely log in to
servers that you specify using `ssh` and run commands on them.

To begin, let's first install Ansible. On your host machine (not the vm), run
`pip install ansible`.

Let's create a file called `site.yml` in the same folder as your `Vagrantfile`.
This will be our Ansible
[playbook](http://docs.ansible.com/ansible/playbooks.html), and it will contain
our automation steps. `site` implies that this is the only file needed to get
a successful version of our site up and running. The `.yml` extension tells us
that it's a [YAML](http://www.yaml.org/start.html)-formatted file (Ansible's
preference).

<script
src="https://gist.github.com/kevinlondon/01a45e1f5ddd398fe8b10f2f919a45dd/a79ba3b1b3ab8b80874a5a6979a74e178acc2f4c.js"></script>

Let's review what we're doing here, line by line.

* 1: Give a human readable name to the overall step. This shows up in the terminal
    when we run it.
* 2: Apply this playbook to all hosts that we know about.
* 3-4: Run these commands as the superuser.
* 5-7: Define some variables to use for the rest of the playbook. Ansible uses
    a template engine called [Jinja2](http://jinja.pocoo.org/docs/dev/), so we can
    use these later to prevent repeating ourselves.
* 8: The `tasks` directive is the meat of what we're actually doing.
* 11: We're telling our package manager (`apt`) to install a set of packages. The
    `item` variable (indicated by the braces in Jinja) will be replaced by each
    of the items in the `with_items` block right below.
* 18: Use git to clone our application to a directory of our choosing.
* 21: Install the Python requirements from the `requirements.txt` file.

Now that we have the playbook defined, we'll need to tell our VM to use it when
setting itself up. In your `Vagrantfile`, uncomment the bottom-most section on
provisioning and modify it to look like this:

{% highlight bash %}

  config.vm.provision 'ansible' do |ansible|
    ansible.playbook = 'site.yml'
    ansible.verbose = 'v'
  end

{% endhighlight %}

We're telling Vagrant to use the `site.yml` file we created and to use
verbose output. Then, let's reprovision your host. This will run all the
commands we defined in the playbook on it.
`vagrant provision` should take care of it.

To prove that our automation works, let's redo our VM from scratch. Tearing things
down and reprovisioning them is a good way to make sure your automation
completes all of the necessary steps.

To destroy your VM, run `vagrant destroy`. After it's destroyed, type `vagrant
up` to recreate the VM and to provision it in one go.

When it comes back up, we should be able to `vagrant ssh` into our VM and run the
following to get our server up and going again:

{% highlight bash %}

cd flask-hello-world
python app.py

{% endhighlight %}

Nice! I love automation.

## Enter Gunicorn

Now that we have a decent base, we can start polishing up our application.
One of the things we'll need is a webserver to serve requests. Serving
requests through the application's debug server poses serious security risks
and it's not intended for anything like a production load.

To serve our requests, we're going with [gunicorn](http://gunicorn.org/).  Other
popular options are [uWSGI](https://uwsgi-docs.readthedocs.org/en/latest/) or
[gevent](http://www.gevent.org/) but, for the sake of constraining choice, we'll
go with this one.

We're going to assume that the rest of what you're doing here will be run within
the Vagrant box unless otherwise specified.

We've already installed gunicorn in the earlier `requirements.txt` file.  If
you're not working from the the same application repo, add a line for `gunicorn`
to your `requirements.txt` file.

After it's been installed, you should be able to run the following:

{% highlight bash %}

$ gunicorn --bind 0.0.0.0:8000 app:app

{% endhighlight %}

This will use gunicorn to serve your application through WSGI, which is the
traditional way that Python webapps are served. It replaces our usual `python
app.py` step. This is the simplest way to serve our application for now.

## Automating the Gunicorn service

Now that we have gunicorn roughly configured (it's not perfect yet of course!),
we'll want to set up a script so that we can run our server automatically
when our server restarts or just kick the process if it's stuck.

# TODO: we should use supervisord

How we'll do that is with an [upstart](http://upstart.ubuntu.com/) script.
Upstart handles starting and stopping tasks, so it's a good fit for us.

We're going to use a slightly modified script from the
[gunicorn](http://docs.gunicorn.org/en/stable/deploy.html#upstart) examples.
Create this file in the VM in `/etc/init/hello-world.conf`.

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
our server.

Great, now that we have that set up, let's automate that process! Editing files
on a server is a sure way to forget something long-term.


## Automating the automation with Ansible

Let's go back and modify our Ansible `site.yml` file. We want to copy the
`hello-world.conf` file that we created above onto our servers. In order to do
that, we need a local copy. We could copy the file directly from the VM into our
`devops-from-scratch` directory, but we'd be missing out on some of the benefits
of Ansible. Namely, that we could be using a variable instead of hard coding the
path to our repository.

In the same directory as our `site.yml` file, create a new file:
`hello-world.conf.j2`. The `.j2` extension implies that we're going to be using
it as a [Jinja2](http://jinja.pocoo.org/) template.

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
into the same directory as we used when doing it manually.

Let's add a section to the bottom of our `site.yml` file in the `tasks` section:

{% highlight bash %}

    - name: Copy Upstart configuration
      template: src=hello-world.conf.j2 dest=/etc/init/hello-world.conf

    - name: Make sure our server is running
      service: name=hello-world state=started

{% endhighlight %}

We're using Ansible's
[template](http://docs.ansible.com/ansible/template_module.html) and
[service](http://docs.ansible.com/ansible/service_module.html) modules to
accomplish our task.

What we're saying is that we want to copy the template file that we defined into
the directory that we used before. It will use the variables we have defined in
our file, inject them into the template, and write them to the
destination path we have defined.

Then, we want to make sure our service has started (just like before!). If it
hasn't been started yet, start it.

Run another `vagrant provision`, make sure everything's looking good, and we can
move on to the next step! You're doing great so far if everything is working.


## A basic nginx site

Now that we have gunicorn configured, we need an HTTP server to handle the
requests themselves and make sure we route our users to the right application.
We'll use [nginx](https://www.nginx.com/) to do this, though you could use any
number of other alternatives too. I like nginx and I've worked with it the most.

As before, we'll do the steps manually and then automate the process.

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
specify a port. Can you think of the last time you went to a site
like ebay.com and put in a port? Exactly.

We'll write our file to `/etc/nginx/nginx.conf` and it should
look like this:

<script src="https://gist.github.com/kevinlondon/2f6ec12b196733c251dda6748bc562e5.js"></script>

Our file tells nginx to look for our server a unix socket which, if our
gunicorn server is running properly, should be accessible!

At this point, if we do a `sudo service nginx restart`, we see this:

{% highlight bash %}

$ sudo service nginx restart
 * Restarting nginx nginx
   ...fail!

{% endhighlight %}


<script src="https://gist.github.com/kevinlondon/db40d7867c613bd4b0565bfe4535fc80.js"></script>


## Troubleshooting our site

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


## Automating nginx

This is actually quite simple to add to our Ansible setup.
Create another file in the same directory as `site.yml` named `hello-world.nginx.j2`
and copy the file that we defined above.

At the bottom of our `site.yml` file, we'll add this section:

We're going to modify our `site.yml` file again to include the steps necessary
to set up nginx.

When we're done, it should look like this:

<script src="https://gist.github.com/kevinlondon/01a45e1f5ddd398fe8b10f2f919a45dd/9e14c0d58d90eff576755209a7b58fcf3b5d1e67.js"></script>

In this update, we're introducing a new Ansible
concept.  A
[handler](http://docs.ansible.com/ansible/playbooks_intro.html#handlers-running-operations-on-change)
is something that takes action at the end of your chain of events.  In this
case, we're saying "If the nginx configuration changes, please notify nginx
that it should reload itself." Our handler won't restart otherwise, because we
don't need to restart nginx if everything's going great.

We also added a section in here to remove the default site if it exists. `state=absent`
means that Ansible will make sure it's not there for us.

Finally, note that we added nginx to the list of packages we need to install.

Let's run `vagrant provision` again, check out our server, and move on to the next
thing!

...

Wait, what's the next step?
We have our app running with the web server and code, so that's all good.
The next step should be to do one final check and make sure
we don't need any of the manual configuration we did along the way.

One more time, let's run a `vagrant destroy`, `vagrant up` to make sure it all works.
You should not have to SSH at any time, you should just be able to go to your
browser at `http://192.168.33.10` when it's done and see our 'Hello World' example!


## Cloud Deploy Preparation with Amazon

The next step for us with our tiny app is actually to deploy it into the wild!
We're going to deploy to [Amazon Web Service's](http://aws.amazon.com/)
[EC2](https://aws.amazon.com/ec2/) service.
Other options include Digital Ocean, Linode, Heroku, etc.

Create an Amazon account, if you don't have one yet. Our work here should be
eligible under the free tier if you've never done something with Amazon. Even if
you have, it shouldn't cost much unless you forget and leave it running
forever.


Now, sign into your Amazon [AWS console](http://aws.amazon.com/console). You
should see something like this:

![Amazon Console](/assets/devops_from_scratch/amazon_console_01a_services.png)

Make sure the dropdown in the top right says "N. Virginia". If not, select it
and switch to N. Virginia (a.k.a. US-East-1 in Amazon parlance).

Let's create a new Cloud server. Amazon generally refers to individual servers
as instances, so we'll use that terminology too.

Select "EC2" from the list of services.


![EC2 Menu](/assets/devops_from_scratch/amazon_console_01b_launch.png)

In the EC2 menu, click "Launch Instance".

![Instance Type](/assets/devops_from_scratch/amazon_console_02_provision.png)

Select "Ubuntu Server 14.04 LTS (HVM), SSD Volume Type - ami-fce3c696". We're
using the same type of OS as we used for our VM.

![Server Type](/assets/devops_from_scratch/amazon_console_03_instance_type.png)

Choose "t2.micro", which is a small, free tier-eligible instance type.
Click "Review and Launch".

There's some warnings on the next screen. They're valid, but we're
going to ignore them for now.

![Pre-launch](/assets/devops_from_scratch/amazon_console_04_launch_instance.png)

Click "Launch".

![Key Pair](/assets/devops_from_scratch/amazon_console_06_download_pair.png)

In the next screen, select "Create a new key pair". Name it 'flask-hello-world'
and click "Download Key Pair". Then click "Launch Instances".

Congratulations! We've launched our first instance.

![Launched!](/assets/devops_from_scratch/amazon_console_07_post_launch.png)

Click "View Instances".
You should return to the main Instances page and see your instance launching.
Nice!

![Our Running
Instance](/assets/devops_from_scratch/amazon_console_08_our_instance.png)

Let's quickly ssh into your box using the private key that we generated
just to make sure everything is working. You can get the public IP address on
the instance page on the bottom right.

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

Well... oops. Okay let's change the permissions on it. Run
`chmod 400 <your-key-path>/flask-hello-world.pem`. That'll change the file so that only our
user can read it. Retry your ssh connection after you've done it. Once you're
sure you can log in, that will be the last time we SSH manually into our
instance.


## Ansible x Amazon EC2 Setup

Now that we have a box up, let's configure Ansible to provision it.

Let's first make sure Ansible can ping your host and use SSH to log in to it.
Before we can begin, we need to set up the [inventory](http://docs.ansible.com/ansible/intro_inventory.html) file so
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

It's similar to what we did for `ssh`ing into the box, and with good
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
webservers` without specifying the private key or user. Give it a try!


## Deploying to AWS with Ansible

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

## AWS Security Groups for your Instance

![Security
Groups](/assets/devops_from_scratch/amazon_console_09_security_groups.png)
Click "Security Groups".

Click "Create Security Group" button along the top.

![Web Security Group](/assets/devops_from_scratch/amazon_console_10_security_group_settings.png)
Add a new security group named `web`. Click "Add Rule". For the first, select
`HTTP`. For the second, select `HTTPS`. That will allow web traffic to travel
through to your instance.
Click "Create".

![Associate the SG](/assets/devops_from_scratch/amazon_console_11_attach.png)

Now we have to associate it with our instance.  Click the "Actions" dropdown and
select "Networking" - "Change Security Groups".

![Change the Security Groups](/assets/devops_from_scratch/amazon_console_12_select_sg.png)
Select the new group in addition to the previous one.

After you've associated the group, you should actually be able to visit your
instance. Go to `http://<your-server-ip>`.

Hooray! We have a server!

Notice all those screenshots we need to accomplish this. Too much, right? Let's
automate that too. Automate all the things.

We won't need the original instance anymore, we can destroy it. Select EC2
instances again, right click your instance, and select Instance State ->
Terminate.

![Terminate!](/assets/devops_from_scratch/amazon_console_13_terminate.png)

We should also destroy the security group we created for it. Go into Security
Groups, select Web, then select Actions -> Delete Security Group.

![Delete Security Group](/assets/devops_from_scratch/amazon_console_15_delete_sg.png)

Ok, all set! No more clicking around in the AWS console for us.

## Automating AWS Instance with Terraform

Time for add another tool to our toolkit! We'll use
[Terraform](https://www.terraform.io/) to provision our
infrastructure. Again, there are many options here - including CloudFormation
and others.

Download and install Terraform from their `Downloads` page. If you use Mac OSX,
you can do a `brew install terraform` if you have [homebrew](http://brew.sh/)
installed.

Basically how Terraform works is that we'll define the different resources that
we want to set up and then we'll use Terraform to plan out what our changes will
do and, finally, apply the plan.

In the same directory as we've been working, let's make a new folder for
Terraform with `mkdir terraform`.

Then, cd into that directory and make a single new file called `main.tf`.
`*.tf` extensions indicate that they're using the Terraform syntax, which is
similar to JSON.

In that file, add the following:

<script src="https://gist.github.com/kevinlondon/efd46ec140786ecf3444d7daabfd5473.js"></script>

In the first provider block, we specify our credentials for AWS. The
`${var.aws_secret_key}` value, for example, tells Terraform to look for
a variable named `aws_secret_key` and plug the value in there. We'll define the
variables in another file shortly.

For our instance, we set the Amazon AMI ID to match the one we
selected through the GUI. An Amazon AMI is a machine image, more or less.
We also set up its key and security groups to reference other resources.
`"${aws_security_group.web.id}"` tells Terraform to look for another
`aws_security_group` resource named `web` and plug in its `id`.

Next, we set up the security group as we did in the GUI. We're letting in SSH
control (port 22), HTTP (port 80), and nothing else. We're allowing all outbound
traffic.

Finally, we create a new `aws_key_pair` to remotely ssh into our server, just as
we did when setting it up manually.

Now, we had defined a few variables in our `main.tf` file, and we need to
provide the values for those to Terraform. Let's make a new file called
`variables.tf`. It should look like this:

<script src="https://gist.github.com/kevinlondon/d792b2e3b5e36508869e5b9e218d3c3b.js"></script>

Finally, we'll need one more file, which we'll want to be sure we don't include
in version control for our folder. This file will be `terraform.tfvars`, which,
by convention, contains secret keys and such.

<script src="https://gist.github.com/kevinlondon/edf4c7a3d479fd59850621595c0b0882.js"></script>

Where do we get an `aws_access_key` and `aws_secret_key`? We should make a new
user in Amazon's console for our Terraform use. This way, if something goes
wrong with it or the key is exposed, we can replace the key for just this user.

Go back to the Amazon AWS Console.

![Create Terraform user](/assets/devops_from_scratch/amazon_console_14a_user_create.png)
Make a new account in Amazon for your Terraform user.

Make a public key for your Terraform state by following Github's [RSA creation
guide](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/).

Set your public key path in your variables file. It should be something like the
above.

We'll also need to setup our permissions for the new user. In the IAM screen,
select "Attach Policy" and choose "Administrator".

![IAM Policy Attach](/assets/devops_from_scratch/amazon_console_14b_iam.png)

Run `terraform plan`.

{% highlight bash %}

$ terraform plan -out initial

# TODO: Gather new output on second pass

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

{% endhighlight %}

And, now that we've generated a plan, we can apply it with `terraform apply
initial`.

Terraform output setup.

outputs.tf

{% highlight bash %}

output "ip" {
    value = "${aws_instance.hello_world.public_ip}"
}

{% endhighlight %}

Run a `terraform plan; terraform output` and grab your ip. Now, modify your
Ansible inventory file to include the new ip.


## Provisioning Our Server


Okay, now that that's done, we can modify our settings just a little bit for
Ansible and be done!

Modify your config to look like this: (include the new ssh path)

then run `ansible-playbook -v site.yml`. Type `yes` at the prompt to confirm
that you'd like to accept the SSH connection to this host.

At the end, you should be able to go to your site's IP.


"This is dumb why do I have to do all of this"

This is more about an investment in your future.


And it's up! Hooray!


## Next Steps

* dynamic inventory
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
