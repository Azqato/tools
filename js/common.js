/* Shared helpers: theme toggle + toast. Runs on every page. */
(function () {
  // --- Theme -------------------------------------------------------------
  var KEY = "azqato-theme";
  var root = document.documentElement;

  function apply(theme) {
    root.setAttribute("data-theme", theme);
  }

  var saved = localStorage.getItem(KEY);
  if (saved) {
    apply(saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    apply("dark");
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-theme-toggle]");
    if (!t) return;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    localStorage.setItem(KEY, next);
  });

  // --- Mobile navigation -------------------------------------------------
  // Lives here rather than in five inline scripts, so the topbar behaves the
  // same on every page and a sixth page gets it for free.
  var navBtn = document.getElementById("nav-toggle");
  var navMenu = document.getElementById("nav-menu");

  function setNav(open) {
    if (!navBtn || !navMenu) return;
    navMenu.hidden = !open;
    navBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (navBtn && navMenu) {
    navBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      setNav(navMenu.hidden);
    });

    // Any link inside closes it. Same-page anchors would otherwise leave the
    // menu covering the thing the user just jumped to.
    navMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });

    document.addEventListener("click", function (e) {
      if (navMenu.hidden) return;
      if (!navMenu.contains(e.target)) setNav(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || navMenu.hidden) return;
      setNav(false);
      navBtn.focus();  // focus would otherwise be left on a hidden element
    });
  }

  // --- Toast -------------------------------------------------------------
  var toastEl;
  var timer;
  window.toast = function (msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      // role="status" implies aria-live="polite" and aria-atomic="true", so
      // screen readers announce the message. The toast is the only feedback
      // channel in the project; without this it is silent to them.
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    // force reflow so re-triggering animates
    void toastEl.offsetWidth;
    toastEl.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 1900);
  };

  // --- Copy helper -------------------------------------------------------
  window.copyText = function (text, okMsg) {
    var done = function () { window.toast(okMsg || "Copied to clipboard"); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else {
      fallback();
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  };
  /* --- Footer year --------------------------------------------------------
     Chrome behaviour, so it belongs here rather than in eight inline copies.
     It was eight copies until v1.4.0, and the copies had already drifted: the
     landing page used #year while every tool page used .year. Four pages added
     in v1.4.0 carried the markup without the script and rendered a blank year,
     which is what prompted the move. Both selectors are honoured so no page
     needs its markup changed, and a page with neither is simply unaffected. */
  var years = document.querySelectorAll(".year, #year");
  if (years.length) {
    var now = String(new Date().getFullYear());
    for (var yi = 0; yi < years.length; yi++) years[yi].textContent = now;
  }
})();
