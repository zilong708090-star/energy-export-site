const solutions = {
  commercial: {
    title: "Commercial & industrial",
    source: "Solar PV",
    load: "Facility load",
    copy: "Coordinate solar generation and battery storage to shift demand, strengthen backup capability and make on-site energy more predictable.",
    benefits: ["Peak management", "Solar self-consumption", "Backup power"]
  },
  microgrid: {
    title: "Hybrid microgrid",
    source: "Solar + wind",
    load: "Microgrid loads",
    copy: "Combine complementary renewable sources with storage and conversion equipment to balance variable generation across an independent power network.",
    benefits: ["Multi-source generation", "Energy balancing", "Grid-forming options"]
  },
  remote: {
    title: "Remote & telecom",
    source: "Solar / wind",
    load: "Critical remote load",
    copy: "Reduce generator runtime and support continuous operation where grid access is weak, expensive or unavailable.",
    benefits: ["Reduced fuel use", "Remote-site resilience", "Modular expansion"]
  },
  sme: {
    title: "Residential & SME",
    source: "Rooftop solar",
    load: "Home / business",
    copy: "Connect rooftop generation, hybrid inversion and right-sized storage for daily self-consumption and essential-load backup.",
    benefits: ["Day-to-night energy", "Essential-load backup", "Simple system path"]
  }
};

const q = (selector, scope = document) => scope.querySelector(selector);
const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const hero = q(".hero");

if (hero) {
  const track = q("[data-hero-track]", hero);
  const slides = qa("[data-hero-slide]", hero);
  const dots = qa("[data-slide-to]", hero);
  const prev = q("[data-hero-prev]", hero);
  const next = q("[data-hero-next]", hero);
  const status = q("[data-hero-status]", hero);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const autoDelay = 6000;
  let current = 0;
  let autoTimer = null;
  let finishTimer = null;
  let snapPosition = null;
  let isAnimating = false;
  let isHovering = false;
  let pointerStart = null;

  const setPosition = (position, instant = false) => {
    if (instant) track.classList.add("is-jumping");
    hero.style.setProperty("--hero-index", String(position));
    if (instant) {
      track.getBoundingClientRect();
      requestAnimationFrame(() => track.classList.remove("is-jumping"));
    }
  };

  const updateState = (announce = false) => {
    slides.forEach((slide, index) => {
      const active = index === current;
      slide.classList.toggle("is-active", active);
      slide.toggleAttribute("inert", !active);
      if (active) slide.removeAttribute("aria-hidden");
      else slide.setAttribute("aria-hidden", "true");
    });

    dots.forEach((dot, index) => {
      const active = index === current;
      dot.classList.toggle("is-active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    if (announce && status) {
      status.textContent = `Slide ${current + 1} of ${slides.length}: ${slides[current].dataset.slideName}`;
    }
  };

  const finishMove = () => {
    window.clearTimeout(finishTimer);
    if (snapPosition !== null) setPosition(snapPosition, true);
    snapPosition = null;
    isAnimating = false;
  };

  const goTo = (target, options = {}) => {
    if (slides.length < 2 || isAnimating) return;
    const direction = options.direction || 0;
    const normalized = (target + slides.length) % slides.length;
    let physicalPosition = normalized + 1;

    if (direction > 0 && current === slides.length - 1 && normalized === 0) {
      physicalPosition = slides.length + 1;
      snapPosition = 1;
    } else if (direction < 0 && current === 0 && normalized === slides.length - 1) {
      physicalPosition = 0;
      snapPosition = slides.length;
    } else {
      snapPosition = null;
    }

    current = normalized;
    updateState(Boolean(options.announce));
    isAnimating = !reduceMotion.matches;
    setPosition(physicalPosition);

    if (isAnimating) finishTimer = window.setTimeout(finishMove, 950);
    else finishMove();
  };

  const stopAuto = () => {
    window.clearInterval(autoTimer);
    autoTimer = null;
  };

  const startAuto = () => {
    stopAuto();
    if (slides.length < 2 || reduceMotion.matches || document.hidden || isHovering) return;
    autoTimer = window.setInterval(() => goTo(current + 1, { direction: 1 }), autoDelay);
  };

  const manualMove = (target, direction = 0) => {
    stopAuto();
    goTo(target, { direction, announce: true });
    startAuto();
  };

  if (track && slides.length > 1) {
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    [firstClone, lastClone].forEach(clone => {
      clone.classList.add("is-clone");
      clone.classList.remove("is-active");
      clone.removeAttribute("data-hero-slide");
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("inert", "");
    });
    track.classList.add("is-jumping");
    track.prepend(lastClone);
    track.append(firstClone);
    setPosition(1, true);

    track.addEventListener("transitionend", event => {
      if (event.propertyName === "transform") finishMove();
    });

    prev?.addEventListener("click", () => manualMove(current - 1, -1));
    next?.addEventListener("click", () => manualMove(current + 1, 1));
    dots.forEach(dot => dot.addEventListener("click", () => manualMove(Number(dot.dataset.slideTo))));

    hero.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        manualMove(current - 1, -1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        manualMove(current + 1, 1);
      }
    });

    hero.addEventListener("pointerenter", event => {
      if (event.pointerType !== "touch") {
        isHovering = true;
        stopAuto();
      }
    });

    hero.addEventListener("pointerleave", event => {
      if (event.pointerType !== "touch") {
        isHovering = false;
        startAuto();
      }
    });

    hero.addEventListener("pointerdown", event => {
      if (event.pointerType === "touch" || event.pointerType === "pen") {
        pointerStart = { x: event.clientX, y: event.clientY };
      }
    }, { passive: true });

    hero.addEventListener("pointerup", event => {
      if (!pointerStart) return;
      const deltaX = event.clientX - pointerStart.x;
      const deltaY = event.clientY - pointerStart.y;
      pointerStart = null;
      if (Math.abs(deltaX) < 52 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
      if (deltaX > 0) manualMove(current - 1, -1);
      else manualMove(current + 1, 1);
    }, { passive: true });

    hero.addEventListener("pointercancel", () => { pointerStart = null; });
    document.addEventListener("visibilitychange", () => document.hidden ? stopAuto() : startAuto());
    reduceMotion.addEventListener?.("change", startAuto);
    updateState();
    startAuto();
  }
}

const header = q(".site-header");
const navToggle = q(".nav-toggle");
const nav = q(".site-nav");

if (header) {
  const setHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 30);
  setHeader();
  window.addEventListener("scroll", setHeader, { passive: true });
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
    nav.classList.toggle("is-open", !open);
    document.body.classList.toggle("nav-open", !open);
  });

  qa(".site-nav a").forEach(link => link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }));
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .13, rootMargin: "0px 0px -35px" });
  qa(".reveal").forEach(el => revealObserver.observe(el));
} else {
  qa(".reveal").forEach(el => el.classList.add("is-visible"));
}

const productSection = q("#products");
const whatsappFloat = q(".whatsapp-float");
if (productSection && whatsappFloat && "IntersectionObserver" in window) {
  const productFloatObserver = new IntersectionObserver(([entry]) => {
    whatsappFloat.classList.toggle("is-over-products", entry.isIntersecting);
  }, { rootMargin: "-72px 0px -72px", threshold: .02 });
  productFloatObserver.observe(productSection);
}

qa("[data-solution]").forEach(tab => {
  tab.addEventListener("click", () => {
    const item = solutions[tab.dataset.solution];
    if (!item) return;
    qa("[data-solution]").forEach(button => button.setAttribute("aria-selected", String(button === tab)));
    q("#solution-title").textContent = item.title;
    q("#flow-source").textContent = item.source;
    q("#flow-load").textContent = item.load;
    q("#solution-copy").textContent = item.copy;
    q("#solution-benefits").innerHTML = item.benefits.map(value => `<li>${value}</li>`).join("");
  });
});

qa(".application-select").forEach(button => {
  button.addEventListener("click", () => {
    const interest = q("#interest");
    const application = q("#application");
    const brief = q("#brief");
    if (!interest || !application || !brief) return;
    interest.value = button.dataset.interestChoice || "Integrated Hybrid System";
    application.value = button.dataset.applicationChoice || "";
    brief.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const projectForm = q("#project-form");
if (projectForm) {
  projectForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const interest = data.get("interest");
    const application = data.get("application");
    if (!interest || !application) {
      event.currentTarget.reportValidity();
      return;
    }
    const lines = [
      "Hello, I'd like to discuss an energy project.",
      "",
      `Product: ${interest}`,
      `Application: ${application}`,
      `Country / market: ${data.get("market") || "To be confirmed"}`,
      `Target size: ${data.get("scale") || "To be confirmed"}`,
      `Grid mode: ${data.get("grid-mode") || "To be confirmed"}`,
      `Installation environment: ${data.get("environment") || "To be confirmed"}`,
      `Notes: ${data.get("details") || "No additional notes yet"}`
    ];
    window.open(`https://wa.me/8615224220207?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  });
}
