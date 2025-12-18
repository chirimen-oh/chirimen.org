"use strict";

// sidebar にロゴ画像とトップページへのリンクを追加
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#sidebar .sidebar-scrollbox")
    ?.insertAdjacentHTML(
      "afterbegin",
      `<a href="/"><img alt="CHIRIMEN" src="logo.png" height="60"></a>`,
    );
});
