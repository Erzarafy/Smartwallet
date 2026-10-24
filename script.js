/* Motion layer: gate untuk entrance & reveal (ditambah segera agar tidak ada flash) */
document.body.classList.add("anim-ready");

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

/* ============================================================
   SMARTWALLET MOTION LAYER (oleh Budi)
   ============================================================ */

/* Stagger untuk bar chart hero (CSS memakai --bd sebagai delay) */
document.querySelectorAll(".chart-bars i").forEach((bar, index) => {
  bar.style.setProperty("--bd", `${index * 65}ms`);
});

/* Count-up saldo (Rp 12,450,000) — hanya jika motion diizinkan */
(function () {
  const el = document.querySelector("[data-countup]");
  if (!el || !motionAllowed.matches) return;
  const target = parseInt(el.dataset.countup, 10);
  if (!Number.isFinite(target)) return;
  const duration = 1700;
  let start = null;
  /* mulai sedikit setelah kartu selesai masuk */
  setTimeout(() => requestAnimationFrame(function frame(now) {
    if (start === null) start = now;
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = "Rp " + Math.round(target * eased).toLocaleString("en-US");
    if (progress < 1) requestAnimationFrame(frame);
  }), 750);
})();

/* Scroll reveal generik untuk [data-reveal], stagger otomatis per grup */
(function () {
  const items = [...document.querySelectorAll("[data-reveal]")];
  if (!items.length || !("IntersectionObserver" in window)) return;
  const groups = new Map();
  items.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach((list) => list.forEach((el, i) => el.style.setProperty("--reveal-delay", `${i * 90}ms`)));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => observer.observe(el));
})();

/* Tilt 3D halus pada kartu dashboard (desktop + pointer halus + motion ok) */
(function () {
  if (!motionAllowed.matches || !window.matchMedia("(pointer: fine)").matches) return;
  const card = document.querySelector(".dashboard-card");
  const art = document.querySelector(".hero-art");
  if (!card || !art) return;
  let raf = null;
  art.addEventListener("mousemove", (event) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const rx = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
      const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 9;
      /* rotate(-2.2deg) bawaan desain dipertahankan */
      card.style.transform = `rotate(-2.2deg) perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      raf = null;
    });
  });
  art.addEventListener("mouseleave", () => { card.style.transform = ""; raf = null; });
})();
