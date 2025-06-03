---
title: "I made a game with AI and I don't know how to feel about it"
description: "What happens when the $20 you spend on Cursor becomes like buying a game where the gameplay is building the game itself? Exploring the meta-loop of AI-assisted game development."
pubDatetime: 2025-06-02T18:00:00-8:00
tags:
- gamedev
- ai
- cursor
- meta
---

A few days ago, I inexplicably hurt my toe (probably from cycling) and had to rest over the weekend. With all this unexpected freetime, and no kid (yet!), I played some Monster Train 2 on the first day. On the second day, I got a bit bored and decided to look at making a game instead of playing one, since it felt like we were getting further along in the AI space. 

While I am a professional software engineer, I don't think of myself as a game developer - because I've never really made a
game. As a kid, I made some games in the Starcraft and Warcraft III map engines.
I'd often provide feedback to friends making their own games. I took a game dev
class in community college and built an insane 3D Breakout where you play as the
paddle and have the POV as the paddle.

So yeah, not a game developer.

I have enjoyed games for a while though. And in particular, I love game demos. Small proofs of concept, little commitment. Just a fun way to go through some example. I'd love those game demo disks of the late 90s where you'd have 40-50 demos, and most of them were insanely bad. So yeah, novelty is a good thing.

This weekend, I decided to start trying to make my own game.

In the past, how I'd approach this was:
1. Choose some game engine based on what people seem to like at the time
2. Read through tutorials, and make a game over the course of a week or so, mostly working at night
3. Completely lose interest in the original thing I wanted to make by the time I had sufficient preparation to make it.

With that loop in mind, I decided to try this a different way, this time instead starting with the idea that I could leverage some of the advanced in AI dev, particularly Cursor and Claude 4.

Claude 4 has gotten much better than Claude 3. Like - much better. It has its own tool usage, it runs its own tests. So with its new-found autonomy, it makes a good partner for building the game. 

I started out with the hypothesis  that investing $20 in Cursor for Claude was kind of like what I might spend on some random game. And, interestingly, that is how it felt!

Granted, the feedback loop is longer. 

### Coming up with ideas

I engaged with the AI from the start, since I didn't know exactly what I wanted to make exactly. 

<Screenshot of chatting with AI>

Over the course of discussion, the idea I settled on was making a game that sort of replicated a sprint process (like I mentioned, professional software engineer). In film, they say write what you know and, ... I know JIRA boards haha. 

After iterating a for a while, I landed on a basic concept. You're playing as an engineer at a software place, trying to meet some deadline. You have tasks on a sprint board that can succeed or not. There's things to research. A good place to start.

### Getting started

Initially I had to pick a game engine, so I just kind of picked Godot. I remember people liking it, and I didn't want to go down the Unity path again.

At first, I tried making some thing basic in Godot and was not getting very far.
I've used Cursor before (link to past blog post about making blog), so that was my next choice.
I looked at using Cursor and, on the base model, it was at best ok at helping me
get the game dev done. Auto mode was not cutting it, though it was free. Also,
it didn't launch the game or know when things worked, so I needed to go back and
forth to fix things and paste error messages, which added a lot of ovehread.

I've heard a lot about MCP lately and hadn't messed around with it. After doing a bit of reading, it basically exposes a programmatic / agentic interface for an Agent to do some things, so I looked into if there was an MCP server for Godot. I found https://github.com/ee0pdt/Godot-MCP, which didn't work for me in Cursor but did work in Claude Desktop, and https://github.com/Coding-Solo/godot-mcp which worked well for me in Cursor after I integrated it via the Cursor settings.

<iframe width="560" height="315" src="https://www.youtube.com/embed/UbvJDAZHFmk?si=jvxIpqFMVdkK1bmA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Here you can see me poking around with the Agent mode, and Cursor booting up the game to see what might be working or not working. 

In the end, after iterating with it for a lot of the day (over ~80-90 prompts), I was pretty happy with where it was, though it was a lot of 2 steps forward 1 step back. For example, I'd get it to split the game into two swim lanes to represent a sprint, but then the swim lanes would clip, or going between cards wouldn't work.

Also, interestingly, it had no idea how to structure the code, so it tried to make God objects and jam 2K lines of code in there. After I asked it to refactor, it did, though it was an on-goign battle.

### A Detour

The next day, when I woke up, I realized that probably I'm incurring a lot of additional complexity making the app in Godot when it could be essentially a Javascript / HTML app instead. 

So I re-wrote it as a Javascript game **in a single prompt**. It just... worked? Without even a JS structure. I know it's simple, but still? 

<rewritten image demo>

Then swapped to Vue.js in another. 

<another example>

Probably I should've been in Javascript land the whole time. 

For JS dev, I added a browser MCP Server as well, but, for me, it didn't want to use it as much. Ultimately, that's OK, I'm happy just leaving it as it is. 

After swapping to JS, it ran much more quickly and iteration went more smoothly. 

I've still been poking at it and playing it, but here we go, this is where I wound up:

https://kevinlondon.itch.io/velocity

<Short video of playing the game>

I'm no neal.fun, but I don't know, it was still a satisfying exercise!

### Thinking about this

I don't know exactly how I feel about this now that I've done it. It is fun, and it takes real artistry to make a game, most of which I've sidestepped. I think as AI takes a larger role in what we do, it also means that we have to be better collaborators and wear a more critical hat when providing feedback. Tastemaking becomes significantly more important if we're doing less of the active contribtuion. Telling it what we want or don't want for example.

I've described our role in the AI space as basically being an editor. I think there's something to that. 