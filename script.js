"use strict";

gsap.registerPlugin(ScrollTrigger);

// Toggle the grid visualizer
document.addEventListener("keydown", (event) => {
  if (event.shiftKey && event.key.toLowerCase() === "g") {
    document.querySelector(".overlay").classList.toggle("active");
  }
});

// Lenis smooth scroll
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const initializeAnimation = () => {
  let mm = gsap.matchMedia(),
    breakPoint = 750;

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions;

      // Page load animation
      gsap.to(".project-item", {
        opacity: 1,
        delay: 1,
        duration: reduceMotion ? 0 : 0.5,
        stagger: {
          amount: reduceMotion ? 0 : 0.7,
          from: isDesktop ? "random" : "start",
        },
      });
    }
  );

  mm.add(`(min-width: ${breakPoint}px)`, () => {
    // Scroll all project items into position on desktop
    gsap.to(".project-item", {
      y: 0,
      ease: "power3.inOut",
      stagger: 0.003,
      scrollTrigger: {
        trigger: "[data-scroll-trigger]",
        start: "top top",
        scrub: 1,
        pin: true,
      },
    });
  });
};

window.addEventListener("DOMContentLoaded", initializeAnimation);
