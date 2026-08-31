/* Character Counter - text statistics. Pure client-side, no DOM access.
   Every count is derived from the string alone, so the same input always
   produces the same numbers regardless of where it came from. */
(function () {
  // Average adult silent reading rate for prose, in words per minute.
  // 238 is the pooled mean from Brysbaert's 2019 meta-analysis.
  var READ_WPM = 238;
  // Average spoken pace for a prepared talk, in words per minute.
  var SPEAK_WPM = 130;

  // Sentence terminators, including the single-character ellipsis.
  var TERMINATOR = /[.!?…]+(?=\s|$)/g;

  function seconds(words, wpm) {
    if (words === 0) return 0;
    return Math.round(words / wpm * 60);
  }

  // Returns a full statistics object. Never throws; a non-string is coerced.
  window.countText = function (src) {
    var s = src == null ? "" : String(src);
    var trimmed = s.trim();

    var words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;

    var sentences = (s.match(TERMINATOR) || []).length;
    // Text with content but no terminator is still one sentence.
    if (sentences === 0 && trimmed !== "") sentences = 1;

    var paragraphs = 0;
    s.split(/\n\s*\n/).forEach(function (p) {
      if (p.trim() !== "") paragraphs++;
    });

    return {
      // UTF-16 code units. This is what maxlength and most platform limits
      // count, so it is the number the limit bars are measured against.
      characters: s.length,
      charactersNoSpaces: s.replace(/\s/g, "").length,
      // Code points. Differs from `characters` only when the text contains
      // astral characters (most emoji, some CJK extensions), which occupy
      // two code units each.
      codePoints: Array.from ? Array.from(s).length : s.length,
      words: words,
      sentences: sentences,
      paragraphs: paragraphs,
      lines: s === "" ? 0 : s.split(/\r\n|\r|\n/).length,
      readingSeconds: seconds(words, READ_WPM),
      speakingSeconds: seconds(words, SPEAK_WPM)
    };
  };

  // Formats a whole number of seconds as a short human duration.
  window.formatDuration = function (total) {
    if (!total) return "0 sec";
    if (total < 60) return total + " sec";
    var min = Math.floor(total / 60);
    var rem = total % 60;
    return rem === 0 ? min + " min" : min + " min " + rem + " sec";
  };
})();
