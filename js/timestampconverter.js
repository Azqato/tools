/* Unix timestamp converter. Pure client-side, no DOM access.

   Unlike the Wash Sale Tracker, this module is allowed to hold Date objects,
   because converting between an instant and its representations is the entire
   job. The rule it keeps instead is that an instant is always milliseconds
   since the epoch internally, and the unit question is settled once at the
   boundary rather than being carried around. */
(function () {
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday",
              "Thursday", "Friday", "Saturday"];

  function pad(n, w) {
    var s = String(Math.abs(n));
    while (s.length < (w || 2)) s = "0" + s;
    return (n < 0 ? "-" : "") + s;
  }

  /* Seconds or milliseconds is genuinely ambiguous for a bare integer, so it is
     decided by magnitude. A 10 digit value is seconds (year 2001 to 2286 in
     that reading, versus 1970 within the first four hours in the other), and a
     13 digit value is milliseconds. The guess is always reported back so the
     user can see what was assumed and override it. */
  function detectUnit(n) {
    var abs = Math.abs(n);
    if (abs >= 1e14) return "us";        // microseconds
    if (abs >= 1e11) return "ms";
    return "s";
  }

  function toMillis(value, unit) {
    if (unit === "ms") return value;
    if (unit === "us") return Math.floor(value / 1000);
    return value * 1000;
  }

  function parseNumber(raw) {
    var s = String(raw == null ? "" : raw).trim().replace(/[_,\s]/g, "");
    if (!/^-?\d+(\.\d+)?$/.test(s)) return null;
    var n = Number(s);
    return isFinite(n) ? n : null;
  }

  function relative(ms, nowMs) {
    var diff = (nowMs === undefined ? Date.now() : nowMs) - ms;
    var future = diff < 0;
    var s = Math.abs(diff) / 1000;
    var out;
    if (s < 45) out = Math.round(s) + " second" + (Math.round(s) === 1 ? "" : "s");
    else if (s < 5400) {
      var m = Math.round(s / 60);
      out = m + " minute" + (m === 1 ? "" : "s");
    } else if (s < 129600) {
      var h = Math.round(s / 3600);
      out = h + " hour" + (h === 1 ? "" : "s");
    } else if (s < 2592000) {
      var d = Math.round(s / 86400);
      out = d + " day" + (d === 1 ? "" : "s");
    } else if (s < 31536000) {
      var mo = Math.round(s / 2592000);
      out = mo + " month" + (mo === 1 ? "" : "s");
    } else {
      var y = Math.round(s / 31536000 * 10) / 10;
      out = y + " year" + (y === 1 ? "" : "s");
    }
    return future ? "in " + out : out + " ago";
  }

  function utcString(d) {
    return DAYS[d.getUTCDay()] + ", " + d.getUTCDate() + " " +
      MONTHS[d.getUTCMonth()] + " " + d.getUTCFullYear() + ", " +
      pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) +
      " UTC";
  }

  function localString(d) {
    return DAYS[d.getDay()] + ", " + d.getDate() + " " +
      MONTHS[d.getMonth()] + " " + d.getFullYear() + ", " +
      pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
  }

  // Offset as a human reads it: UTC+01:00, with the sign the user expects
  // rather than the inverted one getTimezoneOffset returns.
  function offsetString(d) {
    var mins = -d.getTimezoneOffset();
    var sign = mins < 0 ? "-" : "+";
    return "UTC" + sign + pad(Math.floor(Math.abs(mins) / 60)) + ":" + pad(Math.abs(mins) % 60);
  }

  /* Returns { ok, ... } for a numeric timestamp. Rejects values outside the
     range a JavaScript Date can represent, which is +/- 8.64e15 ms, rather
     than returning an "Invalid Date" that would render as the literal string. */
  function fromNumber(raw, unit) {
    var n = parseNumber(raw);
    if (n === null) return { ok: false, error: "Enter a whole number." };
    var used = unit && unit !== "auto" ? unit : detectUnit(n);
    var ms = toMillis(n, used);
    if (!isFinite(ms) || Math.abs(ms) > 8.64e15) {
      return { ok: false, error: "That is outside the range a date can represent." };
    }
    var d = new Date(ms);
    if (isNaN(d.getTime())) return { ok: false, error: "That is not a valid instant." };

    return {
      ok: true,
      unit: used,
      guessed: !unit || unit === "auto",
      millis: ms,
      seconds: Math.floor(ms / 1000),
      iso: d.toISOString(),
      utc: utcString(d),
      local: localString(d),
      offset: offsetString(d),
      relative: relative(ms)
    };
  }

  /* Takes the value of a datetime-local input, which has no timezone and is
     therefore read as local time, exactly as the user typing it intends. */
  function fromLocalInput(value) {
    var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(String(value || ""));
    if (!m) return { ok: false, error: "Pick a date and time." };
    var d = new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0));
    if (isNaN(d.getTime())) return { ok: false, error: "That is not a valid date." };
    return fromNumber(d.getTime(), "ms");
  }

  function now() { return fromNumber(Date.now(), "ms"); }

  window.timestampConverter = {
    detectUnit: detectUnit,
    fromNumber: fromNumber,
    fromLocalInput: fromLocalInput,
    relative: relative,
    now: now
  };
})();
