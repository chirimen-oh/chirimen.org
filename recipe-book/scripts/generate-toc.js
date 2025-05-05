/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
const { marked } = require("marked");
const fs = require("fs");
const config = require("../vivliostyle.config");

const entry = config.entry.filter(
  (e) => typeof e === "string"
);
const tocFromEntry = entry
  .filter((content) => content !== './docs/thanks.md')
  .map((content) => {
    console.log('****', content);
    const s = fs.readFileSync(content, { encoding: "utf8" });
    const tokens = marked.lexer(s);
    const headings = tokens.filter(
      (t) => t.type === "heading"
    );
    console.log('*******', headings);
    const listItem = headings.reduce((prev, crr) => {
      if (crr.depth > 3) return prev;
      return (prev += `${"    ".repeat(crr.depth - 1)}1. [${crr.text}](${content
        .replace(".md", ".html")
        .replaceAll(" ", "%20")}${
          `#${crr.text
            .replaceAll(" ", "-")
            .replaceAll(".", "")
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll("（", "")
            .replaceAll("）", "")
            .replaceAll("「", "")
            .replaceAll("」", "")
            .replaceAll("、", "")
            .replaceAll(":", "")
            .replaceAll("：", "")
            .replaceAll("？", "")
            .replaceAll("・", "")
            .replaceAll(",", "")
            .replaceAll("/", "")
            .toLocaleLowerCase()}`
      })\n`);
    }, "");
    return listItem;
  })
  .join("");

const toc = `<nav id="toc" role="doc-toc">\n\n## 目次\n\n${tocFromEntry}\n</nav>`;

fs.writeFileSync("toc.md", toc, { encoding: "utf8" });

console.log("✨ toc.md generated.\n");
console.log(toc);
