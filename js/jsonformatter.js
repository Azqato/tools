/* JSON formatter. Pure client-side, no DOM access.

   The value this adds over calling JSON.parse in the page is the error report.
   A bare SyntaxError tells the user nothing they can act on in a 300 line
   document. This module turns the failure into a line, a column, and the line
   itself, which is the difference between a usable tool and a wrapper.

   The position is found by scanning the text here rather than by reading it out
   of the engine's error message. That was the original approach and it broke:
   V8 changed its wording to "Unexpected token '}', ...\"b\": }...\" is not valid
   JSON", which carries a context snippet but no offset at all, and it never
   gave one for "Unexpected end of JSON input" in any version. Error strings are
   not an API. A scanner is a hundred lines and is correct on every engine and
   every version, so it is the cheaper thing to own. */
(function () {
  var DIGIT = /[0-9]/;
  var HEX4 = /^[0-9a-fA-F]{4}$/;

  // Guards against a stack overflow on hostile input, which would escape as a
  // RangeError rather than a located parse failure.
  var MAX_DEPTH = 512;

  function ScanError(at) { this.at = at; }

  /* Recursive descent over RFC 8259, reporting the offset of the first thing
     that is not valid there. It answers only "where", never "what": the engine's
     own message is better prose than anything reimplemented here, so the two are
     used together, wording from the engine and position from this. */
  function scan(s) {
    var i = 0, n = s.length, depth = 0;

    function err(at) { throw new ScanError(at === undefined ? i : at); }

    function ws() {
      for (;;) {
        var c = s.charAt(i);
        if (c === " " || c === "\t" || c === "\n" || c === "\r") i++;
        else return;
      }
    }

    function lit(word) {
      if (s.substr(i, word.length) !== word) err();
      i += word.length;
    }

    function str() {
      i++;                                   // the opening quote
      for (;;) {
        if (i >= n) err(n);                  // unterminated: point at the end
        var c = s.charAt(i);
        if (c === '"') { i++; return; }
        if (c === "\\") {
          i++;
          if (i >= n) err(n);
          var e = s.charAt(i);
          if ("\"\/bfnrt".indexOf(e) >= 0) { i++; continue; }
          if (e === "u") {
            if (!HEX4.test(s.substr(i + 1, 4))) err(i + 1);
            i += 5;
            continue;
          }
          err(i);
        }
        if (c < " ") err(i);                 // raw control character
        i++;
      }
    }

    function num() {
      if (s.charAt(i) === "-") i++;
      if (s.charAt(i) === "0") i++;
      else if (DIGIT.test(s.charAt(i))) { while (DIGIT.test(s.charAt(i))) i++; }
      else err(i);
      if (s.charAt(i) === ".") {
        i++;
        if (!DIGIT.test(s.charAt(i))) err(i);
        while (DIGIT.test(s.charAt(i))) i++;
      }
      if (s.charAt(i) === "e" || s.charAt(i) === "E") {
        i++;
        if (s.charAt(i) === "+" || s.charAt(i) === "-") i++;
        if (!DIGIT.test(s.charAt(i))) err(i);
        while (DIGIT.test(s.charAt(i))) i++;
      }
    }

    function value() {
      if (++depth > MAX_DEPTH) err(i);
      ws();
      if (i >= n) err(n);
      var c = s.charAt(i);
      if (c === "{") { i++; obj(); }
      else if (c === "[") { i++; arr(); }
      else if (c === '"') str();
      else if (c === "t") lit("true");
      else if (c === "f") lit("false");
      else if (c === "n") lit("null");
      else if (c === "-" || DIGIT.test(c)) num();
      else err(i);
      depth--;
    }

    function obj() {
      ws();
      if (s.charAt(i) === "}") { i++; return; }
      for (;;) {
        ws();
        if (i >= n) err(n);
        if (s.charAt(i) !== '"') err(i);
        str();
        ws();
        if (s.charAt(i) !== ":") err(i);
        i++;
        value();
        ws();
        if (i >= n) err(n);
        var c = s.charAt(i);
        if (c === ",") { i++; continue; }
        if (c === "}") { i++; return; }
        err(i);
      }
    }

    function arr() {
      ws();
      if (s.charAt(i) === "]") { i++; return; }
      for (;;) {
        value();
        ws();
        if (i >= n) err(n);
        var c = s.charAt(i);
        if (c === ",") { i++; continue; }
        if (c === "]") { i++; return; }
        err(i);
      }
    }

    try {
      value();
      ws();
      return i < n ? { ok: false, at: i } : { ok: true };
    } catch (e) {
      if (e instanceof ScanError) return { ok: false, at: e.at };
      throw e;
    }
  }

  /* An offset can still be read out of the engine message on the shapes that
     carry one. It is only a fallback for the case where JSON.parse rejects text
     the scanner accepts, which would mean the two disagree about the grammar. */
  var OFFSET = [
    /at position (\d+)/,
    /at line \d+ column \d+ \(char (\d+)\)/
  ];

  function offsetOf(message) {
    for (var i = 0; i < OFFSET.length; i++) {
      var m = OFFSET[i].exec(message);
      if (m) return +m[1];
    }
    return -1;
  }

  // Column and line are 1 based, because that is how every editor the user
  // might jump to counts them.
  function locate(text, offset) {
    if (offset < 0 || offset > text.length) return null;
    var before = text.slice(0, offset);
    var lines = text.split("\n");
    var line = before.split("\n").length;
    return {
      line: line,
      column: offset - before.lastIndexOf("\n"),
      offset: offset,
      text: lines[line - 1] || ""
    };
  }

  /* Returns { ok: true, value } or { ok: false, message, at }.
     `at` is null when the offset could not be recovered. */
  function check(text) {
    var src = String(text == null ? "" : text);
    if (!src.trim()) return { ok: false, message: "Nothing to parse yet.", at: null };
    try {
      return { ok: true, value: JSON.parse(src) };
    } catch (e) {
      var msg = e && e.message ? e.message : "Invalid JSON";
      var found = scan(src);
      var at = found.ok ? offsetOf(msg) : found.at;
      return { ok: false, message: msg, at: locate(src, at) };
    }
  }

  function format(text, indent) {
    var res = check(text);
    if (!res.ok) return res;
    return { ok: true, out: JSON.stringify(res.value, null, indent === undefined ? 2 : indent) };
  }

  function minify(text) {
    var res = check(text);
    if (!res.ok) return res;
    return { ok: true, out: JSON.stringify(res.value) };
  }

  /* Sorts object keys at every depth. Arrays keep their order, because array
     order is data and reordering it would change the document's meaning. */
  function sortKeys(value) {
    if (Array.isArray(value)) return value.map(sortKeys);
    if (value && typeof value === "object") {
      var out = {};
      Object.keys(value).sort().forEach(function (k) { out[k] = sortKeys(value[k]); });
      return out;
    }
    return value;
  }

  function sorted(text, indent) {
    var res = check(text);
    if (!res.ok) return res;
    return {
      ok: true,
      out: JSON.stringify(sortKeys(res.value), null, indent === undefined ? 2 : indent)
    };
  }

  // Counts every node in the document, which is the one summary that tells a
  // user whether they pasted what they thought they pasted.
  function stats(value) {
    var objects = 0, arrays = 0, keys = 0, values = 0, depth = 0;
    (function walk(v, d) {
      if (d > depth) depth = d;
      if (Array.isArray(v)) {
        arrays++;
        v.forEach(function (x) { walk(x, d + 1); });
      } else if (v && typeof v === "object") {
        objects++;
        var k = Object.keys(v);
        keys += k.length;
        k.forEach(function (key) { walk(v[key], d + 1); });
      } else {
        values++;
      }
    })(value, 1);
    return { objects: objects, arrays: arrays, keys: keys, values: values, depth: depth };
  }

  window.jsonFormatter = {
    check: check,
    format: format,
    minify: minify,
    sorted: sorted,
    stats: stats
  };
})();
