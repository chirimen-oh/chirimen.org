// ドメンに応じた CSS が適用できるようドメイン名の . を - に置き換えたものを html 要素のクラス名に追加
const htmlElement = document.getElementsByTagName("html")[0];
htmlElement.classList.add(location.host.replace(/\./g, "-"));
