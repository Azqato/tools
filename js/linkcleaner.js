/* Link Cleaner — strips known tracking parameters from URLs. Pure client-side. */
(function () {
  // Exact param names to always remove
  var EXACT = new Set([
    "fbclid", "gclid", "gclsrc", "dclid", "wbraid", "gbraid", "msclkid",
    "yclid", "twclid", "igshid", "igsh", "mc_eid", "mc_cid", "_hsenc",
    "_hsmi", "vero_id", "vero_conv", "oly_anon_id", "oly_enc_id", "rb_clickid",
    "s_cid", "ml_subscriber", "ml_subscriber_hash", "spm", "scm",
    "ref_src", "ref_url", "fb_action_ids", "fb_action_types", "fb_ref",
    "fb_source", "action_object_map", "action_type_map", "action_ref_map",
    "gs_l", "amp", "_ga", "_gl", " trk", "trk", "trkCampaign", "sc_channel",
    "sc_campaign", "sc_geo", "sc_country", "sc_outcome", "ttclid", "li_fat_id"
  ]);

  // Prefix patterns to remove (param starting with any of these)
  var PREFIXES = ["utm_", "pk_", "mtm_", "matomo_", "hsa_", "vgo_", "oly_",
    "_branch_", "__hs", "ck_", "mkt_tok"];

  function shouldRemove(key) {
    var k = key.toLowerCase();
    if (EXACT.has(k)) return true;
    for (var i = 0; i < PREFIXES.length; i++) {
      if (k.indexOf(PREFIXES[i]) === 0) return true;
    }
    return false;
  }

  // Returns { clean, removed:[{key,value}], kept:[key], valid:bool }
  window.cleanUrl = function (raw) {
    var str = raw.trim();
    if (!str) return { valid: false };
    if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(str)) str = "https://" + str;

    var url;
    try { url = new URL(str); } catch (e) { return { valid: false, input: raw }; }

    var removed = [], kept = [];
    var keys = [];
    url.searchParams.forEach(function (_, key) { keys.push(key); });
    // de-dupe key list while preserving order
    keys = keys.filter(function (k, i) { return keys.indexOf(k) === i; });

    keys.forEach(function (key) {
      if (shouldRemove(key)) {
        url.searchParams.getAll(key).forEach(function (v) {
          removed.push({ key: key, value: v });
        });
        url.searchParams.delete(key);
      } else {
        kept.push(key);
      }
    });

    // also strip a trailing "?" if no params remain
    var clean = url.toString();
    clean = clean.replace(/\?$/, "");

    return { valid: true, clean: clean, removed: removed, kept: kept };
  };
})();
