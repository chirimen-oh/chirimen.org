# 2.2 ステップ1（[ターミナル接続](https://chirimen.org/PiZeroWebSerialConsole/PiZeroWebSerialConsole.html)）
1. [CHIRIMEN Lite 最新リリース版](https://github.com/kou029w/chirimen-os/releases/)を書き込んだ microSDカードを Raspberry Pi Zero に差し込みます。
2. PC の USB ポートと Raspberry Pi Zero の USB OTG ポートを、USB ケーブルで接続します
   * PiZero 側は接続するポートに注意してください。下図の矢印の位置に接続します
  ![pi zero otg port](./imgs/PiZeroW_OTG.jpg)
   * PC からの USB 給電により、Raspberry Pi Zero が起動します。
3. PC で Raspberry Pi Zero が認識されたことを確認します ([デバイスマネージャーの開き方](https://www.youtube.com/watch?v=lCsywP4tMhE) [🔗](https://support.microsoft.com/ja-jp/windows/%E3%83%87%E3%83%90%E3%82%A4%E3%82%B9-%E3%83%9E%E3%83%8D%E3%83%BC%E3%82%B8%E3%83%A3%E3%83%BC%E3%82%92%E9%96%8B%E3%81%8F-a7f2db46-faaf-24f0-8b7b-9e4a6032fc8c)の例) 
   * 給電後、USB デバイスとして認識されるまで数十秒程度かかります
   * Windows の場合、ポートの番号（COMn の n の部分）は環境ごとに異なります
  ![OTG PORT Information on device manager](imgs/OTG_PORT_W10.png)
   * [**こちらのWeb Serial RPiZero TerminalページにPCのブラウザでアクセス**](https://chirimen.org/PiZeroWebSerialConsole/PiZeroWebSerialConsole.html)
 (以降、このウィンドを**ターミナルウィンド**と呼びます)
4. ターミナルウィンドの ```[Connect and Login PiZero]``` ボタンを押します
   * 接続ダイアログが表示されます
  ![connection dialog](imgs/SerialDialog.png)
   * 上で確認したデバイス（ポート番号）を選択して接続します
5. コンソール（左側の黒い画面の最下部）に、以下のコマンドプロンプトが表示されればステップ１は完了です。引き続きステップ２に進んでください
   * ```pi@raspberrypi:~$```
