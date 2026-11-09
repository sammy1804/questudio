/* ==========================================================
   EDIT HERE — everything the site shows comes from these lists.
   ========================================================== */

// Studio name shown in the header/footer. Change or leave as is.
const STUDIO_NAME = "questudio";

// Contact links. Replace the href values with your own.
// Remove any you don't want; add more by copying a line.
const CONTACT = [
  { label: "Email",     value: "helloquestudio@gmail.com", href: "mailto:helloquestudio@gmail.com" },
  { label: "Instagram", value: "Follow the work",         href: "https://www.instagram.com/samridhi.fig/" },
];

// Your films. To add a new one: drop the files in media/ and add an entry.
//   video  — full film (with sound), played in the lightbox
//   loop   — short silent preview (≈6s) that plays on the card
//   poster — still frame shown before the loop loads
//   aspect — "9:16" (vertical) or "16:9" (widescreen) or "1:1"
//   loopAspect — optional, if the preview loop is cropped differently (e.g. "4:5")
//   grades — optional alternate versions, shown as switch buttons
const WORKS = [
  {
    id: "book",
    title: "When the Book Ends",
    year: 2026,
    aspect: "9:16",
    duration: 54,
    kind: "Animated short",
    technique: ["Thermal grade", "Character animation"],
    blurb: "A lone figure walks out of the pages of a book into a world made of heat — swirling fish, a burning flower, a pen that turns into a boat. Animated entirely in a thermal-camera palette.",
    video: "media/book.mp4",
    loop: "media/book-loop.mp4",
    poster: "media/book.jpg",
    tone: "#3b3fd8",
  },
  {
    id: "kora",
    title: "Kora & Kari",
    year: 2026,
    aspect: "9:16",
    duration: 40,
    kind: "Product film",
    technique: ["3D exploded view", "Motion typography"],
    blurb: "A furniture launch film that takes the work apart. Tables and chairs separate into marble, walnut and oak layers, every joint and dowel called out, then click back together.",
    video: "media/kora.mp4",
    loop: "media/kora-loop.mp4",
    poster: "media/kora.jpg",
    tone: "#e59ab4",
  },
  {
    id: "rain",
    title: "How Rain Is Made",
    year: 2026,
    aspect: "9:16",
    duration: 27,
    kind: "Knowledge film",
    technique: ["Paper cut", "Explainer"],
    blurb: "The water cycle in four steps, built from cut paper: the sun lifts the sea into vapour, clouds gather, rain falls on the mountains and rivers carry it home.",
    video: "media/knowledge-rain.mp4",
    loop: "media/knowledge-rain-loop.mp4",
    poster: "media/knowledge-rain.jpg",
    tone: "#3f86bd",
  },
  {
    id: "pond",
    title: "Pond Memory",
    year: 2026,
    aspect: "9:16",
    duration: 72,
    kind: "Paper-cut animation",
    technique: ["Paper cut", "Collage"],
    blurb: "A folded paper boat drifts across a pink paper pond, past koi, lily pads and a slowly opening lotus. Hand-made collage textures with a stop-motion rhythm.",
    video: "media/pond.mp4",
    loop: "media/pond-loop.mp4",
    poster: "media/pond.jpg",
    tone: "#e2557c",
  },
  {
    id: "mafia",
    title: "Mafia Night",
    year: 2026,
    aspect: "16:9",
    duration: 179,
    kind: "Explainer — Unsorted",
    technique: ["Character animation", "UI motion"],
    blurb: "A how-to-play film for a live party game by Unsorted. A candlelit cast of characters, phones that deal secret roles, and a QR-to-screen flow explained in three minutes.",
    video: "media/mafia.mp4",
    loop: "media/mafia-loop.mp4",
    poster: "media/mafia.jpg",
    tone: "#e0a23a",
  },
  {
    id: "doorways",
    title: "Doorways",
    year: 2026,
    aspect: "9:16",
    duration: 15,
    kind: "Experimental reel",
    technique: ["Live action", "Composited grid"],
    blurb: "One step through a door, repeated until it becomes a wall of doors. Live-action frames tiled and pulled back into a receding red monochrome.",
    video: "media/doorways.mp4",
    loop: "media/doorways-loop.mp4",
    poster: "media/doorways.jpg",
    tone: "#ff2a1a",
    grades: [
      { label: "Final · Pullback", video: "media/doorways.mp4" },
      { label: "Red",              video: "media/doorways-v1_red.mp4" },
      { label: "Crimson",          video: "media/doorways-v2_crimson.mp4" },
      { label: "Split tone",       video: "media/doorways-v3_splittone.mp4" },
    ],
  },
  {
    id: "letgo",
    title: "The Art of Letting Go",
    year: 2026,
    aspect: "16:9",
    duration: 30,
    kind: "Music video",
    technique: ["Chalk line", "Hand lettering"],
    blurb: "A music video drawn in chalk on painted grounds — a clock, a paper boat, a jar of kept flowers, a staircase to a door, a kite let loose. Every line draws itself in, scene by scene.",
    loopAspect: "4:5",
    video: "media/letgo.mp4",
    loop: "media/letgo-loop.mp4",
    poster: "media/letgo.jpg",
    tone: "#e8b931",
  },
];

/* ==========================================================
   Below this line: site behaviour. No need to edit.
   ========================================================== */

const $ = (s, el = document) => el.querySelector(s);
const pad = (n, l = 2) => String(n).padStart(l, "0");
const fmt = (s) => `${Math.floor(s / 60)}:${pad(Math.round(s % 60))}`;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = matchMedia("(hover: hover)").matches;

document.querySelectorAll("[data-studio-name]").forEach((el) => (el.textContent = STUDIO_NAME));
$("#year").textContent = new Date().getFullYear();

const total = WORKS.reduce((a, w) => a + w.duration, 0);
$("#stat-count").textContent = pad(WORKS.length);
$("#stat-runtime").textContent = `${Math.floor(total / 60)}m ${pad(total % 60)}s`;
$("#reel-n").textContent = pad(WORKS.length);

$("#num-films").textContent = pad(WORKS.length);
$("#num-mins").textContent = Math.round(total / 60);

/* ---------- Grid cells: corner dots ---------- */
document.querySelectorAll(".gb").forEach((el) => {
  el.insertAdjacentHTML("afterbegin", '<i class="dt" aria-hidden="true"></i><i class="db" aria-hidden="true"></i>');
});

/* ---------- Char splitting (blink + title swaps) ---------- */
function splitChars(el, text) {
  el.textContent = "";
  el.setAttribute("aria-label", text);
  let i = 0;
  text.split(" ").forEach((word, wi, arr) => {
    const w = document.createElement("span");
    w.className = "word";
    w.setAttribute("aria-hidden", "true");
    [...word].forEach((c) => {
      const s = document.createElement("span");
      s.className = "char";
      s.style.setProperty("--delay", `${i++ * 28}ms`);
      s.textContent = c;
      w.appendChild(s);
    });
    el.appendChild(w);
    if (wi < arr.length - 1) { el.appendChild(document.createTextNode(" ")); i++; }
  });
}
document.querySelectorAll("[data-blink]").forEach((el) => splitChars(el, el.textContent.trim()));

/* ---------- Header: mobile menu ---------- */
(() => {
  const hdr = $("#hdr"), btn = $("#hdr-toggle");
  const set = (open) => { hdr.classList.toggle("open", open); btn.setAttribute("aria-expanded", open); };
  btn.addEventListener("click", () => set(!hdr.classList.contains("open")));
  $("#hdr-nav").addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
})();

/* ---------- Timecode + CRT clock ---------- */
(() => {
  const tc = $("#timecode"), clock = $("#crt-clock");
  const t0 = performance.now();
  const tick = () => {
    const f = Math.floor(((performance.now() - t0) / 1000) * 24);
    tc.textContent = `${pad(Math.floor(f / 86400))}:${pad(Math.floor(f / 1440) % 60)}:${pad(Math.floor(f / 24) % 60)}:${pad(f % 24)}`;
    const d = new Date();
    clock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  tick(); setInterval(tick, 1000 / 24);
})();

/* ---------- Loader: block reveal ---------- */
(() => {
  const loader = $("#loader");
  const boxes = [...loader.querySelectorAll("i")];
  const done = () => {
    boxes.forEach((b) => b.style.setProperty("--d", `${Math.random() * 520}ms`));
    loader.classList.add("out");
    document.body.classList.add("ready");
    setTimeout(() => loader.remove(), 1400);
  };
  if (reduceMotion) { loader.remove(); document.body.classList.add("ready"); return; }
  setTimeout(done, 700);
})();

/* ---------- Hero: grid slider ---------- */
const reel = (() => {
  const media = $("#hero-media"), grid = $("#hero-grid"), title = $("#hero-title");
  const cells = [...grid.querySelectorAll(".hc:not(.hc-title)")];
  // A tile layer in every non-title cell, used for the mosaic transition.
  cells.forEach((c) => c.insertAdjacentHTML("afterbegin", '<span class="tile" aria-hidden="true"><img alt=""></span>'));
  const tiles = cells.map((c) => c.querySelector(".tile"));

  const layers = WORKS.map((w) => {
    const v = document.createElement("video");
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none";
    v.setAttribute("playsinline", ""); v.setAttribute("muted", "");
    v.poster = w.poster; v.src = w.loop;
    media.appendChild(v);
    return v;
  });

  let i = 0, busy = false, timer = null;
  const AUTO = 9000;

  function setText(w) {
    splitChars(title, w.title);
    const kind = $("#hero-kind"), tech = $("#hero-tech");
    kind.textContent = w.kind;
    splitChars(tech, w.technique.join(" · "));
    $("#hero-meta").textContent = `${w.aspect} · ${fmt(w.duration)}`;
    $("#reel-i").textContent = i + 1;
    document.documentElement.style.setProperty("--tone", w.tone);
  }

  function activate(n) {
    layers.forEach((v, k) => {
      v.classList.toggle("on", k === n);
      if (k === n) { v.currentTime = 0; if (!reduceMotion) v.play().catch(() => {}); }
    });
    setTimeout(() => layers.forEach((v, k) => { if (k !== n) v.pause(); }), 900);
  }

  function go(n) {
    if (busy) return;
    busy = true;
    const next = (n + WORKS.length) % WORKS.length;
    grid.classList.add("swap"); // fade chars out
    // Mosaic: random cells flash other films
    const others = WORKS.filter((_, k) => k !== next);
    const picks = tiles.map((t) => ({ t, r: Math.random() })).sort((a, b) => a.r - b.r).slice(0, 7);
    picks.forEach(({ t }, k) => {
      const w = others[k % others.length];
      t.querySelector("img").src = w.poster;
      t.style.setProperty("--d", `${k * 55}ms`);
      t.classList.add("on");
    });
    media.classList.add("dim");
    setTimeout(() => {
      i = next;
      setText(WORKS[i]);
      activate(i);
      grid.classList.remove("swap");
      media.classList.remove("dim");
      picks.forEach(({ t }, k) => { t.style.setProperty("--d", `${k * 45}ms`); t.classList.remove("on"); });
    }, reduceMotion ? 0 : 620);
    setTimeout(() => { busy = false; }, 1100);
    restart();
  }
  function restart() { clearTimeout(timer); if (!reduceMotion) timer = setTimeout(() => go(i + 1), AUTO); }

  $("#reel-n").textContent = WORKS.length;
  setText(WORKS[0]);
  activate(0);
  restart();

  $("#hero-next").addEventListener("click", (e) => { e.stopPropagation(); go(i + 1); });
  grid.addEventListener("click", (e) => { if (grid._swiped) return; if (!e.target.closest(".hc-next")) openPlayer(WORKS[i]); });
  addEventListener("keydown", (e) => {
    if (dlg.open || e.target.closest("input, textarea")) return;
    if (e.key === "ArrowRight" && scrollY < innerHeight) go(i + 1);
    if (e.key === "ArrowLeft" && scrollY < innerHeight) go(i - 1);
  });

  // Swipe left/right on the hero (touch)
  (() => {
    let sx = 0, sy = 0, moved = false;
    grid.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; moved = false; }, { passive: true });
    grid.addEventListener("touchmove", (e) => {
      const dx = e.touches[0].clientX - sx, dy = e.touches[0].clientY - sy;
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) moved = true;
    }, { passive: true });
    grid.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (moved && Math.abs(dx) > 50) { go(dx < 0 ? i + 1 : i - 1); grid._swiped = true; setTimeout(() => (grid._swiped = false), 400); }
    });
  })();

  // Follow cursor ("PLAY ▸")
  const cur = $("#cursor"), hero = $("#reel");
  if (canHover) {
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
      cur.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    hero.addEventListener("mouseenter", () => { cancelAnimationFrame(raf); loop(); });
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      x = e.clientX - r.left + 14; y = e.clientY - r.top + 14;
      cur.classList.toggle("on", !e.target.closest("[data-cursor-hidden]"));
    });
    hero.addEventListener("mouseleave", () => { cur.classList.remove("on"); cancelAnimationFrame(raf); });
  }

  return {
    pause() { clearTimeout(timer); layers[i].pause(); },
    resume() { if (!reduceMotion) layers[i].play().catch(() => {}); restart(); },
  };
})();
new IntersectionObserver(([e]) => (e.isIntersecting && !$("#player").open ? reel.resume() : reel.pause()))
  .observe($("#reel"));

/* ---------- Intro: horizontal tumbling words (truus-style) ---------- */
(() => {
  const sec = $("#intro"), track = $("#hw-track"), h2 = $("#hw-h2");
  // Build letters. Text between |pipes| is the accent word.
  const raw = h2.dataset.text;
  h2.setAttribute("aria-label", raw.replace(/\|/g, ""));
  h2.textContent = "";
  let accent = false;
  const letters = [];
  // Seeded random so the scatter is the same on every visit.
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  raw.split("").forEach((c) => {
    if (c === "|") { accent = !accent; return; }
    if (c === " ") { h2.appendChild(document.createTextNode(" ")); return; }
    const l = document.createElement("span");
    l.className = "hw-l" + (accent ? " acc" : "");
    l.setAttribute("aria-hidden", "true");
    l.textContent = c;
    const dir = rnd() < 0.5 ? -1 : 1;
    l._amp = dir * (110 + rnd() * 220);   // vertical scatter (px)
    l._rot = (rnd() * 2 - 1) * 42;        // rotation (deg)
    h2.appendChild(l);
    letters.push(l);
  });
  const stickers = [...track.querySelectorAll(".hw-sticker")];
  const arrow = track.querySelectorAll(".hw-arrow path");
  const text = $(".hw-text", sec);

  let trackW = 0, base = [];
  const measure = () => {
    track.style.transform = "none";
    letters.forEach((l) => (l.style.transform = "none"));
    trackW = h2.scrollWidth;
    base = letters.map((l) => l.offsetLeft + l.offsetWidth / 2);
    stickers.forEach((s) => {
      const L = letters[Math.min(letters.length - 1, +s.dataset.at)];
      s.style.left = `${L.offsetLeft + L.offsetWidth / 2}px`;
      s._x = L.offsetLeft;
    });
    update();
  };
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const update = () => {
    const r = sec.getBoundingClientRect();
    const span = sec.offsetHeight - innerHeight;
    const p = Math.min(1, Math.max(0, -r.top / span));
    const W = innerWidth;
    const x0 = W * 0.92, x1 = W * 0.6 - trackW;
    const x = x0 + (x1 - x0) * p;
    track.style.transform = `translate3d(${x}px,0,0)`;
    if (reduceMotion) return;
    letters.forEach((l, k) => {
      const sx = x + base[k];                         // letter centre on screen
      const t = ease(Math.min(1, Math.max(0, (W * 1.02 - sx) / (W * 0.42))));
      const k1 = 1 - t;
      l.style.transform = `translate3d(0,${(l._amp * k1 * k1).toFixed(1)}px,0) rotate(${(l._rot * k1).toFixed(1)}deg)`;
    });
    stickers.forEach((s) => s.classList.toggle("on", x + s._x < W * 0.72));
    const d = Math.min(1, Math.max(0, (p - 0.08) * 2.4));
    arrow[0].style.strokeDashoffset = 1 - d;
    arrow[1].style.strokeDashoffset = d >= 1 ? 0 : 1;
    text.classList.toggle("on", p > 0.04);
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", measure);
  document.fonts?.ready.then(measure);
  measure();
})();

/* ---------- Craft: service rows play their film on hover ---------- */
(() => {
  const byId = Object.fromEntries(WORKS.map((w) => [w.id, w]));
  document.querySelectorAll(".svc-row").forEach((row) => {
    const w = byId[row.dataset.film];
    if (!w) return;
    row.style.setProperty("--tone", w.tone);
    row.tabIndex = 0;
    row.setAttribute("role", "button");
    row.setAttribute("aria-label", `${row.querySelector(".svc-name").textContent} — play ${w.title}`);
    row.insertAdjacentHTML("afterbegin", `<span class="svc-media" aria-hidden="true"><img src="${w.poster}" alt=""><video muted loop playsinline preload="none"></video></span>`);
    const v = row.querySelector("video");
    const on = () => { if (!v.src) v.src = w.loop; if (!reduceMotion) v.play().catch(() => {}); };
    const off = () => v.pause();
    row.addEventListener("mouseenter", on);
    row.addEventListener("focus", on);
    row.addEventListener("mouseleave", off);
    row.addEventListener("blur", off);
    row.addEventListener("click", () => openPlayer(w));
    row.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPlayer(w); } });
  });
  // Format frames: live loops while on screen
  const io = new IntersectionObserver((entries) => entries.forEach(({ target: v, isIntersecting }) => {
    if (isIntersecting) { if (!v.src) v.src = v.dataset.src; if (!reduceMotion) v.play().catch(() => {}); } else v.pause();
  }), { rootMargin: "120px" });
  document.querySelectorAll("#fmt-row video").forEach((v) => io.observe(v));
})();

/* ---------- Work rail (curved, scroll-driven) ---------- */
(() => {
  const wrap = $("#rail-wrap"), rail = $("#rail");
  const shots = [];
  WORKS.forEach((w, n) => {
    const a = w.loopAspect || w.aspect;
    const el = document.createElement("article");
    el.className = "shot";
    el.dataset.aspect = a;
    el.style.setProperty("--tone", w.tone);
    el.innerHTML = `
      <button class="shot-media" aria-label="Play ${w.title}">
        <video muted loop playsinline preload="none" poster="${w.poster}" data-src="${w.loop}"></video>
        <span class="shot-vignette" aria-hidden="true"></span>
        <span class="vf-c tl"></span><span class="vf-c tr"></span><span class="vf-c bl"></span><span class="vf-c br"></span>
        <span class="shot-top mono"><span><span class="rec"></span> ${pad(n + 1)}</span><span>${w.aspect} · ${fmt(w.duration)}</span></span>
        <span class="shot-play mono">▶ Watch film</span>
      </button>
      <div class="shot-cap">
        <h3>${w.title}</h3>
        <p class="mono">${w.kind} <i>/</i> ${w.technique.join(" · ")}</p>
      </div>`;
    $(".shot-media", el).addEventListener("click", () => openPlayer(w));
    rail.appendChild(el);
    shots.push(el);
  });
  const slot = document.createElement("a");
  slot.href = "#contact";
  slot.className = "shot slot";
  slot.dataset.aspect = "9:16";
  slot.innerHTML = `
    <span class="shot-media">
      <span class="vf-c tl"></span><span class="vf-c tr"></span><span class="vf-c bl"></span><span class="vf-c br"></span>
      <span class="slot-in"><span class="mono kicker">${pad(WORKS.length + 1)} — Open slot</span><span class="slot-title">Your film<br><em>goes here.</em></span><span class="mono">Start a project →</span></span>
    </span>
    <div class="shot-cap"><h3>Next on the reel</h3><p class="mono">Commission</p></div>`;
  rail.appendChild(slot);
  shots.push(slot);
  $("#rail-n").textContent = pad(shots.length);

  let dist = 0;
  const size = () => {
    dist = Math.max(0, rail.scrollWidth - innerWidth);
    wrap.style.height = `${dist + innerHeight}px`;
    update();
  };
  const update = () => {
    const r = wrap.getBoundingClientRect();
    const p = dist ? Math.min(1, Math.max(0, -r.top / dist)) : 0;
    rail.style.transform = `translate3d(${-p * dist}px,0,0)`;
    $("#rail-bar").style.transform = `scaleX(${p})`;
    const cx = innerWidth / 2;
    let best = 0, bestD = 1e9;
    shots.forEach((el, n) => {
      const b = el.getBoundingClientRect();
      const d = (b.left + b.width / 2 - cx) / innerWidth; // -1..1
      const ad = Math.min(1, Math.abs(d));
      if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = n; }
      if (!reduceMotion) {
        el.style.transform = `perspective(1400px) rotateY(${d * -28}deg) translateZ(${-ad * 140}px)`;
      }
      el.style.setProperty("--dim", (ad * 0.75).toFixed(3));
    });
    $("#rail-i").textContent = pad(best + 1);
    shots.forEach((el, n) => el.classList.toggle("active", n === best));
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", size);
  addEventListener("load", size);
  size();

  // Play loops only while on screen.
  const rio = new IntersectionObserver((entries) => entries.forEach(({ target: v, isIntersecting }) => {
    if (isIntersecting) { if (!v.src) v.src = v.dataset.src; if (!reduceMotion) v.play().catch(() => {}); }
    else v.pause();
  }), { rootMargin: "200px" });
  rail.querySelectorAll("video").forEach((v) => rio.observe(v));
})();

/* ---------- Contact (retro icons) ---------- */
const ICONS = {
  email: `<path d="M3 6h18v12H3z M3 6l9 7 9-7" />`,
  instagram: `<path d="M4 4h16v16H4z M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0 M16.5 7.5h1" />`,
  booking: `<path d="M4 6h16v14H4z M4 10h16 M8 3v5 M16 3v5 M8 14h2 M12 14h2 M8 17h2" />`,
  default: `<path d="M5 3h10l4 4v14H5z M15 3v4h4 M8 12h8 M8 16h6" />`,
};
(() => {
  const wrap = $("#contact-links");
  CONTACT.forEach((c) => {
    const a = document.createElement("a");
    a.className = "crt-icon";
    a.href = c.href;
    if (/^https?:/.test(c.href)) { a.target = "_blank"; a.rel = "noopener"; }
    const icon = ICONS[c.label.toLowerCase()] || ICONS.default;
    a.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="miter" shape-rendering="crispEdges">${icon}</svg>
      <span class="ci-label">${c.label}</span>
      <span class="ci-value">${c.value}</span>`;
    wrap.appendChild(a);
  });
})();

/* ---------- Player (atck-style chrome) ---------- */
const dlg = $("#player");
const pv = $("#player-video");
let grades = null, gradeIdx = 0;
function openPlayer(w) {
  reel.pause();
  dlg.style.setProperty("--tone", w.tone);
  $("#pl-title").textContent = w.title;
  $("#pl-kind").textContent = w.kind;
  grades = w.grades || null; gradeIdx = 0;
  const gb = $("#pl-grade");
  gb.hidden = !grades;
  if (grades) gb.lastChild.textContent = `Grade · ${grades[0].label}`;
  pv.poster = w.poster;
  pv.src = w.video;
  pv.muted = false;
  $("#pl-sound").lastChild.textContent = "Sound on";
  dlg.showModal();
  document.body.classList.add("locked");
  pv.play().catch(() => {});
}
const fmtT = (t) => `${pad(Math.floor(t / 60))}:${pad(Math.floor(t % 60))}`;
pv.addEventListener("timeupdate", () => {
  $("#pl-time").lastChild.textContent = fmtT(pv.currentTime || 0);
  $("#pl-bar").style.transform = `scaleX(${pv.duration ? pv.currentTime / pv.duration : 0})`;
});
$("#pl-stage").addEventListener("click", () => {
  if (pv.paused) pv.play(); else pv.pause();
  const st = $("#pl-state");
  st.textContent = pv.paused ? "Paused" : "Play";
  st.classList.remove("flash"); void st.offsetWidth; st.classList.add("flash");
});
const seek = (e) => {
  const r = $("#pl-progress").getBoundingClientRect();
  if (pv.duration) pv.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * pv.duration;
};
$("#pl-progress").addEventListener("click", seek);
$("#pl-progress").addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") pv.currentTime += 5;
  if (e.key === "ArrowLeft") pv.currentTime -= 5;
});
$("#pl-sound").addEventListener("click", (e) => {
  pv.muted = !pv.muted;
  e.currentTarget.lastChild.textContent = pv.muted ? "Sound off" : "Sound on";
});
$("#pl-fs").addEventListener("click", () => {
  const el = $("#pl-stage");
  if (document.fullscreenElement) document.exitFullscreen();
  else (el.requestFullscreen || el.webkitRequestFullscreen || (() => pv.webkitEnterFullscreen?.())).call(el);
});
$("#pl-grade").addEventListener("click", (e) => {
  if (!grades) return;
  gradeIdx = (gradeIdx + 1) % grades.length;
  const t = pv.currentTime;
  pv.src = grades[gradeIdx].video;
  pv.addEventListener("loadedmetadata", () => { pv.currentTime = t; pv.play().catch(() => {}); }, { once: true });
  e.currentTarget.lastChild.textContent = `Grade · ${grades[gradeIdx].label}`;
});
dlg.addEventListener("close", () => {
  pv.pause(); pv.removeAttribute("src"); pv.load();
  document.body.classList.remove("locked");
  if ($("#reel").getBoundingClientRect().bottom > 0) reel.resume();
});
$("#player-close").addEventListener("click", () => dlg.close());
addEventListener("keydown", (e) => { if (dlg.open && e.key === " ") { e.preventDefault(); $("#pl-stage").click(); } });

/* ---------- Reveal on scroll ---------- */
(() => {
  const els = document.querySelectorAll(".svc-row, .band-cell, .crt, .head-row, .make-head");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach((el, n) => { el.style.setProperty("--d", `${(n % 6) * 60}ms`); io.observe(el); });
})();
