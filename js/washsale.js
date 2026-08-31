/* Wash Sale Tracker - date maths and record classification.
   Pure client-side, no DOM access.

   Every date in this module is a plain "YYYY-MM-DD" string, never a Date
   object. Date objects are only ever created inside the two helpers below and
   never escape. The reason is that `new Date("2026-08-31")` parses as UTC
   midnight while `new Date(2026, 7, 31)` parses as local midnight, so mixing
   the two shows the wrong day to anyone west of Greenwich for part of every
   day. All arithmetic runs in UTC, which also has no daylight saving, so no
   day is ever 23 or 25 hours long. */
(function () {
  var DAY = 86400000;
  var WINDOW_DAYS = 30;   // trade date + 30, the forward half of the rule
  var ISO = /^\d{4}-\d{2}-\d{2}$/;

  function pad(n, width) {
    var s = String(n);
    while (s.length < width) s = "0" + s;
    return s;
  }

  function toMs(iso) {
    var p = iso.split("-");
    return Date.UTC(+p[0], +p[1] - 1, +p[2]);
  }

  function fromMs(ms) {
    var d = new Date(ms);
    return pad(d.getUTCFullYear(), 4) + "-" +
           pad(d.getUTCMonth() + 1, 2) + "-" +
           pad(d.getUTCDate(), 2);
  }

  // A string can match the ISO shape and still be nonsense, such as 2026-02-30.
  // Round-tripping through the date maths is the cheapest way to catch that:
  // the browser rolls 02-30 forward to 03-02, so the output stops matching.
  function isValidDate(iso) {
    if (typeof iso !== "string" || !ISO.test(iso)) return false;
    return fromMs(toMs(iso)) === iso;
  }

  function addDays(iso, n) {
    return fromMs(toMs(iso) + n * DAY);
  }

  // Whole days from `a` to `b`. Negative when b is before a.
  function daysBetween(a, b) {
    return Math.round((toMs(b) - toMs(a)) / DAY);
  }

  // Today as the user's calendar sees it, not as UTC sees it. Local getters
  // are correct here and would be wrong anywhere else in this file.
  function today() {
    var d = new Date();
    return pad(d.getFullYear(), 4) + "-" +
           pad(d.getMonth() + 1, 2) + "-" +
           pad(d.getDate(), 2);
  }

  function expiryOf(tradeDate) {
    return addDays(tradeDate, WINDOW_DAYS);
  }

  // Tickers cannot be validated without a network call, which tenet 1 forbids,
  // so they are normalised rather than checked. Dots and hyphens survive
  // because real symbols use them, as in BRK.B and RDS-A.
  function normalizeTicker(raw) {
    if (typeof raw !== "string") return "";
    return raw.replace(/[^A-Za-z0-9.\-]/g, "").toUpperCase().slice(0, 12);
  }

  /* Splits records into active and expired against a reference date.
     This is computed at render time and never stored. A stored flag would go
     stale the moment a tab was left open overnight, and correcting it later
     would need a storage migration.

     A record whose window expires today is still active: day 30 is the last
     day the rule bites, and it is clear from day 31. */
  function classify(records, ref) {
    var on = ref || today();
    var active = [];
    var expired = [];

    (records || []).forEach(function (r) {
      if (!r || !isValidDate(r.date)) return;
      var expiry = expiryOf(r.date);
      var left = daysBetween(on, expiry);
      var row = {
        id: r.id,
        ticker: r.ticker,
        date: r.date,
        expiry: expiry,
        daysLeft: left
      };
      if (left >= 0) active.push(row); else expired.push(row);
    });

    // Active: soonest to clear first, so the next thing to happen is on top.
    active.sort(function (a, b) { return a.daysLeft - b.daysLeft; });
    // Expired: most recently expired first, for the same reason reversed.
    expired.sort(function (a, b) { return b.expiry < a.expiry ? -1 : 1; });

    return { active: active, expired: expired };
  }

  window.washSale = {
    WINDOW_DAYS: WINDOW_DAYS,
    isValidDate: isValidDate,
    addDays: addDays,
    daysBetween: daysBetween,
    today: today,
    expiryOf: expiryOf,
    normalizeTicker: normalizeTicker,
    classify: classify
  };
})();
