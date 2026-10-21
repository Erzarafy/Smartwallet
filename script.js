const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open menu" : "Close menu");
  navLinks.classList.toggle("is-open", !isExpanded);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    navLinks.classList.remove("is-open");
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const featuresSection = document.querySelector(".features-section");
const motionAllowed = window.matchMedia("(prefers-reduced-motion: no-preference)");

if (featuresSection && motionAllowed.matches && "IntersectionObserver" in window) {
  const revealItems = [
    featuresSection.querySelector(".section-heading"),
    ...featuresSection.querySelectorAll(".feature-card"),
  ];
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.max(0, index - 1) * 100}ms`);
    revealObserver.observe(item);
  });
  featuresSection.classList.add("reveal-ready");
}
