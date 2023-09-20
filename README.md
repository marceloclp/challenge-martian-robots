

https://github.com/marceloclp/challenge-martian-robots/assets/8413171/908bb547-6e19-4c94-a938-7a49a08a98b5



# Getting Started

```bash
nvm use && pnpm install && pnpn run dev
```

Open [http://localhost:3000](http://localhost:3000) or click [here](https://challenge-martian-robots.vercel.app/) to see the result.

# Solution

The solution is structured into three main entities/classes:

- **Surfaces**, which hold state about the terrain of a planet (such as things
  that have been placed in it, like the scent left by a robot), and what
  positions are out of bounds. Its responsibility is to abstract away any implementation
  details on how a planet's terrain is shaped (be it a flat surface, a circular
  array or a graph with holes in the middle).
- **Robots**, which hold state about the position and rotation inside an abstract
  surface. Robots on their own can't interact with or manipulate Surfaces - and
  the inverse is also true. Its responsibility is to abstract all the
  implementation details on how a thing could transverse and rotate in a 2d
  physical surface.
- and finally **RobotInstructions**, which are the bridge between robots and
  surfaces. A Robot Instruction defines how a robot interact and manipulates a
  surface by consuming both APIs.

This is similar to the Flux architecture (used by Redux), where a robot instruction
is equivalent to an action, and the robot and surface are the payload.

The strongest point of this solution is that all parts are decoupled - let's say
that Mars is no longer a rectangular shaped surface, but an irregular flat
surface with holes in it, we would require a much more complex data structure
to keep track of what is surface and what is not - like a graph. Although the
implementation has changed significantly, it doesn't matter to the other parts
of the codebase, because they will still be checking whether a coordinate is
out of bounds or not through the same `surface.isOutOfBounds()`. A big change
like this would most likely result in minimal changes to the rest of the codebase.

The same thing applies to Robots, whose only responsibility is to expose the
required API for someone to be able to transverse and rotate in a 2d world.

## What I focused on

Unless I am missing something, I found the question to be relatively simple, and
felt like it wasn't enough to demonstrate much technical skill. For this reason
I decided to put some more effort into the UI even though this was not the focus.

This includes things like state management, demonstrating how my solution could
be consumed by a client, and basic HTML/CSS skills.

## Features

- Pan-capable surface viewer
  - Positions whose robots have left a scent will be colored in orange
  - Edit the surface's width/height
- Animated robot traverse and rotations
  - The robot moves in the surface grid as the instruction is executed
- Animated instructions display
  - When an instruction goes outside the display, it is scrolled into view
  - When an instruction is skipped, it will have an orange circle
  - When an instruction is invalid, it will have a red circle
  - Pause/resume instructions
- List of all reports by previous robots
