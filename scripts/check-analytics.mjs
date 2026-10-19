import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../analytics.js", import.meta.url), "utf8");
const css = await readFile(new URL("../analytics.css", import.meta.url), "utf8");
const TEST_ID = "G-TEST123456";
const KEY = "lantian_analytics_consent_v1";
assert.match(source, /const ANALYTICS_ENABLED = false;/, "Production analytics must stay paused");
const enabledSource = source.replace("const ANALYTICS_ENABLED = false;", "const ANALYTICS_ENABLED = true;");
const testSource = enabledSource.replace(/const MEASUREMENT_ID = "[^"]*";/, `const MEASUREMENT_ID = "${TEST_ID}";`);
assert.notEqual(source, testSource, "Production source must not contain the test measurement ID");
assert.match(source, /const MEASUREMENT_ID = "(?:|G-[A-Z0-9]{6,20})";/);

class Element {
  constructor(tag) { this.tagName = tag.toUpperCase(); this.nodeType = 1; this.children = []; this.attributes = {}; this.listeners = {}; this.parentElement = null; this.hidden = false; this.disabled = false; this.textContent = ""; this.className = ""; }
  append(...children) { children.forEach(child => { child.parentElement = this; this.children.push(child); }); }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  getAttribute(name) { return this.attributes[name] ?? (name === "href" ? this.href ?? null : null); }
  addEventListener(name, handler) { (this.listeners[name] ||= []).push(handler); }
  dispatch(name, event = {}) { for (const handler of this.listeners[name] || []) handler({ target: this, ...event }); }
  focus() { this.focused = true; }
  matches(selector) {
    if (selector.startsWith(".")) return this.className.split(/\s+/).includes(selector.slice(1));
    if (selector.startsWith("#")) return this.id === selector.slice(1);
    if (selector === "a[href]") return this.tagName === "A" && this.getAttribute("href") !== null;
    if (selector.startsWith("[")) return this.getAttribute(selector.slice(1, -1)) !== null;
    return this.tagName.toLowerCase() === selector;
  }
  closest(selectors) { for (let node = this; node; node = node.parentElement) if (selectors.split(",").some(selector => node.matches(selector.trim()))) return node; return null; }
}
const descendants = node => [node, ...node.children.flatMap(descendants)];
function environment(options = {}) {
  const listeners = {}, cookieWrites = [], storageCalls = [], values = new Map();
  if (options.choice) values.set(KEY, options.choice);
  const head = new Element("head"), body = new Element("body");
  const script = new Element("script");
  script.src = "https://www.photovoltaicpanels.com.cn/analytics.js?v=test";
  const document = {
    head, body, currentScript: script, readyState: options.loading ? "loading" : "complete",
    referrer: "https://example.com/referral?email=private@example.com#private-fragment",
    createElement: tag => new Element(tag),
    addEventListener(name, handler) { (listeners[name] ||= []).push(handler); }
  };
  let cookies = "_ga=own; _ga_TEST123456=test-stream; _ga_P2KJHXDBS2=production-stream; _ga_OTHER999=unrelated; session=keep";
  Object.defineProperty(document, "cookie", { get: () => cookies, set: value => { cookieWrites.push(value); const name = value.split("=")[0]; cookies = cookies.split(";").filter(part => part.trim().split("=")[0] !== name).join(";"); } });
  const navigator = { doNotTrack: options.dnt, globalPrivacyControl: options.gpc };
  const window = {
    location: { href: "https://www.photovoltaicpanels.com.cn/products/details/sample.html?email=private@example.com#message", pathname: "/products/details/sample.html", hostname: "www.photovoltaicpanels.com.cn" },
    localStorage: {
      getItem(key) { storageCalls.push(["read", key]); if (options.readFailure) throw new Error("storage blocked"); return values.get(key) ?? null; },
      setItem(key, value) { storageCalls.push(["write", key, value]); if (options.writeFailure) throw new Error("storage full"); values.set(key, value); }
    },
    addEventListener(name, handler) { (listeners[name] ||= []).push(handler); }
  };
  const context = vm.createContext({ window, document, navigator, URL, Date, Set, Object });
  const code = options.production ? source : options.noID ? enabledSource.replace(/const MEASUREMENT_ID = "[^"]*";/, 'const MEASUREMENT_ID = "";') : testSource;
  vm.runInContext(code, context);
  const emit = (name, event = {}) => (listeners[name] || []).forEach(handler => handler(event));
  const buttons = () => descendants(body).filter(node => node.tagName === "BUTTON");
  const button = text => buttons().find(node => node.textContent === text);
  const googleScripts = () => head.children.filter(node => node.tagName === "SCRIPT" && node.src?.includes("googletagmanager.com"));
  const commands = () => (window.dataLayer || []).map(args => Array.from(args));
  const events = name => commands().filter(args => args[0] === "event" && (!name || args[1] === name));
  const accept = () => button("Accept analytics").dispatch("click");
  const reject = () => button("Reject analytics").dispatch("click");
  const load = () => googleScripts()[0]?.onload();
  const clickLink = (href, className = "", parentClass = "", asTextNode = false) => {
    const parent = new Element("div"), anchor = new Element("a"), inner = new Element("span");
    parent.className = parentClass; anchor.className = className; anchor.setAttribute("href", href);
    parent.append(anchor); anchor.append(inner); body.append(parent);
    const event = { target: asTextNode ? { nodeType: 3, parentElement: inner } : inner, prevented: false, preventDefault() { this.prevented = true; } };
    emit("click", event);
    return event;
  };
  return { window, navigator, document, values, cookieWrites, storageCalls, button, googleScripts, commands, events, accept, reject, load, clickLink, emit, rerun: () => vm.runInContext(code, context), listeners, body, head };
}

// Execute the unmodified production source: all saved choices are ignored while paused.
for (const choice of [undefined, "accepted", "rejected"]) {
  for (const loading of [false, true]) {
    const paused = environment({ production: true, choice, loading });
    assert.equal(paused.window["ga-disable-G-P2KJHXDBS2"], true);
    assert.equal(paused.window.LantianAnalytics.getState().paused, true);
    assert.equal(paused.window.LantianAnalytics.getState().enabled, false);
    assert.equal(paused.window.LantianAnalytics.getState().choice, "ignored");
    assert.equal(paused.window.LantianAnalytics.getState().tagLoaded, false);
    assert.equal(paused.head.children.length, 0, "Paused source must not load CSS or Google scripts");
    assert.equal(paused.body.children.length, 0, "Paused source must not create controls or a banner");
    assert.equal(paused.window.dataLayer, undefined);
    assert.equal(paused.window.gtag, undefined);
    assert.equal(Object.keys(paused.listeners).length, 0, "Paused source must not register click, storage, or lifecycle listeners");
    assert.equal(paused.storageCalls.length, 0, "Paused source must not read or overwrite saved consent");
    assert.equal(paused.values.get(KEY), choice);
    assert(paused.cookieWrites.some(value => value.startsWith("_ga=")));
    assert(paused.cookieWrites.some(value => value.startsWith("_ga_P2KJHXDBS2=")));
    assert(paused.cookieWrites.every(value => !value.startsWith("_ga_TEST123456=") && !value.startsWith("_ga_OTHER999=") && !value.startsWith("session=")));
    paused.window.LantianAnalytics.openPreferences();
    paused.window.LantianAnalytics.revoke();
    paused.emit("DOMContentLoaded");
    paused.emit("pageshow");
    paused.emit("storage", { key: KEY });
    paused.rerun();
    assert.equal(paused.head.children.length, 0);
    assert.equal(paused.body.children.length, 0);
    paused.clickLink("https://wa.me/861234?text=private");
    assert.equal(paused.events().length, 0);
    assert.equal(paused.storageCalls.length, 0);
    assert.equal(paused.values.get(KEY), choice);
  }
}
const pausedBlockedStorage = environment({ production: true, readFailure: true, writeFailure: true, choice: "accepted", gpc: true });
assert.equal(pausedBlockedStorage.window.LantianAnalytics.getState().enabled, false);
assert.equal(pausedBlockedStorage.head.children.length, 0);
assert.equal(pausedBlockedStorage.body.children.length, 0);
assert.equal(pausedBlockedStorage.storageCalls.length, 0);

// Retain opt-in regression coverage with the feature explicitly enabled in this VM only.
// Unknown/refused visitors never load Google, initialize dataLayer, or send pings.
const unknown = environment();
assert.equal(unknown.googleScripts().length, 0);
assert.equal(unknown.window.dataLayer, undefined);
unknown.clickLink("https://wa.me/861234?text=private");
assert.equal(unknown.events().length, 0);
assert.equal(unknown.window.LantianAnalytics.getState().enabled, false);
unknown.reject();
assert.equal(unknown.values.get(KEY), "rejected");
assert.equal(unknown.googleScripts().length, 0);
const rejected = environment({ choice: "rejected" });
assert.equal(rejected.googleScripts().length, 0);
assert.equal(rejected.window.dataLayer, undefined);
assert(rejected.cookieWrites.every(value => !value.startsWith("session=") && !value.startsWith("_ga_OTHER999=")));

const accepted = environment();
accepted.accept();
assert.equal(accepted.values.get(KEY), "accepted");
assert.equal(accepted.googleScripts().length, 1);
assert.equal(accepted.googleScripts()[0].src, `https://www.googletagmanager.com/gtag/js?id=${TEST_ID}`);
assert.equal(accepted.events().length, 0, "Wait for tag load before queueing page events");
accepted.load();
accepted.accept();
accepted.rerun();
assert.equal(accepted.googleScripts().length, 1, "Duplicate consent / script evaluation must be idempotent");
assert.equal(accepted.events("page_view").length, 1);
assert.equal(accepted.listeners.click.length, 1);
const config = accepted.commands().find(args => args[0] === "config")[2];
assert.equal(config.send_page_view, false);
assert.equal(config.allow_google_signals, false);
assert.equal(config.allow_ad_personalization_signals, false);
assert.equal(config.cookie_expires, 90 * 24 * 60 * 60);
assert.equal(config.cookie_update, false);
assert.equal(config.cookie_flags, "SameSite=Lax;Secure");
assert.equal(config.linker.accept_incoming, false);
assert.equal(config.page_location, "https://www.photovoltaicpanels.com.cn/products/details/sample.html");
assert.equal(config.page_referrer, "https://example.com/referral");
for (const command of accepted.commands().filter(args => args[0] === "consent")) {
  for (const name of ["ad_storage", "ad_user_data", "ad_personalization"]) assert.equal(command[2][name], "denied");
}
assert(accepted.commands().some(args => args[0] === "consent" && args[1] === "update" && args[2].analytics_storage === "granted"));

const click = accepted.clickLink("https://wa.me/8615224220207?text=Secret%20message", "whatsapp-float");
assert.equal(click.prevented, false, "Analytics must never block the WhatsApp link");
assert.equal(accepted.events("whatsapp_click").length, 1);
assert.deepEqual(Object.keys(accepted.events("whatsapp_click")[0][2]).sort(), ["button_location", "contact_method", "page_path"]);
assert.equal(accepted.events("whatsapp_click")[0][2].button_location, "floating");
assert(!JSON.stringify(accepted.commands()).includes("8615224220207"));
assert(!JSON.stringify(accepted.commands()).includes("Secret"));
assert(!JSON.stringify(accepted.commands()).includes("private@example.com"));
accepted.clickLink("https://example.com/wa.me");
accepted.clickLink("https://wa.me.evil.example/861234");
accepted.clickLink("http://wa.me/861234");
assert.equal(accepted.events("whatsapp_click").length, 1);
for (const [parent, location] of [["site-header", "header"], ["contact-section", "contact"], ["catalog-product", "product"], ["", "other"]]) {
  accepted.clickLink("https://api.whatsapp.com/send?phone=private&text=private", "", parent, true);
  assert.equal(accepted.events("whatsapp_click").at(-1)[2].button_location, location);
}

const beforeRevoke = accepted.events().length;
accepted.window.LantianAnalytics.revoke();
assert.equal(accepted.values.get(KEY), "rejected");
assert.equal(accepted.window[`ga-disable-${TEST_ID}`], true);
assert.equal(accepted.window.LantianAnalytics.getState().enabled, false);
accepted.clickLink("https://wa.me/861234?text=private");
assert.equal(accepted.events().length, beforeRevoke);
assert(accepted.cookieWrites.some(value => value.startsWith("_ga=")));
assert(accepted.cookieWrites.some(value => value.startsWith("_ga_TEST123456=")));
assert(accepted.cookieWrites.every(value => !value.startsWith("_ga_OTHER999=") && !value.startsWith("session=")));
accepted.accept();
assert.equal(accepted.googleScripts().length, 1);
assert.equal(accepted.events("page_view").length, 1, "Reconsent must not double-count the same page");

// Late loads cannot send pageviews after consent is withdrawn.
const pending = environment(); pending.accept(); pending.reject(); pending.load();
assert.equal(pending.events().length, 0);
assert.equal(pending.window[`ga-disable-${TEST_ID}`], true);

for (const option of [{ readFailure: true }, { writeFailure: true }, { writeFailure: true, choice: "accepted" }]) {
  const broken = environment(option); broken.accept();
  assert.equal(broken.googleScripts().length, 0);
  assert.equal(broken.window.LantianAnalytics.getState().enabled, false);
  assert.equal(broken.window.LantianAnalytics.getState().storageAvailable, false);
}
for (const option of [{ dnt: "1" }, { dnt: "yes" }, { gpc: true }, { gpc: true, choice: "accepted" }]) {
  const privateBrowser = environment(option); privateBrowser.accept();
  assert.equal(privateBrowser.googleScripts().length, 0);
  assert.equal(privateBrowser.window.LantianAnalytics.getState().enabled, false);
  assert.equal(privateBrowser.window.LantianAnalytics.getState().blockedByPrivacySignal, true);
  assert.equal(privateBrowser.button("Accept analytics").disabled, true);
}
const changedSignal = environment({ choice: "accepted" }); changedSignal.load();
changedSignal.navigator.globalPrivacyControl = true;
changedSignal.clickLink("https://wa.me/861234");
assert.equal(changedSignal.events("whatsapp_click").length, 0);
assert.equal(changedSignal.window[`ga-disable-${TEST_ID}`], true);

const crossTab = environment({ choice: "accepted" }); crossTab.load();
crossTab.values.set(KEY, "rejected"); crossTab.emit("storage", { key: KEY });
crossTab.clickLink("https://wa.me/861234");
assert.equal(crossTab.events("whatsapp_click").length, 0);
const noID = environment({ noID: true }); noID.accept();
assert.equal(noID.googleScripts().length, 0);
assert.equal(noID.window.LantianAnalytics.getState().configured, false);
assert.equal(noID.window.LantianAnalytics.getState().enabled, false);
const early = environment({ loading: true });
assert.equal(early.body.children.length, 0);
early.emit("DOMContentLoaded");
assert.equal(early.button("Analytics preferences").textContent, "Analytics preferences");
assert.equal(early.head.children.find(node => node.tagName === "LINK").href, "https://www.photovoltaicpanels.com.cn/analytics.css");
assert.equal(descendants(early.body).find(node => node.tagName === "A").href, "https://www.photovoltaicpanels.com.cn/resources/privacy.html");
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /:focus-visible/);
assert.match(css, /bottom: calc\(140px/);
console.log(JSON.stringify({ passed: true, production: "paused", checks: ["production pause ignores all saved choices", "production has no controls or asset requests", "production registers no tracking listeners", "production preserves saved consent", "production exact-cookie cleanup", "opt-in only (VM-enabled regression)", "idempotent tag", "ads always denied", "sanitized URLs", "WhatsApp-only click events", "no navigation interference", "withdrawal", "cookie scope", "storage fail-closed", "DNT/GPC", "cross-tab changes", "missing ID", "script-relative assets", "accessible scoped controls"] }, null, 2));
