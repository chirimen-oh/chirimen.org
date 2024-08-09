"use strict";

// 正規表現検索を有効化
window.elasticlunr.Index.load = (index) => ({
  search(keyword) {
    const regexp = new RegExp(keyword, "gi");

    return [...Object.entries(index.documentStore.docs)].flatMap(
      ([ref, doc]) => {
        const match = `${doc.title} ${doc.body}`.match(regexp);

        return match ? [{ ref, doc, score: match.length }] : [];
      },
    );
  },
});
