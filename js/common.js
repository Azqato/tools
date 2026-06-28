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

  // --- Toast -------------------------------------------------------------
  var toastEl;
  var timer;
  window.toast = function (msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
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
})();
