---
layout: post
title:  "Answers to Django Security Questions"
date:   2015-10-16 13:56:04
---

How much do you know about Django's security protections? Do you feel
confident that you could secure a Django application from attackers?

Levi Gross, in [Django Security Interview Questions](https://web.archive.org/web/20190924123854/www.levigross.com/2014/02/07/django-security-interview-questions),
has a list of security questions to explore. He opens with this:

> I feel that every Django developer should know the answer to the questions below.
> If you don’t, look it up.

When I looked at the list, I didn't feel like I knew the answers to any of them!
I had a hard time finding answers because of the open-ended nature of the
questions.

I'd like to share what I found with you.

Before We Begin
---------------

I recommend looking through Levi's post and writing down ideas for each answer.
If you don't know the answer, that's okay.  If you get stuck, feel free to
consult the list below. I think you'll find it more valuable if you work through
it and find your personal areas for improvement. I did not know what Django uses
to hash passwords by default, to name just one example.

I should also mention that I ran these answers by Levi first and he gave me
a few notes.

Answers
----------

### What is wrong with the following template snippet?

{% highlight html %}
    <a href="http://www.google.com/" class={% raw %}{{ user_class }}{% endraw %} >Google</a>
{% endhighlight %}

If the user defines what goes into `{% raw %}{{ user_class }}{% endraw %}`,
an attacker could use the variable to introduce a cross-site scripting bug.
For example, if a malicious user
set the `{% raw %}{{ user_class }}{% endraw %}` to something like `"" onclick="alert('hello!');"`,
then clicking the link could pop up a JavaScript alert and, in the hands of
someone malicious, could do [much worse](https://www.owasp.org/index.php/DOM_Based_XSS).

Django, by default, has [automatic HTML
escaping](https://docs.djangoproject.com/en/1.7/topics/templates/#automatic-html-escaping)
turned on, so it *may* protect us from this attack, depending on what
the user has entered. As we discuss later, HTML escaping does not cover every
use case.

For example, if the code called
[`mark_safe()`](https://docs.djangoproject.com/en/1.8/ref/utils/#django.utils.safestring.mark_safe)
on the variable, then Django would inject it directly into the template without
escaping.  Similarly, if the template includes `{% raw %}{% autoescape off %}{% endraw %}`
before the snippet, Django would not try to escape it.

### Identify the security vulnerability in the following code. What is it? How can it be exploited?

{% highlight python %}

class CatViewer(TemplateView):
    template_name = 'view_cats.html'

    def post(self, request, *args, **kwargs):
        form = CatViewForm(self.request.POST)
        if not form.is_valid():
            return self.get(request, form=form)
        form.instance.cat_image = b64encode(urlopen(form.instance.picture_url).read())
        form.save()
        return redirect('cat_viewer')


    def get_context_data(self, **kwargs):
        return {
            'form': kwargs['form'] if 'form' in kwargs else CatViewForm(),
            'cat_pics': CatView.objects.all(),
        }

{% endhighlight %}

The `urlopen()` call poses the most danger because it can open
arbitrary urls
([including file urls!](http://www.levigross.com/2014/07/04/security-concerns-with-pythons-urllib-and-urllib2/)).
An attacker could set the `picture_url` to `file:///etc/password`.
Then, when they visit the page, they may see the contents of
[`/etc/password`](https://en.wikipedia.org/wiki/Passwd) as a base 64 encoded value.

### Provide ways to identify a Django application during a blackbox test?

1. If the site uses the Django administration panel, it can be accessed at the
   `/admin` route. If it uses the default theme, that's a dead giveaway.
2. If the application has `DEBUG = True` and you go to an invalid page,
   it will show diagnostic information, including the version of Django it uses.
3. If the server responds with headers that include something like `Server:
   WSGIServer/0.1 Python/2.7.6`, that points to a Python-based web framework,
   which narrows the field.
4. If you get a stock Django error page for a [400, 403, 404, or 500 status code
   response](https://github.com/django/django/blob/master/django/views/defaults.py)
   with messaging unique to Django.
5. If you POST a form and do not include a CSRF token, the application may
   return the default CSRF error for Django.

### What is the default password hash algorithm that Django uses? Were there any recent changes?

[PBKDF2](https://docs.djangoproject.com/en/1.8/topics/auth/passwords/#how-django-stores-passwords)
with HMAC and SHA256. Django increases the number of iterations for each major
release as hardware gets faster and cheaper.  Higher numbers of iterations mean
that it takes longer to crack each password.  Here's the number for each of
the last few releases:

* 1.6.x: [12k iterations](https://github.com/django/django/blob/stable/1.6.x/django/contrib/auth/hashers.py#L230)
* 1.7.x: [15K iterations](https://github.com/django/django/blob/stable/1.7.x/django/contrib/auth/hashers.py#L230)
* 1.8.x: [20K iterations](https://github.com/django/django/blob/stable/1.8.x/django/contrib/auth/hashers.py#L229)
* 1.9.x: [24K iterations](https://github.com/django/django/blob/stable/1.9.x/django/contrib/auth/hashers.py#L229)

### Given a Django settings file, which items would stand out (whether they are missing or not) and why?

* [DATABASES](https://docs.djangoproject.com/en/1.8/ref/settings/#databases). If
the application specifies the database settings in the settings
file, it increases the risk associated with leaking the file or checking it into
source control.

* [ALLOWED_HOSTS](https://docs.djangoproject.com/en/1.8/ref/settings/#allowed-hosts):
This setting prevents poisoning caches and triggering password
reset emails with links to malicious sites.

* [DEBUG](https://docs.djangoproject.com/en/1.8/ref/settings/#std:setting-DEBUG):
The application must set this to False for any production or production-like
environment. It enables information leakage, has performance implications, and
yields full tracebacks on error.

* [ADMINS](https://docs.djangoproject.com/en/1.8/ref/settings/#admins): Django
emails a full exception traceback on errors when `DEBUG = False` to the email
addresses specified in the `ADMINS` tuple. If the company or individual that
created the Django application does not control the email addresses specified,
it cause an information leak.

* [FILE_UPLOAD_PERMISSIONS](https://docs.djangoproject.com/en/1.8/ref/settings/#file-upload-permissions):
Setting this value incorrectly will yield unexpected results when users upload
a file.

* [SECRET_KEY](https://docs.djangoproject.com/en/1.8/ref/settings/#secret-key):
Exposing the secret key means that an attacker can, under
some circumstances, execute code remotely and it invalidates the safety of
sessions.

* [SECURE_PROXY_SSL_HEADER](https://docs.djangoproject.com/en/1.8/ref/settings/#secure-proxy-ssl-header):
The documentation says that settings this incorrectly or not setting it when
it needs to be can create security holes.

* Any of the headers under the [Security section](https://docs.djangoproject.com/en/1.8/ref/settings/#security).

### How does Django know to escape certain values?

Django checks for 5 characters to
[auto-escape](https://docs.djangoproject.com/en/1.8/ref/templates/language/#automatic-html-escaping)
whenever it goes to render them into templates: `<`, `>`, `'`, `"`, and `&`.
Note: this list does not include one additional character that [OWASP recommends
escaping](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet#RULE_.231_-_HTML_Escape_Before_Inserting_Untrusted_Data_into_HTML_Element_Content):
`/`.

If unescaped, these values could lead to XSS or other issues related to
injecting unsafe input into a template.

### Are Django values “safe” when rendered in Javascript?

No.
[`escapejs`](https://docs.djangoproject.com/en/dev/ref/templates/builtins/#escapejs),
if called explicitly, will make it safe to use in JavaScript but not safe from
XSS or other forms of attack. `escapejs` is designed to prevent syntax errors.

### Is it possible to execute a mass assignment attack against a Django model? If yes, how and when?

[Yes](http://coffeeonthekeyboard.com/mass-assignment-security-part-10-855/),
though the maintainers have patched it to make it more challenging.  If the
application bypasses forms and directly passes in data from a request to the
object manager for a model, that can cause a mass assignment attack.  In Django
[1.5.x or
older](https://docs.djangoproject.com/en/1.8/releases/1.6/#modelform-without-fields-or-exclude),
using a ModelForm without specifying fields on the class could also make it
possible to execute the attack.

### What parts of Django are susceptible to SQL injection attacks and how does Django defend against these attacks?

Using [`raw()`, `extra()`, or SQL statements
directly](https://docs.djangoproject.com/en/1.8/topics/security/#sql-injection-protection)
bypasses the protections offered by Django's ORM and could lead to SQL
injection. Using the ORM offers the best protection.

### Why is the SECRET_KEY so important?

Django uses the `SECRET_KEY` for cryptographic signing and security safeguards,
such as cookies and sessions.  if an attacker got the `SECRET_KEY` and the site
uses the `PickleSerializer` and cookie-based sessions, they could craft a cookie
such that it would cause [remote code
execution](https://docs.djangoproject.com/en/1.8/topics/http/sessions/#using-cookie-based-sessions),

Change the `SECRET_KEY` value immediately if it gets leaked.

### When looking for a denial of service vector, which part of Django stands out as the most vulnerable?

* Any sort of aggregate query or report could be a vector for DoS, depending
on how the application uses caching. Interacting with the database slows
Django down, so hitting pages that require large or numerous queries could
cause the server stop responding.

* Several DoS-related bugs have been found lately in
[session](https://docs.djangoproject.com/en/1.8/releases/1.8.4/#denial-of-service-possibility-in-logout-view-by-filling-session-store)
[management](https://docs.djangoproject.com/en/1.8/releases/1.8.3/#denial-of-service-possibility-by-filling-session-store),
so it's possible that there's a denial of service vector that has not yet been
found.

* Django does not throttle requests for users by default, so that may pose
a denial of service risk as well.

### Is Django threadsafe? If not, how does this effect the security of the application?

[Yes*](https://docs.djangoproject.com/en/1.9/howto/custom-template-tags/#thread-safety-considerations).
Django itself is thread-safe.  Problems arise when applications written on top
of Django do not properly handle threads or use an insufficient database
transaction type. It can be challenging to write thread-safe custom middleware.

Thankfully, `get_or_create()` should be [thread-safe and
atomic](http://stackoverflow.com/questions/6586552/django-how-to-do-get-or-create-in-a-threadsafe-way/22095136#22095136),
so no need to worry about
[TOCTOU](https://en.wikipedia.org/wiki/Time_of_check_to_time_of_use) problems
with that.

### How does Django’s permission model work? Is it effective?

Django, out of the box, includes a ["simple permission
system"](https://docs.djangoproject.com/en/1.8/topics/auth/default/#permissions-and-authorization).
Adding `django.contrib.auth` to the INSTALLED_APPS section means that Django
will create three permissions per model: [create, delete,
change](https://docs.djangoproject.com/en/1.8/topics/auth/default/#default-permissions).
In addition, we can use decorators to require that a user be logged in, for
example.

This works for some use cases but falls short for more advanced applications.
Some third party packages, like
[django-guardian](https://django-guardian.readthedocs.org/en/v1.2/), offer
per-object permissions at the cost of additional complexity.

### How does Django’s file uploading functionality work? How would you make it more secure?

Django stores user uploaded files on their request in `request.FILES`.
Depending on the storage backend and file handler, Django will store files
up to 2.5 MB [in memory](https://docs.djangoproject.com/en/1.9/topics/http/file-uploads/#where-uploaded-data-is-stored).
Beyond that, it saves the file to a temporary location
on disk. If using a FileField or ImageField, an upload_to path can be defined
on the field and Django will place the files in the path, relative to the
MEDIA_ROOT defined in settings.

Some of the [official
recommendations](https://docs.djangoproject.com/en/1.8/topics/security/#user-uploaded-content)
to increase security include:

* Limiting the file size of uploads
* Make sure uploaded files will not be executed
* Check extensions and filetypes of uploaded files
* Use cloud storage or a CDN
* [Validate all uploaded files](https://docs.djangoproject.com/en/1.8/ref/models/fields/#file-upload-security)

### How does Django deal with directory traversal vulnerabilities?

Django does not read files unless you explicitly serve them with
[static.serve](https://docs.djangoproject.com/en/1.8/howto/static-files/#serving-files-uploaded-by-a-user-during-development)
In addition, the urls.py files explicitly define user-accessible routes and any
urls that have not been defined will yield an HTTP 404 - Not Found error.

### How does Django deal with CSRF? Is it totally effective?

Django uses a [middleware
class](https://docs.djangoproject.com/en/1.8/topics/http/middleware/) called
`django.middleware.csrf.CsrfViewMiddleware` by default. For any operations other
than GET, Django wants you to include a CSRF token in the form.  The Django
documentation includes a section that covers [how it
works](https://docs.djangoproject.com/en/1.8/ref/csrf/#how-it-works).

In short, Django creates a cookie with the CSRF value and then expects
a matching csrf value to be submitted as part of the POST to the server.  If
they do not match, the server returns an [HTTP 403
- Forbidden](https://docs.djangoproject.com/en/1.7/ref/contrib/csrf/#rejected-requests)
response. Over HTTPS, it also uses strict referrer checking.

It's not totally effective because, as [pointed out in the
docs](https://docs.djangoproject.com/en/1.8/ref/csrf/#limitations), subdomains
set a CSRF token for the whole domain.


In Closing
----------

I hope this post helped you better understand how Django's security works.  If
you'd like to hear more from Levi, he gave a talk on [Practical Django
Security](https://www.youtube.com/watch?v=tcylo9qo9gA). In my opinion, it's not
important to keep all of this in memory so long as you remember roughly which
areas pose a security risk when you're working on a Django application.
