# 4.4 GPIOを入力（ポーリング）
GPIOの入力には、イベントを使う方法の他に、**ポーリング**という手法も広く使われます。次章で扱うI2Cデバイスからの入力では、もっぱらポーリングを使用します。

1. ターミナルウィンドの```[CHIRIMEN Panel]```ボタンを押す
2. 出現したCHIRIMEN Panelの```[Get Examples]```ボタンを押す
3. ID : [**gpio-polling**](https://chirimen.org/pizero/esm-examples/#GPIO_gpio-polling) を探します
4. 回路は前章と同じなのでそのままにしておきます。
5. ```[JS GET]```ボタンを押すと、開発ディレクトリ(```~/myApp```)に、サンプルコードが保存されます。
   * **main-gpio-polling.js**というファイル名で保存されます。
   * ターミナルウィンドの右側のファイルマネージャでmain-gpio-polling.js⇒編集を選び、ソースコードを見てみましょう。

6. 実行する
   * プロンプトが```pi@raspberrypi:~/myApp$```となっていることを確認
   * コンソールに、```node main-gpio-polling.js``` [ENTER] と入力して実行。
   * 0.3秒おきにポート5の値がコンソールに表示されていきます。
   * タクトスイッチを押してみます。
   * タクトスイッチが押されると、**0**に変化します。
7. 終了は CTRL+c
