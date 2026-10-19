// Analytics is paused; the isolated module applies opt-out without displaying UI.
// Resolve from this shared script so nested resource and product pages work too.
(() => {
  try {
    const appScript = document.currentScript;
    if (!appScript?.src || window.LantianAnalytics || document.querySelector('script[data-lantian-analytics]')) return;
    const analyticsScript = document.createElement('script');
    analyticsScript.src = new URL('analytics.js?v=37.1', appScript.src).href;
    analyticsScript.async = true;
    analyticsScript.setAttribute('data-lantian-analytics', '');
    (document.head || document.documentElement).appendChild(analyticsScript);
  } catch {
    // A blocked or unavailable analytics module must not interrupt the website.
  }
})();

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

const whatsappContact = q(".whatsapp-contact");
const whatsappFloat = q(".whatsapp-float");
const homepageProductGrid = q(".product-grid");
const companySection = q(".home-page #company");
const pageFooter = q("footer.footer");
if (pageFooter && whatsappFloat && "IntersectionObserver" in window) {
  const footerObserver = new IntersectionObserver(([entry]) => {
    whatsappFloat.classList.toggle("is-at-footer", entry.isIntersecting);
  });
  footerObserver.observe(pageFooter);
}
if (companySection && whatsappFloat && "IntersectionObserver" in window) {
  const companyObserver = new IntersectionObserver(([entry]) => {
    whatsappFloat.classList.toggle("is-at-company", entry.isIntersecting);
  });
  companyObserver.observe(companySection);
}
if (homepageProductGrid && whatsappFloat && "IntersectionObserver" in window) {
  const productGridObserver = new IntersectionObserver(([entry]) => {
    whatsappFloat.classList.toggle("is-over-product-grid", entry.isIntersecting);
  });
  productGridObserver.observe(homepageProductGrid);
}
if (whatsappContact && whatsappFloat && "IntersectionObserver" in window) {
  const contactObserver = new IntersectionObserver(([entry]) => {
    whatsappFloat.classList.toggle("is-at-contact", entry.isIntersecting && entry.intersectionRatio >= .15);
  }, { threshold: [0, .15] });
  contactObserver.observe(whatsappContact);
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

const photoDialog = q("#photo-dialog");
if (photoDialog && typeof photoDialog.showModal === "function") {
  const galleryFigures = qa(".reference-shot, [data-photo-group]");
  let collection = [];
  let photoIndex = 0;
  const showPhoto = index => {
    photoIndex = (index + collection.length) % collection.length;
    const figure = collection[photoIndex];
    const original = q("img", figure);
    const enlarged = q(".photo-dialog__stage img", photoDialog);
    enlarged.src = original.currentSrc || original.src;
    enlarged.alt = original.alt;
    q("#photo-dialog-title", photoDialog).textContent = figure.dataset.photoTitle || q("figcaption strong", figure)?.textContent || original.alt;
    q("[data-photo-count]", photoDialog).textContent = `${photoIndex + 1} / ${collection.length}`;
    const sourceNote = q("[data-photo-note-output]", photoDialog);
    if (sourceNote) {
      sourceNote.textContent = figure.dataset.photoNote || "";
      sourceNote.hidden = !sourceNote.textContent;
    }
  };
  galleryFigures.forEach(figure => {
    const button = document.createElement("button");
    button.className = "photo-open";
    button.type = "button";
    button.textContent = figure.dataset.photoAction || "View image ↗";
    button.setAttribute("aria-label", `View larger image: ${q("img", figure).alt}`);
    const openPhoto = () => {
      const group = figure.dataset.photoGroup || "field";
      collection = galleryFigures.filter(item => (item.dataset.photoGroup || "field") === group);
      showPhoto(collection.indexOf(figure));
      photoDialog.showModal();
      document.body.classList.add("photo-is-open");
    };
    button.addEventListener("click", openPhoto);
    if (figure.hasAttribute("data-photo-group")) {
      figure.addEventListener("click", event => {
        if (!event.target.closest("button, a")) openPhoto();
      });
    }
    figure.append(button);
  });
  q(".photo-dialog__close", photoDialog).addEventListener("click", () => photoDialog.close());
  q(".photo-dialog__previous", photoDialog).addEventListener("click", () => showPhoto(photoIndex - 1));
  q(".photo-dialog__next", photoDialog).addEventListener("click", () => showPhoto(photoIndex + 1));
  photoDialog.addEventListener("keydown", event => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      showPhoto(photoIndex + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
  photoDialog.addEventListener("click", event => {
    if (event.target !== photoDialog) return;
    const bounds = photoDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) photoDialog.close();
  });
  photoDialog.addEventListener("close", () => document.body.classList.remove("photo-is-open"));
}
