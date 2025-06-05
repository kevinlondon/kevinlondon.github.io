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

I spent $20 on Cursor to build a game and realized the actual game was the gameplay of building the game itself.

A few days ago, I inexplicably hurt my toe (probably from cycling) and had to rest over the weekend. With all this unexpected freetime, I played games on the first day. On the second day, I felt bored and decided try making a game instead of playing one.

While I am a professional software engineer, I'm not a game developer. As a kid,
I made custom maps in the Starcraft and Warcraft III editors and I
provided feedback to friends on theirs. But never finished my own.

In the past, how I'd approach making a game has been:
1. Choose a game engine based on what people seem to like at the time
2. Read through tutorials
3. Make a tutorial game over the course of a week
3. Completely lose interest in the original thing I wanted to make

With that in mind, I decided to try a different way and build it in
collaboration with AI.  Claude 4 has gotten better at operating with minimal
supervision than Claude 3 series. So with its new-found autonomy, it makes a
better partner for building a game. 

### Coming up with ideas

I didn't know exactly what I wanted to make initially, so AI collaboration
kicked off at the start, trying to figure out what to build with Claude:

![ideation](/assets/ai-game/ideation-1.png)
*Initial ideas with a side of sycophancy*

![more bad ideas](/assets/ai-game/ideation-2.png)
*Still figuring it out*

I settled on making a game that replicated part of the software development process. Specifically, figuring out what tasks to take on in a two week period called a sprint (they say you should write what you know). 

Basic concept: You're playing as an software engineer,
trying to meet deadlines. You have tasks on a sprint board that can succeed
or not. There's things to research, and choices to make between priorities. A decent place to start.
Now, how to make it? And how to make it fun?

### The Godot Phase

I still needed to choose a game engine, so I picked [Godot](https://godotengine.org/), based on my scientific criteria of what people seem to currently like, and that it's not Unity.

At first, I tried making something basic in Godot and did not get far, so I considered going through the Godot tutorials again. Instead, I engaged my AI collaborator. 


I've [used Cursor
before](https://www.kevinlondon.com/2024/11/27/ai-blog-rewrite/), so that was my
next choice.
Cursor, in agent mode on the auto-selected model, was at best *ok* at helping me
get the game dev done. Auto mode was not cutting it, though it was free. Also,
it didn't launch the game or know when things worked. I needed to go back and
forth to fix things and paste error messages, which added friction.

#### MCP

I've heard about [Model Context
Protocol](https://www.anthropic.com/news/model-context-protocol)  (or MCP)
lately and hadn't messed around with it. I read up on it and learned that
exposes a programmatic / agentic interface for an agent to take actions on your behalf,
essentially exposing an API for apps or websites that may not have one.
I looked around for an MCP server for Godot. 

Initially, I found two different MCP servers for Godot. The first one worked great in Claude Desktop but not at all in Cursor. Then I found [godot-mcp](https://github.com/Coding-Solo/godot-mcp).

The Godot MCP knows how to start and stop the game, ask for debug info, and a few other additional functions. Getting the debug info on its own is helpful, and prevents needing to go between tools and copy/paste error traces and metadata. It gives the agent enough info to act without requiring me in the loop as much. 

It's pretty cool! Here's a little demo:

<iframe width="560" height="315" src="https://www.youtube.com/embed/UbvJDAZHFmk?si=jvxIpqFMVdkK1bmA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Here you can see me poking around with the Agent mode, with Cursor booting up the game via MCP calls to see what might be working or not working (more often the case).

With engine and collaborator figured out, I could skip much of the tutorial-into-disinterest death spiral and get to the part of making the game itself.

![Game start](/assets/ai-game/game-start.png)
*First compiling version*

This process went back and forth for a while over much of the day.
In the end, after iterating with it for a lot of the day (over ~80-90 prompts),
I was pretty happy with where it was, though it was a lot of 2 steps forward 1
step back. For example, I'd get it to split the game into two swim lanes to
represent a sprint, but then the swim lanes would clip, or going between cards
wouldn't work.

![early game](/assets/ai-game/early-game.png)
*An early iteration*

At one point, I spent probably 20 prompts just trying to get task cards to properly move between "Available" and "Selected" containers. The AI would implement drag-and-drop that looked right but broke the selection logic. Or it would fix the selection but break the visual feedback. Whack-a-mole debugging with a debugging partner that sometimes forgets what it implemented three prompts ago.

For example, here's a few iterations on this:

![early game with button](/assets/ai-game/early-game-with-button.png)
*Note that a "Continue" button has inexplicably appeared in the top left, never to leave again.*

![early game without tasks](/assets/ai-game/early-game-no-tasks.png)
*Or now, there's no cards!*

Also, interestingly, it had no idea how to structure the code, so it tried to make God objects and jam 2K lines of code in there. After I asked it to refactor, it did, though it was an on-going battle to maintain some sense of order.

### Javascript Breakthrough

After messing with the Godot implementation for the day, I went to sleep and, in the morning, 
had a realization. Godot felt too complex for this game, and I didn't need its feature set.
 I wrangled `.tscn` scene files, GDScript syntax, and UI layout
for what was essentially a card-based board game. I thought it might be easier to build it as
a HTML / CSS / JS game instead. 

So I re-wrote it as a Javascript game **in a single prompt**. It just... worked? Without even a JS structure. I know it's simple, but still? 

![Converting to JS](/assets/ai-game/convert-to-js.png)
*Conversion prompting*

![Homepage](/assets/ai-game/rewrite-1.png)
*Game splash screen*

![Epic page](/assets/ai-game/rewrite-2.png)
*Epic selection page*

![Sprint board](/assets/ai-game/rewrite-3.png)
*Sprint board*

Granted, it initially generated it in three large-ish files without a discrete
recommendation. But still impressive for a one-shot conversion! Instantly better.

In an attempt to build something more maintainable, a second prompt converted it
to Vue and generated all the components, wiring, package.json, etc. 

![Converting to JS](/assets/ai-game/convert-to-vue.png)
*To Vue*

After swapping to JS, it ran much more quickly and iteration went more smoothly. 

### Development Loop

I liked to make changes multiple areas in one prompt, as Cursor is quite good at working with Claude 4 to sequence a collection of changes in Agent mode (and Cursor bills per prompt, so combining them is a nice way to get more out of a single request). For example, here's a prompt I used, which jammed a bunch of somewhat unrelated ideas together:

![Game development prompt with multiple feedback points](/assets/ai-game/game-prompt.png)
*Prompt with multiple directives*

![AI response showing completed items](/assets/ai-game/game-response.png)
*Response after implementing feedback*

Or, if you prefer a short video, here is an agent chunking through another prompt:

<iframe width="560" height="315" src="https://www.youtube.com/embed/i5QqmshGwAY?si=ZVby4ORmMI0wVisX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

As with my memory of game dev (and, well, normal dev), there's two main parts to the project - the first 90% and the second 90%. I spent a lot of time (a _lot_) trying to get the loop tuned, tweaking balance between task types and research, adjusting UI elements, and ... yeah. A lot of that.

![Tweaking gameplay and UI](/assets/ai-game/more-tweaks.png)
*Indecisive tweaks*

### UI rewrite

As I neared the end of the project (or so I thought!) I wanted to re-think how we did the UI to be more like a mockup style UI with sticky notes - basically using some of the setup for a normal dev process.


![Old UI](/assets/ai-game/old-ui.png)
Before

![Prompting to change UI](/assets/ai-game/ui-rewrite.png)
Some prompts to change the UI

![New UI](/assets/ai-game/old-ui.png)
After.

I've still been poking at it and playing it, but here we go, this is where I wound up:

https://kevinlondon.itch.io/velocity

### But is it fun?

I think it's for the viewer to decide. There's something satisfyingly puzzle-ish about it. I have a hard time playing Satisfactory or Factorio, but they scratch a somewhat similar itch maybe? Maybe that's too self-aggrandizing. Anyway, I think it's kind of an interesting puzzle, we'll leave it at that. And what makes something fun? 

The elements I think work are picking the stories, and eventually realizing that actually, I should be prioritizing impact more highly. Then realizing that the story points and tech debt matter, because it will start failing tasks. I don't know, there's an interesting realization journey.

I'm not sure how legibile it is to someone outside of tech, it is a little tech jargon heavy. But as they say, write what you know.


### Usage stats for this exercise

Thought I'd collect some basic stats about usage on Cursor for this exercise.
Over the course of all the prompting, it used about 120 "premium requests" out
of 500. It also generated (lol) about 57K lines of code during our iterations,
consisting of diffs, attempted fixes, additional logic, animations, etc. A good
chunk of it I tossed out or edited out. But the final repo is pretty big. 

As dev went on, the feedback loop got longer (sound familiar?). It took longer
to propagate changes, context switching became a challenge, and I'd need to
remember to catch up with whatever it had done.

Eventually, I would queue up multiple agents to run at one time on the codebase.

### The Meta

I don't know exactly how I feel about this now that I've done it. It is fun to make games, and it takes real artistry to make a game, most of which I've sidestepped. I think as AI takes a larger role in what we do, it also means that we have to be better collaborators and wear a more critical hat when providing feedback. Tastemaking becomes significantly more important if we're doing less of the active contribtuion. Telling it what we want or don't want for example.

I've described our role in the AI space as basically being an editor. I think there's something to that. 

If I think about how this might affect the industry moving forward, I'm not sure. I can imagine these things getting better, to the point where it doesnt even need to run locally and can be agentic through some central UI (indeed, Gemini claims you can make a game directly in the UI, and so does Claude). 

But wouldn't this normally have required a team of people? Probably? It's a little unsettling to think about for more than a few moments, again as someone in the industry.

Bret Victor talked in [Inventing in Principle](https://www.youtube.com/watch?v=PUv66718DII) about this idea of building something that llows for rapid prototyping, perhaps even in realtime, and that could be a kind of game or entertainment itself. I think we're living in that reality now. From his talk:

> Creators need an immediate connection to what they create. And what I mean by that is when you’re making something, if you make a change, or you make a decision, you need to see the effect of that immediately. There can’t be a delay, and there can’t be anything hidden. Creators have to be able to see what they’re doing. 

We're at least getting closer to it. I'm curious to see how it feels in a few years when it _can_ be instant, and I don't need to step away to make a cup of tea while I wait for an agent to do something. What would it be like to not even need to batch my suggestions? To see the results immediately? It doesn't feel like we're far from that. Will this still be fun? Will humans even be doing it?

The line between playing games and building games is blurring. When the tools become the game, what does that mean for both developers and players?