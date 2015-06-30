---
layout: post
title:  "Dangerous Python Functions"
date:   2015-05-05 15:54:08
---

General overview of each point
Introduction of why it's around
Alternatives
Example links


Subprocess shell=True
os.call
os.system
Yaml - load vs safe_load
Pickle - unsafe!
shelf - based on pickle
Celery - Uses pickle by default
eval
exec
http://lucumr.pocoo.org/2011/2/1/exec-in-python/
http://nedbatchelder.com/blog/201206/eval_really_is_dangerous.html


opening files

http://nedbatchelder.com/blog/201302/war_is_peace.html

sqlite untrusted input:
https://docs.python.org/2/library/sqlite3.html?highlight=insecure

mktemp
https://docs.python.org/2/library/tempfile.html?highlight=insecure#tempfile.mktemp

Pep 324 - Change from os.system to subprocess
https://www.python.org/dev/peps/pep-0324/

Idioms and anti-idioms in Python: https://docs.python.org/2/howto/doanddont.html
