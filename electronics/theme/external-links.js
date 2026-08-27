"use strict";

// 外部リンクを新しいブラウザーコンテキストで開く
window.addEventListener("DOMContentLoaded", () => {
  const selector = ["http:", "https:"]
    .map((scheme) => `a[href^="${scheme}"]`)
    .join(",");

  document.querySelectorAll(selector).forEach((a) => {
    a.target = "_blank";
    a.rel = "noreferrer";
  });
});
