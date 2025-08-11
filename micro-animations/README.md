# micro-animations
Micro-Animations Kit — Angular Library Plan  A lightweight Angular library focused on delightful, reusable micro-interactions and route/element animations. Built to be designer-friendly, developer-friendly, performant, and accessible.

Micro-Animations Kit — Angular Library Plan

A lightweight Angular library focused on delightful, reusable micro-interactions and route/element animations. Built to be designer-friendly, developer-friendly, performant, and accessible.

Goals

Provide tiny, tasteful animations for common UI patterns (buttons, list items, cards, inputs, toasts, route transitions).

Offer a directive-first API for easy adoption (decorate elements with attributes instead of heavy components).

Integrate with GSAP for advanced use, but provide CSS/Angular animation fallbacks for small bundles.

Prioritize performance (will use the Web Animations API/GSAP and will-change, avoid layout thrashing).

Theming-friendly, accessible (prefers-reduced-motion support), and tree-shakeable.

Core Concepts

Directive-based API: maHover, maClick, maAppear, maStagger, maRouterTransition etc.

Animation Presets: Small named presets (e.g., pop, float, slide-up-sm, jiggle) implemented via small params.

Composition: Allow chaining / composition of directives or using maSequence service to run sequences.

Config & Theming: Global MicroAnimConfig with default durations, easing, and reduced-motion behavior.
