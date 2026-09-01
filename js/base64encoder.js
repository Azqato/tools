/* Base64 encoder and decoder. Pure client-side, no DOM access.

   `btoa` and `atob` operate on binary strings, not text: `btoa("é")` throws,
   because the character is outside Latin-1. Everything here therefore goes
   through TextEncoder and TextDecoder so that any Unicode input, emoji and CJK
   included, round trips exactly. That is the whole reason this module exists
   rather than the page calling btoa directly. */
(function () {
  function bytesToBinary(bytes) {
    // Chunked because String.fromCharCode.apply blows the argument limit
    // somewhere around 100k on most engines, and a pasted file can exceed it.
    var CHUNK = 0x8000;
    var out = "";
    for (var i = 0; i < bytes.length; i += CHUNK) {
      out += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
    }
    return out;
  }

  function encode(text, urlSafe) {
    var bytes = new TextEncoder().encode(String(text == null ? "" : text));
    var b64 = btoa(bytesToBinary(bytes));
    if (urlSafe) {
      // RFC 4648 section 5. Padding is dropped because it is redundant and is
      // what most URL-safe consumers expect.
      b64 = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    return b64;
  }

  /* Returns { ok, text } or { ok: false, error }. Never throws, because the
     input is whatever the user pasted and a thrown error would take the page
     down with it. */
  function decode(b64) {
    var src = String(b64 == null ? "" : b64).replace(/\s+/g, "");
    if (!src) return { ok: true, text: "" };

    // Accept the URL-safe alphabet on input regardless of how it was produced,
    // and restore the padding that variant drops.
    src = src.replace(/-/g, "+").replace(/_/g, "/");
    while (src.length % 4 !== 0) src += "=";

    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(src)) {
      return { ok: false, error: "That is not valid Base64. Check for stray characters." };
    }

    var binary;
    try {
      binary = atob(src);
    } catch (e) {
      return { ok: false, error: "That is not valid Base64. The length is wrong." };
    }

    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    try {
      // fatal:true so that bytes which are not valid UTF-8 are reported rather
      // than silently replaced with U+FFFD, which would look like a successful
      // decode of corrupt text.
      return { ok: true, text: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
    } catch (e) {
      return {
        ok: false,
        error: "Decoded, but the result is not text. It may be an image or a file."
      };
    }
  }

  window.base64Encoder = { encode: encode, decode: decode };
})();
