# 4.3 GPIOを入力（onchange）
GPIO端子の**入力が変化したら関数を実行**という機能によってGPIOの入力を使います。

1. ターミナルウィンドの```[CHIRIMEN Panel]```ボタンを押す
2. 出現したCHIRIMEN Panelの```[Get Examples]```ボタンを押す
3. ID : [**gpio-onchange**](https://tutorial.chirimen.org/pizero/esm-examples/#GPIO_gpio-onchange) を探します
4. 回路図リンクを押すと回路図が出てきますので、回路を組みます。
5. ```[JS GET]```ボタンを押すと、開発ディレクトリ(```~/myApp```)に、サンプルコードが保存されます。
   * **main-gpio-onchange.js**というファイル名で保存されます。
   * ターミナルウィンドの右側のファイルマネージャでmain-gpio-onchange.js⇒編集 を選びます。
6. 実行する
   * ターミナルウィンドのコンソールのプロンプトが```pi@raspberrypi:~/myApp$```となっていることを確認
   * ターミナルウィンドのコンソールに、```node main-gpio-onchange.js``` [ENTER] と入力して実行。
   * タクトスイッチを押してみます。
   * タクトスイッチが押されるたびにコンソール画面に**0**(押された状態)、**1**(離した状態)が交互に表示されます。
     * Note: GPIOポート5は、Pull-Up(開放状態でHighレベル)です。そのため離した状態で１が出力されます。スイッチを押すとポートがGNDと接続され、Lowレベルになり、0が出力されます。
7. 終了は CTRL+c
