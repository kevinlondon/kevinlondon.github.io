---
title:  "Dangerous Python Functions, Part 3"
pubDatetime: 2017-01-30T17:30:08
description: "A brief update to the earlier posts about insecure Python functions"
tags:
  - python
  - security
---

A brief update to the
[earlier](https://www.kevinlondon.com/2015/07/26/dangerous-python-functions.html) [posts](https://www.kevinlondon.com/2015/08/15/dangerous-python-functions-pt2.html) about insecure Python functions. I came
across one more that's similar to the Pickle section from Part 2. This
one uses [`jsonpickle`](https://github.com/jsonpickle/jsonpickle).

Here's a working exploit for that one:

<script src="https://gist.github.com/kevinlondon/9b0d1dddcced699067192923a8440a0a.js"></script>

Their docs also mention the [security
implications](https://jsonpickle.github.io/#module-jsonpickle) but it can be easy to miss.
As a reminder, don't use anything that aspires to be Pickle.
