---
layout: post
title: Why I submitted my first CPython patch
date: 2014-08-03 14:05:24.000000000 -07:00
---
As part of my work at [Wiredrive](http://www.wiredrive.com), I investigated how to best utilize UUIDs in a MySQL database for referencing our objects instead of primary IDs. Ultimately, we chose to go a different way. I did, however, find a way to optimize a tiny piece of core Python along the way so I wanted to submit a patch.

### Benchmarking UUID
In particular, the code used to generate a byte representation of the UUID with [uuid.bytes](https://docs.python.org/2/library/uuid.html#uuid.UUID.bytes) can be slow.

In my tests, I found that replacing the existing code with binascii's [unhexlify](https://docs.python.org/2/library/binascii.html) considerably improved the speed. Here's the original code in `cpython/Lib/uuid.py`:

```
class UUID(object):
```
```
	@property
    def bytes(self):
        bytes = bytearray()
        for shift in range(0, 128, 8):
            bytes.insert(0, (self.int >> shift) & 0xff)
        return bytes_(bytes)
```

Looks pretty innocuous. Let's set up some tests to look at how quickly it runs. Here's the benchmark test I ran:

<script src="https://gist.github.com/kevinlondon/d3bb32d5a784f78731fa.js"></script>

... and the output on my machine:
```
kevin$ python uuid_benchmark.py 100000
Original Average: 8.228 microseconds
Updated Average: 1.550 microseconds
```

That means that, on average, using ``unhexlify`` will allow it to run about 5x faster. Pretty good!

### Submitting the Patch
The Python contributers have written [an excellent guide](https://docs.python.org/devguide/index.html) that describes how to create a patch. You'll want to first set up your development environment with the Python code and make sure everything runs smoothly. Then, make your changes, re-run the tests, and generate the patch. 

They describe quite well how to do the first part of that. The only strange bit is that you run the tests (on Mac) with `./python.exe -m test -j3`. Making a patch is similarly easy. You do that with `hg diff > mywork.patch`. 

[The end result is here](http://bugs.python.org/issue22131). I'm excited to see how it goes and it feels like a rite of passage to submit a patch to Python itself.

