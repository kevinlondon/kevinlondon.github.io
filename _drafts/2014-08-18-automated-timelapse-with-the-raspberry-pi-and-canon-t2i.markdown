---
layout: post
title: Automated Timelapse with the Raspberry Pi and Canon T2i
---

####Notes:

gphoto2, installed by `sudo apt-get install gphoto2` is an old version. I used the [gphoto-updater](https://github.com/gonzalo/gphoto2-updater) repository on Github to properly install the latest version. Clone the file and then type: `sudo ./gphoto-updater.sh`. Totally understood if you don't want to sudo install something.

Repository is at [rpi-auto-timelapse](https://github.com/kevinlondon/rpi-auto-timelapse). Still a work in progress.

####Libraries used:
`click`: A command-line library by Armin. Pretty awesome.
`astral`: 


####Interesting things:
I'm automatically checking the dawn / dusk cycle to make sure that we only shoot during the day. I'm eventually going to ramp up and down the intervals based on the time of day. For instance, more exposures during the sunrise / sunset and fewer in the long part of the day because the light changes less. I think this is a compelling use of timelapse because it's not something you can do without a smart device attached.
