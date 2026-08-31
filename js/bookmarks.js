/* Bookmark Manager - Netscape bookmark format parser and serializer.
   Pure client-side. Parsing uses DOMParser, which is a browser API rather than
   a dependency, but this module never touches the live document.

   The Netscape format is the file every browser exports: Chrome, Firefox,
   Safari and Edge all read and write it. It is also barely valid HTML. <DT> is
   never closed, <p> is used as an opening tag with no closing tag, and a
   folder's <DL> may be nested inside the <DT> that names it or may follow as a
   sibling, depending on which browser wrote the file. Handing it to DOMParser
   and walking the result is far more robust than a hand-written tokeniser,
   because the browser's own error recovery is what defines the shape in
   practice. */
(function () {
  var SAFE = /^(https?:|ftp:|mailto:|chrome:|edge:|about:|file:|data:image\/)/i;

  function childByTag(el, tag) {
    var c = el.children;
    for (var i = 0; i < c.length; i++) {
      if (c[i].tagName === tag) return c[i];
    }
    return null;
  }

  var seq = 0;
  function nextId() {
    seq++;
    return "b" + Date.now().toString(36) + seq.toString(36);
  }

  /* A URL is kept only if its protocol is on the whitelist. Anything else,
     `javascript:` above all, becomes inert: the entry is preserved so an import
     round trip does not silently drop the user's data, but `isSafe` is false so
     the interface renders it as text rather than as a clickable link. */
  function isSafe(url) {
    return SAFE.test(String(url || "").trim());
  }

  function parseDL(dl) {
    var items = [];
    var kids = dl.children;
    var pending = null;   // folder whose <DL> is a following sibling

    for (var i = 0; i < kids.length; i++) {
      var el = kids[i];

      if (el.tagName === "DT") {
        var a = childByTag(el, "A");
        if (a) {
          items.push({
            id: nextId(),
            type: "link",
            name: (a.textContent || "").trim(),
            url: (a.getAttribute("href") || "").trim()
          });
          pending = null;
          continue;
        }

        var h3 = childByTag(el, "H3");
        if (h3) {
          var folder = {
            id: nextId(),
            type: "folder",
            name: (h3.textContent || "").trim() || "Untitled folder",
            children: []
          };
          items.push(folder);
          var inner = childByTag(el, "DL");
          if (inner) {
            folder.children = parseDL(inner);
            pending = null;
          } else {
            pending = folder;
          }
        }
      } else if (el.tagName === "DL") {
        if (pending) {
          pending.children = parseDL(el);
          pending = null;
        } else {
          // A stray DL with no folder heading. Its contents belong here rather
          // than being dropped on the floor.
          items = items.concat(parseDL(el));
        }
      }
    }
    return items;
  }

  function parse(html) {
    var doc = new DOMParser().parseFromString(String(html || ""), "text/html");
    var dl = doc.querySelector("dl");
    if (!dl) return [];
    return parseDL(dl);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function serializeItems(items, depth) {
    var pad = new Array(depth * 4 + 1).join(" ");
    var out = "";
    (items || []).forEach(function (it) {
      if (it.type === "folder") {
        out += pad + "<DT><H3>" + esc(it.name) + "</H3>\n";
        out += pad + "<DL><p>\n";
        out += serializeItems(it.children, depth + 1);
        out += pad + "</DL><p>\n";
      } else {
        out += pad + '<DT><A HREF="' + esc(it.url) + '">' + esc(it.name) + "</A>\n";
      }
    });
    return out;
  }

  /* Written to match what Chrome itself produces, including the DOCTYPE line
     and the "DO NOT EDIT" comment, because some importers key off them. */
  function serialize(items) {
    return "<!DOCTYPE NETSCAPE-Bookmark-file-1>\n" +
      "<!-- This is an automatically generated file.\n" +
      "     It will be read and overwritten.\n" +
      "     DO NOT EDIT! -->\n" +
      '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n' +
      "<TITLE>Bookmarks</TITLE>\n" +
      "<H1>Bookmarks</H1>\n" +
      "<DL><p>\n" +
      serializeItems(items, 1) +
      "</DL><p>\n";
  }

  function count(items) {
    var links = 0;
    var folders = 0;
    (function walk(list) {
      (list || []).forEach(function (it) {
        if (it.type === "folder") { folders++; walk(it.children); }
        else links++;
      });
    })(items);
    return { links: links, folders: folders };
  }

  // Depth-first walk yielding every link, with the folder path that reached it.
  function flatten(items, path, out) {
    out = out || [];
    path = path || [];
    (items || []).forEach(function (it) {
      if (it.type === "folder") {
        flatten(it.children, path.concat(it.name), out);
      } else {
        out.push({ id: it.id, name: it.name, url: it.url, path: path.join(" / ") });
      }
    });
    return out;
  }

  function findParent(items, id, parent) {
    var found = null;
    (items || []).some(function (it) {
      if (it.id === id) { found = { list: items, item: it, parent: parent || null }; return true; }
      if (it.type === "folder") {
        found = findParent(it.children, id, it);
        if (found) return true;
      }
      return false;
    });
    return found;
  }

  function remove(items, id) {
    var hit = findParent(items, id);
    if (!hit) return false;
    hit.list.splice(hit.list.indexOf(hit.item), 1);
    return true;
  }

  /* Merge adds everything from `incoming` that is not already present, matching
     on URL within the same folder path rather than globally: the same link
     filed in two folders is two different bookmarks to a user, and collapsing
     them would silently reorganise their collection. Folders merge by name. */
  function merge(existing, incoming) {
    function mergeInto(target, source) {
      (source || []).forEach(function (it) {
        if (it.type === "folder") {
          var match = null;
          target.some(function (t) {
            if (t.type === "folder" && t.name === it.name) { match = t; return true; }
            return false;
          });
          if (match) {
            mergeInto(match.children, it.children);
          } else {
            target.push(it);
          }
        } else {
          var dupe = target.some(function (t) {
            return t.type === "link" && t.url === it.url;
          });
          if (!dupe) target.push(it);
        }
      });
    }
    mergeInto(existing, incoming);
    return existing;
  }

  window.bookmarks = {
    parse: parse,
    serialize: serialize,
    count: count,
    flatten: flatten,
    remove: remove,
    merge: merge,
    isSafe: isSafe,
    nextId: nextId
  };
})();
