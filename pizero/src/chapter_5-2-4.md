# 5.2.4 SHT30 のコードの詳細解説

- I2C 温湿度センサー (SHT30, SHT31)の初期化と使用

```js
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const sht30 = new SHT30(i2cPort, 0x44);
await sht30.init();

while (true) {
  const { humidity, temperature } = await sht30.readData();
  temperatureDisplay.innerHTML = `${temperature.toFixed(2)} ℃`;
  humidityDisplay.innerHTML = `${humidity.toFixed(2)} %`;
  await sleep(500);
}
```

このコードは、温度センサーの値を定期的に取得して画面に表示しているだけのように見えます。しかし `await` があちこちに置かれているのには理由があります。ひとつひとつの呼び出しが、実際には I2C バス越しのやり取りを担っているからです。

##### await requestI2CAccess()

Web I2C API を使うには、まず **`I2CAccess` インターフェースを取得**しなければなりません。`requestI2CAccess()` はその最初の呼び出しで、結果が返るまで時間のかかる非同期処理です。`await` で完了を待ち、得られたインターフェースを `i2cAccess` オブジェクトに保持しています。

##### i2cAccess.ports.get()

`I2CAccess.ports` には、利用可能な I2C ポートの一覧が入っています。

```js
i2cAccess.ports.get(1);
```

通常、CHIRIMEN Pi Zero で利用可能な I2C ポート番号は `1` 番のみです。引数の `get()` メソッドに `1` を渡すことで `i2cPort` オブジェクトは常に `1` 番のI2Cポートを参照します。

##### new SHT30(i2cPort, 0x44)

ドライバーライブラリを使い、**SHT30 を操作するためのインスタンスを生成**しています。第二引数の `0x44` は、SHT30 の I2C スレーブアドレスです。

```js
const sht30 = new SHT30(i2cPort, 0x44);
```

##### await sht30.init()

ドライバーライブラリのインスタンス `sht30` の `init()` メソッドを通じて、**I2C ポートを開いてセンサーを初期化**しています。

```js
await sht30.init();
```

内部では、インスタンス生成時に指定した `port` オブジェクトとスレーブアドレス `0x44` を使って `I2CPort.open()` を呼び出しています。`open()` が成功すると、I2C ポートへの読み書きを担う `I2CSlaveDevice` インターフェースが返ります。この `I2CSlaveDevice` はライブラリ内部に保持され、以降 SHT30 との通信はすべてこれを通して行われます。

##### await sht30.readData()

実際にセンサーの値を読み取る処理です。この読み取り関数は、GPIO の単純入力と同様、呼び出された瞬間の値を一回だけ返します。連続的な変化を知りたい場合は、呼び出す側でポーリングのルーチンを組む必要があります。このコードで `while` ループと `sleep()` を組み合わせているのは、そのためです。**SHT30 の仕様に基づくデータ読み出し**を行う処理です。

```js
const { humidity, temperature } = await sht30.readData();
```

ドライバーライブラリ内部では、SHT30 から得られる温度・湿度それぞれ 16bit の生の数値を、℃ や % といった物理量の値に変換して返却しています。
