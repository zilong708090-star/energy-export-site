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

qa(".product-select").forEach(button => {
  button.addEventListener("click", () => {
    const product = button.closest("[data-product]").dataset.product;
    const interest = q("#interest");
    const brief = q("#brief");
    if (!interest || !brief) return;
    interest.value = product;
    button.classList.add("is-added");
    button.textContent = "Added to project brief";
    brief.scrollIntoView({ behavior: "smooth", block: "start" });
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
