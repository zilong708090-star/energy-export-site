/* Analytics is paused: no controls, Google tag, or analytics requests are created. */
(() => {
  "use strict";

  if (window.LantianAnalytics) return;
  const MEASUREMENT_ID = "G-P2KJHXDBS2";
  const ANALYTICS_ENABLED = false;
  const CONSENT_KEY = "lantian_analytics_consent_v1";
  const script = document.currentScript;
  if (!script || !script.src) return;
  const assetURL = script.src;
  const configured = /^G-[A-Z0-9]{6,20}$/.test(MEASUREMENT_ID);
  const disableKey = `ga-disable-${MEASUREMENT_ID}`;
  const adsDenied = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
  let choice = "unknown";
  let storageAvailable = true;
  let active = false;
  let initialized = false;
  let tagLoaded = false;
  let tagFailed = false;
  let pageViewSent = false;
  let panel, preferenceButton, status, acceptButton, rejectButton, closeButton;

  const privacySignal = () => navigator.globalPrivacyControl === true ||
    [navigator.doNotTrack, navigator.msDoNotTrack, window.doNotTrack]
      .some(value => /^(1|yes)$/i.test(String(value || "")));
  const safeURL = value => {
    try {
      const url = new URL(value);
      return /^https?:$/.test(url.protocol) ? `${url.origin}${url.pathname}` : "";
    } catch { return ""; }
  };
  const pagePath = () => window.location.pathname || "/";
  const readChoice = () => {
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      storageAvailable = true;
      return saved === "accepted" || saved === "rejected" ? saved : "unknown";
    } catch {
      storageAvailable = false;
      return "unknown";
    }
  };
  const persist = value => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
      if (window.localStorage.getItem(CONSENT_KEY) !== value) throw new Error("Consent was not saved");
      storageAvailable = true;
      return true;
    } catch {
      storageAvailable = false;
      return false;
    }
  };
  const allowed = () => ANALYTICS_ENABLED && configured && choice === "accepted" && storageAvailable && !privacySignal() && !tagFailed;
  const gtag = function () { window.dataLayer.push(arguments); };

  const clearOwnCookies = () => {
    if (!configured) return;
    const ownNames = new Set(["_ga", `_ga_${MEASUREMENT_ID.slice(2)}`]);
    const hostParts = window.location.hostname.split(".");
    const domains = [""];
    for (let index = 0; index < hostParts.length - 1; index += 1) {
      const domain = hostParts.slice(index).join(".");
      domains.push(`; domain=${domain}`, `; domain=.${domain}`);
    }
    try {
      document.cookie.split(";").forEach(cookie => {
        const name = cookie.trim().split("=")[0];
        if (!ownNames.has(name)) return;
        domains.forEach(domain => {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/${domain}; SameSite=Lax; Secure`;
        });
      });
    } catch { /* Disabled cookie access must not enable analytics. */ }
  };

  // A site-wide pause overrides every saved choice without reading or changing it.
  // Return before installing listeners, creating controls, or loading any assets.
  if (!ANALYTICS_ENABLED) {
    if (configured) window[disableKey] = true;
    clearOwnCookies();
    window.LantianAnalytics = Object.freeze({
      openPreferences: () => {},
      getState: () => ({
        configured, choice: "ignored", enabled: false, paused: true, tagLoaded: false,
        blockedByPrivacySignal: privacySignal(), storageAvailable: null
      }),
      revoke: clearOwnCookies
    });
    return;
  }

  const stop = () => {
    active = false;
    if (configured) window[disableKey] = true;
    if (initialized) {
      // Set the GA opt-out flag before updating consent, including pending tag loads.
      gtag("consent", "update", { analytics_storage: "denied", ...adsDenied });
    }
    clearOwnCookies();
  };

  const sendPageView = () => {
    if (!active || !allowed() || !tagLoaded || pageViewSent) return;
    pageViewSent = true;
    gtag("event", "page_view", {
      page_location: safeURL(window.location.href),
      page_referrer: safeURL(document.referrer),
      page_path: pagePath()
    });
  };

  const start = () => {
    if (!allowed() || !persist("accepted")) { stop(); return; }
    window[disableKey] = false;
    active = true;
    if (initialized) {
      gtag("consent", "update", { analytics_storage: "granted", ...adsDenied });
      sendPageView();
      return;
    }
    initialized = true;
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") window.gtag = gtag;
    gtag("consent", "default", { analytics_storage: "denied", ...adsDenied });
    gtag("set", "ads_data_redaction", true);
    gtag("set", "url_passthrough", false);
    gtag("consent", "update", { analytics_storage: "granted", ...adsDenied });
    gtag("js", new Date());
    gtag("config", MEASUREMENT_ID, {
      send_page_view: false,
      page_location: safeURL(window.location.href),
      page_referrer: safeURL(document.referrer),
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: window.location.hostname,
      cookie_path: "/",
      cookie_expires: 90 * 24 * 60 * 60,
      cookie_update: false,
      cookie_flags: "SameSite=Lax;Secure",
      linker: { accept_incoming: false }
    });
    const googleScript = document.createElement("script");
    googleScript.async = true;
    googleScript.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    googleScript.onload = () => {
      tagLoaded = true;
      if (!allowed()) stop();
      else sendPageView();
      render();
    };
    googleScript.onerror = () => {
      tagFailed = true;
      stop();
      render();
    };
    document.head.append(googleScript);
  };

  const getState = () => ({
    configured, choice, enabled: active && allowed(), paused: false, tagLoaded,
    blockedByPrivacySignal: privacySignal(), storageAvailable
  });
  const render = () => {
    if (!panel) return;
    acceptButton.disabled = !configured || privacySignal() || !storageAvailable || tagFailed;
    closeButton.hidden = choice === "unknown" && storageAvailable;
    if (!configured) status.textContent = "Analytics is not configured. No analytics data is collected.";
    else if (!storageAvailable) status.textContent = "Your preference could not be saved. Analytics stays off in this browser.";
    else if (privacySignal()) status.textContent = "Your browser sends a Global Privacy Control or Do Not Track signal. Analytics stays off while this signal is enabled.";
    else if (tagFailed) status.textContent = "The analytics service could not load. Analytics is off for this page.";
    else if (choice === "accepted") status.textContent = "Optional analytics is allowed. You can withdraw your choice here at any time.";
    else if (choice === "rejected") status.textContent = "Optional analytics is off. Your choice has been saved.";
    else status.textContent = "Analytics is off unless you accept. Your choice does not affect access to the website.";
  };
  const openPreferences = () => {
    if (!panel) return;
    render();
    panel.hidden = false;
    preferenceButton.setAttribute("aria-expanded", "true");
    if (!closeButton.hidden) closeButton.focus();
    else if (acceptButton.disabled) rejectButton.focus();
    else acceptButton.focus();
  };
  const closePreferences = () => {
    if (!panel) return;
    panel.hidden = true;
    preferenceButton.setAttribute("aria-expanded", "false");
    preferenceButton.focus();
  };
  const choose = value => {
    if (value === "accepted" && (!configured || privacySignal() || tagFailed)) { render(); return; }
    choice = value;
    const saved = persist(value);
    if (value === "accepted" && saved) start();
    else stop();
    render();
    if (saved && panel) closePreferences();
  };

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const mount = () => {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = new URL("analytics.css", assetURL).href;
    document.head.append(stylesheet);
    preferenceButton = element("button", "lta-preferences", "Analytics preferences");
    preferenceButton.type = "button";
    preferenceButton.setAttribute("aria-controls", "lta-consent");
    preferenceButton.setAttribute("aria-expanded", "false");
    preferenceButton.addEventListener("click", openPreferences);
    panel = element("aside", "lta-consent");
    panel.id = "lta-consent";
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", "lta-title");
    panel.hidden = choice !== "unknown" || !configured;
    const title = element("h2", "lta-title", "Optional website analytics");
    title.id = "lta-title";
    const copy = element("p", "lta-copy", "With your permission, Google Analytics helps us understand website visits and WhatsApp button clicks. A button click is not a confirmed inquiry. No advertising personalization is enabled.");
    status = element("p", "lta-status");
    status.setAttribute("role", "status");
    const actions = element("div", "lta-actions");
    rejectButton = element("button", "lta-choice", "Reject analytics");
    rejectButton.type = "button";
    rejectButton.addEventListener("click", () => choose("rejected"));
    acceptButton = element("button", "lta-choice", "Accept analytics");
    acceptButton.type = "button";
    acceptButton.addEventListener("click", () => choose("accepted"));
    actions.append(rejectButton, acceptButton);
    const privacy = element("a", "lta-privacy", "Privacy notice");
    privacy.href = new URL("resources/privacy.html", assetURL).href;
    closeButton = element("button", "lta-close", "Close preferences");
    closeButton.type = "button";
    closeButton.addEventListener("click", closePreferences);
    panel.append(title, copy, status, actions, privacy, closeButton);
    panel.addEventListener("keydown", event => {
      if (event.key === "Escape" && choice !== "unknown") closePreferences();
    });
    document.body.append(preferenceButton, panel);
    preferenceButton.setAttribute("aria-expanded", String(!panel.hidden));
    render();
  };

  const buttonLocation = link => {
    if (link.closest(".whatsapp-float")) return "floating";
    if (link.closest(".site-header, header")) return "header";
    if (link.closest(".contact-section, #brief, .whatsapp-contact")) return "contact";
    if (link.closest(".catalog-product, .catalog-quotation, .detail-hero, [data-product-id]")) return "product";
    return "other";
  };
  document.addEventListener("click", event => {
    if (!active || !allowed() || !tagLoaded) {
      if (active && !allowed()) { stop(); render(); }
      return;
    }
    const target = event.target && event.target.nodeType === 1 ? event.target : event.target?.parentElement;
    const link = target?.closest("a[href]");
    if (!link) return;
    let url;
    try { url = new URL(link.getAttribute("href"), window.location.href); } catch { return; }
    if (url.protocol !== "https:" || !["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname.toLowerCase())) return;
    // Deliberately omit the phone, message, full URL and any user-entered content.
    gtag("event", "whatsapp_click", {
      contact_method: "whatsapp", button_location: buttonLocation(link), page_path: pagePath()
    });
  }, { passive: true });

  window.addEventListener("storage", event => {
    if (event.key !== CONSENT_KEY && event.key !== null) return;
    choice = readChoice();
    if (allowed()) start(); else stop();
    render();
  });
  window.addEventListener("pageshow", () => {
    choice = readChoice();
    if (allowed()) start(); else stop();
    render();
  });
  window.LantianAnalytics = Object.freeze({
    openPreferences, getState, revoke: () => choose("rejected")
  });
  choice = readChoice();
  if (configured) window[disableKey] = true;
  if (allowed()) start(); else if (choice === "rejected" || privacySignal()) stop();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount, { once: true });
  else mount();
})();
