View the [demo](https://ram-lalla.vercel.app/).

## New Approach

- **Decode video in-browser** read `/assets/video.mp4` and extract all frames locally, so that we can use the video compression.
- **Cache frames in memory** as decoded video samples ready to be drawn to a canvas.
- **Render via canvas** with object-fit cover logic for a full-bleed, high-performance image.
- **Scroll-driven scrubbing** using GSAP ScrollTrigger to map scroll progress to frame index with smooth `scrub` animation and touch support.
