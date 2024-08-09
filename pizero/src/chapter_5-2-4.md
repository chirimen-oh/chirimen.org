# 5.2.4 SHT30 のコードの詳細解説
* I2C 温湿度センサー (SHT30, SHT31)の初期化と使用
```js
async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const sht30 = new SHT30(port, 0x44);
  await sht30.init();

  while (true) {
    const { humidity, temperature } = await sht30.readData();
    temperatureDisplay.innerHTML = `${temperature.toFixed(2)} ℃`;
    humidityDisplay.innerHTML = `${humidity.toFixed(2)} %`;
    await sleep(500);
  }
}
```
温度センサーの情報を定期的に取得し、画面に出力する処理が行われています。</br>
少し詳し解説してみます。

##### await requestI2CAccess()

Web I2C API を利用するための **`I2CAccess` インタフェースを取得** するための最初の API 呼び出しです。この関数も非同期処理ですので `await` で処理完了を待機し、その結果正しくインタフェースが取得されたら `i2cAccess` オブジェクトに保持します。

##### i2cAccess.ports.get()

`I2CAccess.ports` は、利用可能な I2C ポートの一覧です。
```js
const port = i2cAccess.ports.get(1);
```
CHIRIMEN PiZero で利用可能な I2C ポート番号は`1`番だけです。ポート番号に`1` を指定して **`port` オブジェクトを取得** しています。

##### new SHT30(port, 0x44)

ドライバーライブラリを使い **SHT30 を操作する為のインスタンスを生成** しています。
```js
const sht30 = new SHT30(port, 0x44);
```

##### await sht30.init()

ドライバーライブラリのインスタンス (`sht30`) の `init()` メソッドを通じて **I2C ポートを開いてセンサーを初期化** しています。
```js
await sht30.init();
```
具体的に内部では、インスタンス生成時に指定した `port` オブジェクトと `slaveAddress(0x44)` を用いて `I2CPort.open()` を行なっています。`I2CPort.open()` が成功すると、`I2CSlaveDevice` という I2C ポートへデータ書き込みや読み込みなどを行うインタフェースが返されます。`I2CSlaveDevice` インタフェースは、ライブラリ内に保存され、その後の処理でこのインターフェイスを使って I2C デバイス SHT30 との通信が可能になります。

##### await sht30.readData()
実際にデータを読み取っています。 この読み取り関数はGPIOで紹介した、一回きりの単純入力に相当するものです。そのため連続的な変化を知りたい場合はポーリングルーチンを組む必要があります。
**SHT30 の仕様に基づくデータ読み出し処理です**。
```js
const { humidity, temperature } = await sht30.readData();
```
ドライバーライブラリ内部では、SHT30 から得られる温度と湿度それぞれ 16bit の数値を、温度・湿度の物理量の数値に変換して返却しています。