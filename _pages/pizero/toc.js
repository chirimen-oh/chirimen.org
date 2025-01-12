// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="index.html"><strong aria-hidden="true">1.</strong> チュートリアル概要</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_1-1.html"><strong aria-hidden="true">1.1.</strong> CHIRIMEN について</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_1-1-1.html"><strong aria-hidden="true">1.1.1.</strong> CHIRIMEN コミュニティ</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_1-2.html"><strong aria-hidden="true">1.2.</strong> Raspberry Pi について</a></li><li class="chapter-item expanded "><a href="chapter_1-3.html"><strong aria-hidden="true">1.3.</strong> JavaScript の基礎</a></li><li class="chapter-item expanded "><a href="chapter_1-4.html"><strong aria-hidden="true">1.4.</strong> 良く使う情報へのリンク</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_2.html"><strong aria-hidden="true">2.</strong> 機材準備と Wi-Fi への接続</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_2-1.html"><strong aria-hidden="true">2.1.</strong> ステップ0（機材準備）</a></li><li class="chapter-item expanded "><a href="chapter_2-2.html"><strong aria-hidden="true">2.2.</strong> ステップ1（ターミナル接続）</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_2-2-1.html"><strong aria-hidden="true">2.2.1.</strong> Note. CLI操作について</a></li><li class="chapter-item expanded "><a href="chapter_2-2-2.html"><strong aria-hidden="true">2.2.2.</strong> Note. pi4 の利用方法</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_2-3.html"><strong aria-hidden="true">2.3.</strong> ステップ2（Wi-Fi設定）</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_3.html"><strong aria-hidden="true">3.</strong> Hello Real World（Lチカを実行する）</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_3-1.html"><strong aria-hidden="true">3.1.</strong> 配線</a></li><li class="chapter-item expanded "><a href="chapter_3-2.html"><strong aria-hidden="true">3.2.</strong> プログラムを書く</a></li><li class="chapter-item expanded "><a href="chapter_3-3.html"><strong aria-hidden="true">3.3.</strong> 実行する</a></li><li class="chapter-item expanded "><a href="chapter_3-4.html"><strong aria-hidden="true">3.4.</strong> コードを読む</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_4.html"><strong aria-hidden="true">4.</strong> GPIOを試す</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_4-1.html"><strong aria-hidden="true">4.1.</strong> GPIOを理解する</a></li><li class="chapter-item expanded "><a href="chapter_4-2.html"><strong aria-hidden="true">4.2.</strong> GPIOを出力</a></li><li class="chapter-item expanded "><a href="chapter_4-3.html"><strong aria-hidden="true">4.3.</strong> GPIOを入力（onchange）</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_4-3-1.html"><strong aria-hidden="true">4.3.1.</strong> onchange コードを読む</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_4-4.html"><strong aria-hidden="true">4.4.</strong> GPIOを入力（ポーリング）</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_4-4-1.html"><strong aria-hidden="true">4.4.1.</strong> ポーリングコードを読む</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_4-5.html"><strong aria-hidden="true">4.5.</strong> GPIOセンサーを複数同時に使う</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_4-5-1.html"><strong aria-hidden="true">4.5.1.</strong> Lチカのコードを書き換える</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="chapter_5.html"><strong aria-hidden="true">5.</strong> I2Cデバイスを試す</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_5-1.html"><strong aria-hidden="true">5.1.</strong> I2Cを理解する</a></li><li class="chapter-item expanded "><a href="chapter_5-2.html"><strong aria-hidden="true">5.2.</strong> SHT30編</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_5-2-1.html"><strong aria-hidden="true">5.2.1.</strong> I2Cセンサー(SHT30)の認識を確認する</a></li><li class="chapter-item expanded "><a href="chapter_5-2-2.html"><strong aria-hidden="true">5.2.2.</strong> SHT30 のコード取得と実行</a></li><li class="chapter-item expanded "><a href="chapter_5-2-3.html"><strong aria-hidden="true">5.2.3.</strong> SHT30 のコードを読む</a></li><li class="chapter-item expanded "><a href="chapter_5-2-4.html"><strong aria-hidden="true">5.2.4.</strong> SHT30 のコードの詳細解説</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_5-3.html"><strong aria-hidden="true">5.3.</strong> ADT7410編</a></li><li class="chapter-item expanded "><a href="chapter_5-4.html"><strong aria-hidden="true">5.4.</strong> GPIO と I2Cセンサーを組み合わせる</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_6.html"><strong aria-hidden="true">6.</strong> IoTを試す</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_6-1.html"><strong aria-hidden="true">6.1.</strong> 遠隔LEDコントロール</a></li><li class="chapter-item expanded "><a href="chapter_6-2.html"><strong aria-hidden="true">6.2.</strong> PiZero サンプルコードの実行</a></li><li class="chapter-item expanded "><a href="chapter_6-3.html"><strong aria-hidden="true">6.3.</strong> PC サンプルコードの実行</a></li><li class="chapter-item expanded "><a href="chapter_6-4.html"><strong aria-hidden="true">6.4.</strong> 自分専用チャンネルで制御</a></li><li class="chapter-item expanded "><a href="chapter_6-5.html"><strong aria-hidden="true">6.5.</strong> PiZero 側のコードを読む</a></li><li class="chapter-item expanded "><a href="chapter_6-6.html"><strong aria-hidden="true">6.6.</strong> PC 側のコードを読む</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_7.html"><strong aria-hidden="true">7.</strong> 常駐プログラム化する</a></li><li class="chapter-item expanded "><a href="chapter_8.html"><strong aria-hidden="true">8.</strong> 他のいろいろなデバイスを試してみる</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_8-1.html"><strong aria-hidden="true">8.1.</strong> 応用センサーキットの使い方</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_8-1-1.html"><strong aria-hidden="true">8.1.1.</strong> 単体で動作確認できるセンサー</a></li><li class="chapter-item expanded "><a href="chapter_8-1-2.html"><strong aria-hidden="true">8.1.2.</strong> 人感センサー</a></li><li class="chapter-item expanded "><a href="chapter_8-1-3.html"><strong aria-hidden="true">8.1.3.</strong> Neopixel LED</a></li><li class="chapter-item expanded "><a href="chapter_8-1-4.html"><strong aria-hidden="true">8.1.4.</strong> アナログセンサー</a></li><li class="chapter-item expanded "><a href="chapter_8-1-5.html"><strong aria-hidden="true">8.1.5.</strong> サーボモーター</a></li><li class="chapter-item expanded "><a href="chapter_8-1-6.html"><strong aria-hidden="true">8.1.6.</strong> DCモーター（MX1508利用）</a></li><li class="chapter-item expanded "><a href="chapter_8-1-7.html"><strong aria-hidden="true">8.1.7.</strong> DCモーター（PWM駆動）</a></li><li class="chapter-item expanded "><a href="chapter_8-1-8.html"><strong aria-hidden="true">8.1.8.</strong> RaspberryPi のカメラの注意点</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="chapter_9.html"><strong aria-hidden="true">9.</strong> 付録(予備知識)</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_9-1.html"><strong aria-hidden="true">9.1.</strong> CHIRIMEN ブラウザー版との差異</a></li><li class="chapter-item expanded "><a href="chapter_9-2.html"><strong aria-hidden="true">9.2.</strong> CHIRIMEN環境の任意のディレクトリへのセットアップ</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_10.html"><strong aria-hidden="true">10.</strong> 共通資料集</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_10-1.html"><strong aria-hidden="true">10.1.</strong> CHIRIMEN</a></li><li class="chapter-item expanded "><a href="chapter_10-2.html"><strong aria-hidden="true">10.2.</strong> ハードウェア・デバイス</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_10-2-1.html"><strong aria-hidden="true">10.2.1.</strong> LED</a></li><li class="chapter-item expanded "><a href="chapter_10-2-2.html"><strong aria-hidden="true">10.2.2.</strong> ブレッドボード</a></li><li class="chapter-item expanded "><a href="chapter_10-2-3.html"><strong aria-hidden="true">10.2.3.</strong> 抵抗値の読み方</a></li><li class="chapter-item expanded "><a href="chapter_10-2-4.html"><strong aria-hidden="true">10.2.4.</strong> MOSFETによる大電力制御</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_10-3.html"><strong aria-hidden="true">10.3.</strong> JavaScript</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_10-3-1.html"><strong aria-hidden="true">10.3.1.</strong> JavaScriptコード・ライブラリの読み込み</a></li><li class="chapter-item expanded "><a href="chapter_10-3-2.html"><strong aria-hidden="true">10.3.2.</strong> 非同期処理</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_10-4.html"><strong aria-hidden="true">10.4.</strong> GPIO</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_10-4-1.html"><strong aria-hidden="true">10.4.1.</strong> GPIOポートの初期化と出力処理</a></li><li class="chapter-item expanded "><a href="chapter_10-4-2.html"><strong aria-hidden="true">10.4.2.</strong> GPIOPortの入力処理（onchange）</a></li><li class="chapter-item expanded "><a href="chapter_10-4-3.html"><strong aria-hidden="true">10.4.3.</strong> GPIOPortの入力処理（ポーリング）</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_10-5.html"><strong aria-hidden="true">10.5.</strong> I2C</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_10-5-1.html"><strong aria-hidden="true">10.5.1.</strong> 各種ボードの I2C端子について</a></li><li class="chapter-item expanded "><a href="chapter_10-5-2.html"><strong aria-hidden="true">10.5.2.</strong> I2Cの詳細情報とポイント</a></li><li class="chapter-item expanded "><a href="chapter_10-5-3.html"><strong aria-hidden="true">10.5.3.</strong> WebI2C とデバイスドライバ</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_10-6.html"><strong aria-hidden="true">10.6.</strong> IoT</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="chapter_10-6-1.html"><strong aria-hidden="true">10.6.1.</strong> webSocketとpub/sub services</a></li><li class="chapter-item expanded "><a href="chapter_10-6-2.html"><strong aria-hidden="true">10.6.2.</strong> relayService</a></li><li class="chapter-item expanded "><a href="chapter_10-6-3.html"><strong aria-hidden="true">10.6.3.</strong> リアルタイム性</a></li><li class="chapter-item expanded "><a href="chapter_10-6-4.html"><strong aria-hidden="true">10.6.4.</strong> relayServer.js</a></li><li class="chapter-item expanded "><a href="chapter_10-6-5.html"><strong aria-hidden="true">10.6.5.</strong> プログラムの流れ</a></li><li class="chapter-item expanded "><a href="chapter_10-6-6.html"><strong aria-hidden="true">10.6.6.</strong> セキュリティ</a></li><li class="chapter-item expanded "><a href="chapter_10-6-7.html"><strong aria-hidden="true">10.6.7.</strong> Node.jsでの利用</a></li><li class="chapter-item expanded "><a href="chapter_10-6-8.html"><strong aria-hidden="true">10.6.8.</strong> Webhooks</a></li><li class="chapter-item expanded "><a href="chapter_10-6-9.html"><strong aria-hidden="true">10.6.9.</strong> IoTクラウドサービス</a></li></ol></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);