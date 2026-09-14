// marquee content
const services = [
  "Clareamento",
  "Dentística",
  "Clínico Geral",
  "Facetas",
  "Limpeza",
  "Avaliação",
];
document.getElementById("track").innerHTML = services
  .concat(services)
  .map((s) => `<span>${s}</span>`)
  .join("");

// scroll reveal
const io = new IntersectionObserver(
  (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// counters
document.querySelectorAll("[data-count]").forEach((el) => {
  const cio = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const target = parseFloat(el.dataset.count),
          suf = el.dataset.suffix || "",
          dec = +el.dataset.decimal || 0;
        let cur = 0;
        const step = target / 40;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) {
            cur = target;
            clearInterval(t);
          }
          el.textContent = cur.toFixed(dec) + suf;
        }, 30);
        cio.unobserve(el);
      }),
    { threshold: 0.5 },
  );
  cio.observe(el);
});

// before/after slider
const slider = document.getElementById("baSlider"),
  before = document.getElementById("baBefore"),
  handle = document.getElementById("baHandle");
let dragging = false;
function setPos(x) {
  const r = slider.getBoundingClientRect();
  let pct = ((x - r.left) / r.width) * 100;
  pct = Math.max(0, Math.min(100, pct));
  before.style.width = pct + "%";
  handle.style.left = pct + "%";
}
handle.addEventListener("mousedown", () => (dragging = true));
window.addEventListener("mouseup", () => (dragging = false));
window.addEventListener("mousemove", (e) => dragging && setPos(e.clientX));
handle.addEventListener("touchstart", () => (dragging = true));
window.addEventListener("touchend", () => (dragging = false));
window.addEventListener(
  "touchmove",
  (e) => {
    if (dragging) {
      setPos(e.touches[0].clientX);
      e.preventDefault();
    }
  },
  { passive: false },
);

// testimonial rotator
const slides = document.querySelectorAll(".t-slide");
const dotsWrap = document.getElementById("dots");
slides.forEach((_, i) => {
  const d = document.createElement("span");
  if (i === 0) d.classList.add("active");
  d.addEventListener("click", () => show(i));
  dotsWrap.appendChild(d);
});
let idx = 0;
function show(i) {
  slides[idx].classList.remove("active");
  dotsWrap.children[idx].classList.remove("active");
  idx = i;
  slides[idx].classList.add("active");
  dotsWrap.children[idx].classList.add("active");
}
setInterval(() => show((idx + 1) % slides.length), 5000);
