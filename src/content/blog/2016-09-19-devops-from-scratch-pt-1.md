---
title: "DevOps from Scratch, Part 1: Vagrant & Ansible"
pubDatetime: 2016-09-19T12:32:00-07:00
description: "A comprehensive guide to setting up development environments with Vagrant and Ansible automation"
tags:
  - devops
  - vagrant
  - ansible
---

Let's say you're at a startup and everything is going great. Your app is
growing, users are happy, money is coming in.

What happens if there's a news story about your company and you need
scale up at 3 AM to keep the site up?  What if Amazon decommissions
a few of your application servers?  Would it be easy to
replace them?

If you create infrastructure without automation, these scenarios can sound
spooky. You may have [snowflake servers](http://martinfowler.com/bliki/SnowflakeServer.html), each with their own configuration that
differs slightly. Capturing the complete configuration details can feel
intimidating.

It'd be great if we could automate our infrastructure and easily add new servers.
But where do you start?  There's so many DevOps tools, it can be overwhelming to
choose.

In this tutorial, we'll create and deploy a Python web application to Amazon.
We'll use some DevOps tools such as Ansible, Terraform, and Vagrant and discuss
how we'll run the application itself.

Let's get started!

## Overview

At the end, we'd like a tiny application that we can programmatically provision
and deploy.

We'll use Flask for our web application. We'll also say that we'd like to deploy
new versions of our application with `Git`.

Neither of these may be exactly the way you'd choose to
do it. That's okay! The goal of this tutorial is to constrain choice enough to
get to an end goal. If there are things you'd like to change afterwards,
awesome.

We'll perform each step and then automate the action we've just done. I find
that doing something by hand helps me understand it better.
Doing it twice will also help show why it's useful to automate it because of
the time it saves.

You could skip this process with something like
[Heroku](https://www.heroku.com/) but it's helpful to understand as much of
your application stack as you can.  It's useful knowledge when something goes
wrong.

Our general workflow will be as follows, we'll:

1. Get the application running on our local machine
2. Setup the application on a virtual machine with Vagrant
3. Automate setting up the application in Vagrant with Ansible
4. Manually set up our Amazon instance and deploy our application to it
5. Automate the Amazon setup with Terraform
6. Deploy to Amazon with Ansible

## Local Development

Let's start a [Flask](http://flask.pocoo.org/) application. We're going to
pretend that this tiny app is part of a much larger picture.

To get started, we'll assume that you already have [Git](https://git-scm.com/)
installed. You can run `git clone
https://github.com/kevinlondon/flask-hello-world.git` to get a copy of the
project we'll be working with. It's from the [Flask
quickstart](http://flask.pocoo.org/). Their docs do an excellent job explaining
what the code does as well.

To run it, we'll first need a few packages. From your command line,
within the directory of our `flask-hello-world` project, run:

```bash
$ easy_install pip
$ pip install flask gunicorn
```

Alternatively, you can run `pip install -r requirements.txt` from the cloned Git
directory to install the requirements.

After you've installed them, run `python app.py` from your Terminal. When you go
to `http://localhost:5000`, you should see our "Hello World!" page, as below.

![Hello World!](/assets/devops_from_scratch/localhost_helloworld.png)

Nice! That's about as complicated as the application itself will be.


Up next, we want to move our development into a virtual machine with Vagrant.

## Running Our App with Vagrant

Let's say we want to make it so anyone can develop on our application.
Keeping our code on our local machine works fine for a while.
We could pass out the instructions we just gave (not too hard, right?).
There's two main challenges that you'll encounter:

1. We'll need to replicate what it's like to set up a new server. If you're
   using your local machine, it's tough to get it to act like a fresh machine.
2. It's possible that your local machine is a different type of box than your
   server. Perhaps you're working on a Mac but deploying to a Linux box, for
   example. Maybe you're deploying to
   a different version of the operating system or a different operating system
   all together.

We'll use [Vagrant](https://www.vagrantup.com/) for our development environment
because it allows us to address these challenges. We'll set up a virtual
machine and run it there but still write code locally.

To get started, we'll need to first [install
Vagrant](https://www.vagrantup.com/docs/installation/).

Once that's done, we should set up another folder for our DevOps stuff. In my
case, I made a folder called `devops-from-scratch` and worked in there. I'll
refer to this folder as `devops-from-scratch` from now on, but feel free to use
whatever you'd like.

From within your `devops-from-scratch` folder, run `vagrant init` in your
Terminal. This sets up a basic Vagrant configuration file that we can change to
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

```bash
sudo apt-get update
sudo apt-get install git python-pip
git clone https://github.com/kevinlondon/flask-hello-world.git
cd flask-hello-world
sudo pip install -r requirements.txt
python app.py
```

This is pretty much the same set of steps that we had followed above when we
manually set up our environment.

Let's go through each line briefly as a refresher.

0. Refresh the system's package cache.
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
Let's automate what we have so far before we continue.


## Our First Ansible Playbook

To automate the steps we followed above, we will use
[Ansible](https://www.ansible.com/). Essentially, it will log in to
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
* 9: The `tasks` directive is the meat of what we're actually doing.
* 11: We're telling our package manager (`apt`) to install a set of packages.
  Jinja will replace the `item` variable (indicated by the braces in Jinja) with
  each of the items in the `with_items` block right below.
* 18: Use git to clone our application to a directory of our choosing.
* 21: Install the Python requirements from the `requirements.txt` file.

Now that we have the playbook defined, we'll need to tell our VM to use it when
setting itself up. In your `Vagrantfile`, uncomment the bottom-most section on
provisioning and change it to look like this:

```bash
  config.vm.provision 'ansible' do |ansible|
    ansible.playbook = 'site.yml'
    ansible.verbose = 'v'
  end
```

We're telling Vagrant to use the `site.yml` file we created and to use
verbose output. Then, let's reprovision your host. This will run all the
commands we defined in the playbook on it.
`vagrant provision` should take care of it.

To prove that our automation works, let's redo our VM from scratch. Tearing things
down and reprovisioning them is a good way to make sure your automation
completes all the necessary steps.

To destroy your VM, run `vagrant destroy`. After it's destroyed, type `vagrant
up` to recreate the VM and to provision it in one go.

When it comes back up, we should be able to `vagrant ssh` into our VM and run the
following to get our server up and going again:

```bash
cd flask-hello-world
python app.py
```

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

```bash
$ gunicorn --bind 0.0.0.0:8000 app:app
```

This will use gunicorn to serve your application through WSGI, which is the
traditional way that Python webapps are served. It replaces our usual `python
app.py` step. This is the simplest way to serve our application for now.

## Automating the Gunicorn service

Now that we have gunicorn roughly configured (it's not perfect yet of course!),
we'll want to set up a script so that we can run our server automatically
when our server restarts or just kick the process if it's stuck.

How we'll do that is with an [upstart](http://upstart.ubuntu.com/) script.
Upstart handles starting and stopping tasks, so it's a good fit for us.

We're going to use a slightly modified script from the
[gunicorn](http://docs.gunicorn.org/en/stable/deploy.html#upstart) examples.
Create this file in the VM in `/etc/init/hello-world.conf`.


```bash
description "hello-world"

start on (filesystem)
stop on runlevel [016]

respawn
setuid nobody
setgid nogroup
chdir /home/vagrant/flask-hello-world

exec gunicorn app:app --bind 0.0.0.0:8000
```

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
`hello-world.upstart.j2`. The `.j2` extension implies that we're going to be using
it as a [Jinja2](http://jinja.pocoo.org/) template.

All that said, let's look at the new file we'll write:


```bash
description "hello-world"

start on (filesystem)
stop on runlevel [016]

respawn
setuid nobody
setgid nogroup
chdir {% raw %}{{ repository_path }}{% endraw %}

exec gunicorn app:app --bind 0.0.0.0:8000
```

Subtle difference, right? We're plugging in the same variable that we're using
in our `site.yml` file into this one.

Ok, now that we have this template file, we'll need to set up Ansible to copy it
into the same directory as we used when doing it manually.

Let's add a section to the bottom of our `site.yml` file in the `tasks` section:

```bash
    - name: Copy Upstart configuration
      template: src=hello-world.upstart.j2 dest=/etc/init/hello-world.conf

    - name: Make sure our server is running
      service: name=hello-world state=started

```

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


Once you're back at your command prompt, we'll set up our first nginx
configuration file.

We're going to more or less copy the [stock nginx recommended
file](http://docs.gunicorn.org/en/stable/deploy.html) for
the sake of time. The goal of this configuration file is to make sure that we
can access our server at the same host (`192.168.33.10`) but without needing to
specify a port. Can you think of the last time you went to a site
like [eBay](https://www.ebay.com) and put in a port? Exactly.

We'll write our file to `/etc/nginx/sites-enabled/hello-world` and it should
look like this:

<script src="https://gist.github.com/kevinlondon/2f6ec12b196733c251dda6748bc562e5.js"></script>

Our file tells nginx to look for our server a unix socket which, if our
gunicorn server is running properly, should be accessible!

At this point, if we do a `sudo service nginx restart`, we see this:

```bash
$ sudo service nginx restart
 * Restarting nginx nginx
   ...fail!
```


Oh right, the unix socket. Ok, let's make a few more changes to the way gunicorn
works.

<script src="https://gist.github.com/kevinlondon/db40d7867c613bd4b0565bfe4535fc80.js"></script>


## Troubleshooting our site

Hm... ok. So there's some problem. Well, we defined the path for our error log
in the above nginx configuration file to be at `/var/log/nginx/error.log`, so let's
look at that file.

If we do `sudo tail -n 10 /var/log/nginx/error.log`, we see the following:


```bash
sudo tail -f -n 100 /var/log/nginx/error.log
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
```

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

The next step for us with our tiny app is actually to deploy it into the wild!
We’re going to deploy to Amazon Web Service’s EC2 service. Other options include
Digital Ocean, Linode, Heroku, etc.

One more time, let's run a `vagrant destroy`, `vagrant up` to make sure it all works.
You should not have to SSH at any time, you should just be able to go to your
browser at `http://192.168.33.10` when it's done and see our 'Hello World' example!


### Up Next: Amazon & Terraform!

Congrats on making it this far!

In the [next part of this
series](https://www.kevinlondon.com/2016/09/20/devops-from-scratch-pt-2.html),
we will deploy the app to Amazon and automate infrastructure provisioning with
Terraform.
