# 2D grid slideshow based on reveal.js

This repository contains a snapshot of our in-progress work to enable
navigation of a 2D grid slideshow based on Reveal.js.

Please see detail below on context, requirements and workflow for collaborators.

## General information about the website

Research centre (academia); the website hosts both institutional information,
publications and research findings.

## Description of page functionality

The page to work on presents a set of slides related to research findings for a
research project. The slides are organized in a grid: each column shows slides
related to a specific city, whereas each row is about a specific aspect of the
research, providing comparative browsing between the cities involved.

A live demo page, showing the page in its current incomplete status, is available here:

http://revealjs-2d-grid-slideshow.labs.lsecities.net/tests/slideshow/super-diverse-streets/

The corresponding full source (including assets) is contained in the repository here:

https://github.com/lsecities/revealjs-2d-grid-slideshow

## Requirements

* we would like to add a div ("intro div") containing HTML elements
  after the header/menus, and before the area taken up by the 2D
  slideshow

* this div basically will hold content that works as introduction to
  the slideshow (we'll use heading and paragraphs, potentially images,
  and we may need to use a column layout using div floats (e.g. main
  content area taking up 9/12 columns, metadata area taking up 3/12
  colums)

* once a visitor scrolls to the bottom of the "intro div", the 2D
  slideshow should lock in place: further use of directional keys on
  keyboard or swipe gestures on touch screens should be captured by the
  2D slideshow, allowing visitors to browse through the slides

* i'm open to suggestions on how to let users scroll back up to the
  "intro div" if they wish to do so after browsing the 2D slideshow:
  maybe a simple clickable affordance/link that 'unlocks' the 2D
  slideshow and brings back to normal scrolling of the top part of the
  page; in whatever form, an affordance to unlock the slideshow view
  should be available

* within the 2D presentation mode:

  * it needs to start in its 'zoomed out'/panorama state (this is already set up)
  * the default Reveal.js behaviour for panorama mode is to alway
    display the 'current' slide (the one that is displayed when a visitor
    hits escape key to get out of panorama mode) at the center of the
    slideshow area: instead, we would like to display the grid always
    horizontally centered, however the row containing the 'current' slide
    should always be centered vertically across the slideshow area (or, if
    you think that this could work better from an UX point of view, either
    at the top of the slideshow area or somewhere in the top half - my
    hunch is that top alignment of the row with current slide would be
    more intuitive especially on initial view, and may make calculations
    of css translations easier)
  * highlighting of current slide is somewhat feeble in the default
    theme - if this could be easily improved e.g. by applying some light
    opacity to the non-current slides and leaving the current slide with
    opacity: 1; this would be perfect

* the navigation controls (.control element) is currently displayed in
  fixed position to the bottom right of the page as a group of four
  directional arrows (.navigate.left, .navigate.right, .navigate.up,
  .navigate.down) - could you please instead position this with
  position: absolute within the .reveal div, then position the
  individual arrows to the edges of the slideshow area, maybe wrapped in
  a semi-transparent round background that fades
  to transparent after N seconds of no interaction with the slideshow,
  and reappears as semi-transparent as the user restarts interacting
  with the slideshow? each arrow should however still be visible when
  its round background is fully transparent

* there seems to be a bug in the current version of the code:
  sometimes when scrolling horizontally across slides, the transition
  animation suggests that the user has been scrolling up or down as well
  as sideways (the new slide slides in diagonally rather than
  horizontally). this is likely due to side effects of a
  quick change i had to make in order to allow browsing between slides
  horizontally (the default behaviour is to bring the user back to the
  first slide of a column upon browsing left or right to that column):
  this is probably confusing Reveal.js' status.

my changes are here:
* https://github.com/lsecities/lsecities-wp-theme/blob/f5a42f8b5d6eda1bb192c49bce6010eb2a21b272/javascripts/reveal.js#L3607
* https://github.com/lsecities/lsecities-wp-theme/blob/f5a42f8b5d6eda1bb192c49bce6010eb2a21b272/javascripts/reveal.js#L3612
* https://github.com/lsecities/lsecities-wp-theme/blob/f5a42f8b5d6eda1bb192c49bce6010eb2a21b272/javascripts/reveal.js#L3622
* https://github.com/lsecities/lsecities-wp-theme/blob/f5a42f8b5d6eda1bb192c49bce6010eb2a21b272/javascripts/reveal.js#L3627

compared with upstream's
https://github.com/hakimel/reveal.js/blob/3.1.0/js/reveal.js#L3607 and
respective other three lines.

## Workflow for collaborators

Please fork the repo here:
https://github.com/lsecities/revealjs-2d-grid-slideshow
then commit individual changes to your working branch(es) and send merge requests.

In terms of copyright on all your work, please assign copyright to LSE Cities
on completion.
