"use strict";

// favicon を書き換え
for (const icon of document.head.querySelectorAll(`link[rel*="icon"]`)) {
  icon.href = "/favicon.ico";
}
