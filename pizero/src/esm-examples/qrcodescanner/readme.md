# M5Stack用QRコードスキャナーユニット（STM32F030）

- 動作電圧 :5V
- スキャン範囲　:仰角 ±55°、偏角 ±55°
- 分解能  :≥5ミル
- I2Cアドレス  :0x21

## 配線図

[配線図](./schematic.png "schematic")

## ドライバのインストール

```
npm install node-web-i2c @chirimen/qrcodescanner

```

## ファイル説明
- qr_scanner_inkscape.svg
SVG形式のQRスキャナー画像（Inkscape専用）
対応APP：Inkscape（ver.1.4.2）

- qr_scanner.svg
SVG形式のQRスキャナー画像
対応APP：Inkscape（ver.1.4.2）

- qr-scanner.fzpz 
QRスキャナーパーツ（Fritzingパーツ）
対応APP：Fritzing（ver.0.9.5）

- raspi3_qr-scanner.fzz
回路図ファイル（Fritzing）
対応APP：Fritzing（ver.0.9.5）

## サンプルコード説明

qrcodescannerのアドレスの0x21でインスタンスを作成
```
new qrscanner(i2cPort, 0x21);
```

センサーの初期化
```
await qrscanner.init();
```

QRスキャナーのトリガーモードを設定
引数 0 を指定することで「自動トリガーモード」になる
スキャナーはQRコードを自動で読み取るようになる
```
await qrscanner.setTriggerMode(0);
```

無限ループでQRコードをスキャンし続け、読み取ったデータを出力
読み取りが成功すると、scanData() によりQRコードの中身（文字列など）が取得できる
```
for (;;) {
  let data = await qrscanner.scanData();
  console.dir(data);
}
```



## 参考URL
- 本サンプルコードで使用しているドライバ  
[@chirimen/qrcodescanner](https://www.jsdelivr.com/package/npm/@chirimen/qrcode/qrcodescanner)

- センサの製品ページ  
https://www.switch-science.com/products/9508?srsltid=AfmBOopbrnp08RCuDrqGBE22G5KYgmDxnOLl-98YpX7ZHgPTBRSBspYv

- センサの販売元ページ  
https://shop.m5stack.com/products/qr-code-scanner-unit-stm32f030
