# Tips

CHIRIMEN を使う上で知っておくと良い Tips 集のページです。良くある質問については [FAQ ページ](faq.md) に記載しているのでそちらと合わせてご覧ください。

## かんたん

CHIRIMEN for Raspberru Piにすでにサンプルのあるセンサー/スイッチ

- 温度センサー (温度を測定)
- 加速度センサー (振動や傾きを測定)
- 色センサー (色を測定)
- 明るさセンサー (明るさを測定)
- 紫外線センサー (UVを測定)
- タッチセンサー (人が触れたことを測定)
- 測距センサー (距離を測定)
- スイッチ全般 (GPIO)
- 人感センサー (GPIO) ※焦電型赤外線人感センサーで3V出力のものに対応。5V出力を繋がないよう注意

CHIRIMENの中には入ってないけど、サンプル記事があり簡単なもの

- 圧力センサー http://makaizou.blogspot.jp/2017/11/chrimen-rpi3-grove.html

getUserMedia()で使える

- カメラ : Raspberry Pi 専用カメラ
- マイク : USBマイク

※jsBinなど、ブラウザFeature Policyの影響を受ける環境では使えない可能性があるので注意。

複数のデバイス間で通信したい。

- WebSocketを使えば簡単。[サンプル](https://jsbin.com/lelajoxipu/1/edit?html,js,output)
- 大きなデータ（カメラストリームとか）は、WebRTCなどを検討しよう。→ [Skyway](https://webrtc.ecl.ntt.com/)などのサービスを利用するのが手軽でおススメ。WebRTCおもしろいけど闇が深い領域なのでハッカソンで１から、とかは難しい。

## あまり難しくない

ADCのサンプル（~/Desktop/gc/i2c-ADS1015/）が使える

- ボリューム (ポテンショメータ：可変抵抗) ※ ADC経由
- CdS (明るさをたくさん取りたい時など) ※ ADC経由
- 湿度センサー ※ ADC経由
- 曲げセンサー ※ ADC経由
- 振動センサー(ピエゾ)  ※ ADC経由

~~MIDIのサンプル（https://jsbin.com/cexocexoku/edit?html,js,output）が使える~~

- USB-MIDI機器 (USB経由) 

※ダウンロードしたら使えます。残念ながら、2018年12月現在は Feature Policyが有効なブラウザ環境ではjsBinサンプルは動作しません。

GPIOが使える

- GPIO経由でモーターを（正転・反転）動かしたい [TP7291](http://akizukidenshi.com/catalog/g/gI-02001/) などをGPIOと外部電源で使えます。

その他

- I2C経由でモーターを（正転・反転）動かしたい [中村さんの記事](http://makaizou.blogspot.jp/2017/11/chirimen-rpi3_14.html)


## 意外にめんどくさいかも

CHIRIMEN for Raspberry Pi 3にサンプルがない。
ただし、I2C接続、3.3Vのものを選べば使える可能性がある

- ガスセンサー  ※I2C接続
- タッチセンサー（マトリクス） ※I2C接続

## そのままでは使えないもの

- SPI/UART接続のセンサー全般 (間にArduinoを経由させるなどして、I2Cへ変換する必要がある)

## Tips

- モーターを単純に回したり止めたりしたい。→ MOSFETのチュートリアルを使えばGPIOでできる
- ソレノイドを動かしたい → 同上
- PWMを流したい → Raspberry Piでは動かないので、Arduinoを経由するなどする。
  参考 https://qiita.com/tadfmac/items/a4cdbf915698573ab36d
