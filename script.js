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
  // Page load animation
  gsap.to(".project-item", {
    opacity: 1,
    delay: 1,
    stagger: {
      amount: 0.7,
      from: "random",
    },
  });

  // Scroll all project items into position
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
};

window.addEventListener("DOMContentLoaded", initializeAnimation);
