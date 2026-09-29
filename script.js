// Gadebridge concept — mobile menu, header state, mobile quick bar, and a couple of reveals.
document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const nav = document.getElementById("primary-nav");
const toggle = document.querySelector(".menu-toggle");
const mobileBar = document.querySelector(".mobile-bar");
const hero = document.querySelector(".hero");

const setMenu = (open) => {
  toggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
};

toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("is-open")) {
    setMenu(false);
    toggle.focus();
  }
});

// Header border once scrolled; mobile "Book a Visit" bar once past the hero, hidden at the visit section.
const visit = document.getElementById("visit");
const onScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
  const pastHero = hero.getBoundingClientRect().bottom < 0;
  const visitRect = visit.getBoundingClientRect();
  const atVisit = visitRect.top < window.innerHeight && visitRect.bottom > 0;
  const showBar = pastHero && !atVisit;
  mobileBar.classList.toggle("is-visible", showBar);
  document.body.classList.toggle("has-mobile-bar", showBar);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Gentle reveals, reserved for the rooms and life-at-Gadebridge photography.
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target)
        .forEach((el) => {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }),
    { threshold: 0.12 },
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
