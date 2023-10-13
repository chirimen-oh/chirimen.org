
# CHIRIMEN 対応デバイスリスト

市販のセンサーやアクチュエータなどのうち、CHIRIMEN 環境での利用を検証し配線図とサンプルコード一式 (I2C デバイスは CHIRIMEN 用ドライバー含む) を用意しているデバイスの一覧です。

こちらに掲載がないデバイスについても、デジタル GPIO デバイスであればそのまま、アナログ GPIO デバイスであれば ADC を経由で簡単に利用頂けます (I2C デバイスについてはドライバーの用意も必要です)。

Raspberry Pi などの CHIRIMEN の動作環境とそれぞれのチュートリアルは <span class="footnote">1. CHIRIMEN について参照</span> をご覧ください。

## I2C センサー

|カテゴリー|型番|説明|画像 URL|QR|
|:----|:----|:----|:----|:----:|
|ADC(アナログ電圧測定)|ADS1015|アナログ電圧を 12bit 精度のデジタル信号に変換する部品で、アナログセンサ等を利用する際に必要です|![](../../partsImgs/ADS1015.jpg){width=100}|![](../../partsImgs/qr/QR_01_ADS1015.png){width=100}|
|ADC(アナログ電圧測定)|ADS1115|アナログ電圧を 16bit 精度のデジタル信号に変換する部品で、アナログセンサ等を利用する際に必要です|![](../../partsImgs/ADS1115.JPG){width=100}|![](../../partsImgs/qr/QR_02_ADS1115.png){width=100}|
|ADC DAC(アナログ電圧出力) 複合|PCF8591|ADC と DAC が一つになった部品です(デジタル側は 8bit)|![](../../partsImgs/PCF8591.JPG){width=100}|![](../../partsImgs/qr/QR_03_PCF8591.png){width=100}|
|温度センサ|ADT7410|-55℃ から +150℃ まで測定できる温度センサです|![](../../partsImgs/ADT7410.JPG){width=100}|![](../../partsImgs/qr/QR_04_ADT7410.png){width=100}|
|サーモグラフィ|AMG8833|センサから見て上下左右のおよそ 60 度の範囲を 8x8 ピクセルに分割し、それぞれのエリアについて 0℃ ～ 80℃ の範囲で測定可能なサーモグラフィです|![](../../partsImgs/AMG8833.JPG){width=100}|![](../../partsImgs/qr/QR_05_AMG8833.png){width=100}|
|温度 圧力 湿度 複合センサ|BME280|温度、湿度、気圧の測定ができる複合センサです|![](../../partsImgs/BME280.JPG){width=100}|![](../../partsImgs/qr/QR_06_BME280.png){width=100}|
|温度 圧力 複合センサ|BMP180|温度と気圧の測定ができる複合センサです|![](../../partsImgs/BMP180.JPG){width=100}|![](../../partsImgs/qr/QR_07_BMP180.png){width=100}|
|温度 圧力 複合センサ|BMP280|温度と気圧の測定ができる複合センサです(BMP180 の後継品で精度が向上しています)|![](../../partsImgs/BMP280.jpeg){width=100}|![](../../partsImgs/qr/QR_08_BMP280.png){width=100}|
|距離センサ|GP2Y0E03|センサから対象物までの距離を測定できるセンサです( 50cm 程度まで)|![](../../partsImgs/gp2y0e03.JPG){width=100}|![](../../partsImgs/qr/QR_09_GP2Y0E03.png){width=100}|
|距離センサ|VL53L0X|センサから対象物までの距離を測定できるセンサです( 2m 程度まで)|![](../../partsImgs/VL53L0X.JPG){width=100}|![](../../partsImgs/qr/QR_10_VL53L0X.png){width=100}|
|ジェスチャーセンサ|Grove-Gesture (PAJ7620U2)|手を「上、下、左、右、遠ざかる、近づく、時計回り、反時計回り、手を振る」と動かしたときにそれらを検出するセンサです|![](../../partsImgs/Grove-Gesture.JPG){width=100}|![](../../partsImgs/qr/QR_11_Grove-Gesture%20(PAJ7620U2).png){width=100}|
|光センサ|Grove-Light (TSL2561)|0.1lx から 40000lx まで測定可能な照度センサです|![](../../partsImgs/Grove-Light.JPG){width=100}|![](../../partsImgs/qr/QR_12_Grove-Light%20(TSL2561).png){width=100}|
|小型ディスプレイ Grove-OledDisplay (SSD1308)|0.96inch、128x64dot の小型 OLED (有機 EL) ディスプレイです|-|-|![](../../partsImgs/qr/QR_13_Grove-OledDisplay%20(SSD1308).png){width=100}|
|タッチセンサ|Grove-Touch (MPR121)|指などの接触を検出するセンサです| - |![](../../partsImgs/qr/QR_14_Grove-Touch%20(MPR121).png){width=100}|
|カラーセンサ|S11059|RGB 各色と赤外線の強度を測定するセンサです|![](../../partsImgs/S11059.JPG){width=100}|![](../../partsImgs/qr/QR_15_S11059.png){width=100}|
|紫外線(UV)センサ|VEML6070|紫外線の強度を測定できるセンサです|![](../../partsImgs/VEML6070.JPG){width=100}|![](../../partsImgs/qr/QR_16_VEML6070.png){width=100}|
|3 軸加速度センサ|Grove-Accelerometer (ADXL345)|3 軸の加速度を検出できるセンサです|-|![](../../partsImgs/qr/QR_17_Grove-Accelerometer%20(ADXL345).png){width=100}|
|3 軸加速度+ジャイロ 複合センサ|MPU6050|3 軸の加速度に加え、ジャイロの測定も可能な複合センサです|![](../../partsImgs/MPU6050.JPG){width=100}|![](../../partsImgs/qr/QR_18_%20MPU6050.png){width=100}|
|3 軸加速度+ジャイロ+磁気 複合センサ|MPU9250|3 軸の加速度、ジャイロのほか、磁気も測定可能な複合センサです|![](../../partsImgs/MPU9250\_.JPG){width=100}|![](../../partsImgs/qr/QR_19_MPU9250.png){width=100}|
|フルカラー LED アレイ|Neopixel LED コントローラ|多数のフルカラー LED を個々に制御可能なコントローラです(詳細は Examples をご覧ください)|![](../../partsImgs/neopixelI2c.JPG){width=100}|![](../../partsImgs/qr/QR_20_%20Neopixel%20LED%208x8.png){width=100}|
|フルカラー LED アレイ|Neopixel LED 8x8|NEOPIXEL 対応の 8x8 LED パネルです|![](../../partsImgs/neopixel64.JPG){width=100}|![](../../partsImgs/qr/QR_21_HT16K33搭載%208x8LEDモジュール（その１）.png){width=100}|
|フルカラー LED アレイ|Neopixel LED 12x12|円形のパネルです|![](../../partsImgs/neopixel12.JPG){width=100}|-|
|フルカラー LED アレイ|Neopixel LED 60x60|20 個のパネルを 3 つ組み合わせることで 60 個のパネルとなります|![](../../partsImgs/neopixel60.JPG){width=100}|-|
|LED マトリックス|HT16K33 搭載 8x8LED モジュール（その１）|マトリクス LED 制御可能なコントローラが搭載された LED モジュールです(詳細は Examples をご覧ください)。 Adafruit の 8x8LED 搭載品と　 Keyestudio KS0336 8\*8 Matrix Module I2C はピン配置を除き同等品です|![](../../partsImgs/HT16K33.JPG){width=100}|![](../../partsImgs/qr/QR_21_HT16K33搭載%208x8LEDモジュール（その１）.png){width=100}|
|LED マトリックス|HT16K33 搭載 8x8LED モジュール（その２）|上記と同等のコントローラですが、LED の論理配列が異なる aitendo 製 8x8LED モジュールです。ドライバの設定が若干個なります。|![](../../partsImgs/HT16K33_8x8ait.JPG){width=100}|![](../../partsImgs/qr/QR_22_HT16K33搭載%208x8LEDモジュール（その２）.png){width=100}|
|LED マトリックス|HT16K33 搭載 16x8LED モジュール|上記と同等のコントローラが載った、16x8 マトリクス LED のモジュールです。|![](../../partsImgs/HT16K33_16x8.JPG){width=100}|![](../../partsImgs/qr/QR_23_HT16K33搭載%2016x8LEDモジュール.png){width=100}|
|LED マトリックス|HT16K33 搭載 7 セグメント LED モジュール|上記と同等のコントローラが載った、7 セグメント LED のモジュールです。|![](../../partsImgs/HT16K33_7seg.JPG){width=100}|![](../../partsImgs/qr/QR_24_%20HT16K33搭載%207セグメントLEDモジュール.png){width=100}|
|LED マトリックス|HT16K33 搭載 14 セグメント LED モジュール|上記と同等のコントローラが載った、14 セグメント LED のモジュールです。|![](../../partsImgs/HT16K33_14seg.JPG){width=100}|![](../../partsImgs/qr/QR_25_HT16K33搭載%2014セグメントLEDモジュール.png){width=100}|
|サーボモータ・DC モータ コントローラ|PCA9685|サーボモータを PWM 制御できる部品で、サーボモータを利用する際に必要です|![](../../partsImgs/PCA9685.JPG){width=100}|![](../../partsImgs/qr/QR_26_PCA9685.png){width=100}|
|サーボモータ|SG90 Servo|アームを指定した角度をに動かすことのできる部品です|-|![](../../partsImgs/qr/QR_27_SG90%20Servo.png){width=100}|
|サーボモータ・DC モータ コントローラ|PCA9685 PWM|詳細は Examples をご覧ください|![](../../partsImgs/PCA9685.JPG){width=100}|![](../../partsImgs/qr/QR_28_PCA9685%20PWM.png){width=100}|
|温湿度複合センサ|SHT30/31|温度と湿度の両方が測定可能なセンサ|![](../../partsImgs/SHT30.JPG){width=100}|![](../../partsImgs/qr/QR_29_SHT30:31.png){width=100}|
|温湿度複合センサ|AHT10|温度と湿度の両方が測定可能なセンサ|![](../../partsImgs/AHT10.JPG){width=100}|![](../../partsImgs/qr/QR_30_AHT10.png){width=100}|
|温湿度複合センサ|HTU21D|温度と湿度の両方が測定可能なセンサ|![](../../partsImgs/HTU21D.JPG){width=100}|![](../../partsImgs/qr/QR_31_HTU21D.png){width=100}|
|色センサ|TCS34725|I2C 接続の色センサー|![](../../partsImgs/TCS34725.JPG){width=100}|![](../../partsImgs/qr/QR_32_TCS34725.png){width=100}|
|レーザー距離センサ|VL53L1X|VL53L0X より高出力長距離タイプ|![](../../partsImgs/VL53L1X.JPG){width=100}|![](../../partsImgs/qr/QR_33_VL53L1X.png){width=100}|
|電流センサ|INA219|比較的大きな DC 電流を測定するセンサ|![](../../partsImgs/INA219.JPG){width=100}|![](../../partsImgs/qr/QR_34_INA219.png){width=100}|
|非接触温度センサ|MLX90614|赤外線を利用した非接触型温度センサー|![](../../partsImgs/MLX90614.JPG){width=100}|![](../../partsImgs/qr/QR_35_MLX90614.png){width=100}|
|近接・環境光・ジェスチャーセンサー|APDS9960|近接・環境光・ジェスチャーを読み取るセンサー|![](../../partsImgs/APDS9960.JPG){width=100}|![](../../partsImgs/qr/QR_36_APDS9960.png){width=100}|
|多目的インターフェース|seesaw|デジタル・アナログ入力・PWM 出力・NeopixelLED ドライブ等の機能を持つ多目的ボード|![](../../partsImgs/SeeSaw.JPG){width=100}|![](../../partsImgs/qr/QR_37_seesaw.png){width=100}|
|照度センサー|BH1750|照度センサー|![](../../partsImgs/BH1750.JPG){width=100}|![](../../partsImgs/qr/QR_38_BH1750.png){width=100}|
|CO2 センサ|SCD40|CO2 センサ(CO2 濃度が PPM 値で高精度に計測できるセンサーです)|![](../../partsImgs/SCD40.JPG){width=100}|![](../../partsImgs/qr/QR_39_SCD40.png){width=100}|
|CO2+TVOC センサ|CCS811|CO2+TVOC センサ|![](../../partsImgs/CCS811.JPG){width=100}|![](../../partsImgs/qr/QR_40_CCS811.png){width=100}|
|温度 湿度 気圧 ガス 複合センサ|BME680|温度、湿度、気圧さらにガスが測れる複合センサです|![](../../partsImgs/BME680.JPG){width=100}|![](../../partsImgs/qr/QR_41_BME680.png){width=100}|

## GPIO センサー・アクチュエータコントローラー

|カテゴリー|型番|説明|画像 URL|QR|
|:----|:----|:----|:----|:----:|
|LED|赤色 LED|通電すると光る部品です(必ず抵抗を挟んで利用してください)|![](../../partsImgs/LED.JPG){width=100}|![](../../partsImgs/qr/QR_42_赤色LED.png){width=100}|
|LED|黄色 LED|通電すると光る部品です(必ず抵抗を挟んで利用してください)|![](../../partsImgs/LED.JPG){width=100}|![](../../partsImgs/qr/QR_43_黄色LED.png){width=100}|
|LED|黄緑色 LED|通電すると光る部品です(必ず抵抗を挟んで利用してください)|![](../../partsImgs/LED.JPG){width=100}|![](../../partsImgs/qr/QR_44_黄緑色LED.png){width=100}|
|カーボン抵抗|150Ω|必要な場所に電気抵抗を入れる部品です(ここでは通常のものよりサイズが大きく、抵抗値が読みやすい商品を紹介しています)|![](../../partsImgs/register-2.JPG){width=100}|![](../../partsImgs/qr/QR_45_150Ω.png){width=100}|
|カーボン抵抗|10kΩ|必要な場所に電気抵抗を入れる部品です(ここでは通常のものよりサイズが大きく、抵抗値が読みやすい商品を紹介しています)|![](../../partsImgs/register-2.JPG){width=100}|![](../../partsImgs/qr/QR_46_10kΩ.png){width=100}|
|カーボン抵抗|1kΩ|必要な場所に電気抵抗を入れる部品です(ここでは通常のものよりサイズが大きく、抵抗値が読みやすい商品を紹介しています)|![](../../partsImgs/register-2.JPG){width=100}|![](../../partsImgs/qr/QR_47_1kΩ.png){width=100}|
|タクトスイッチ|2pin|ボタンを押している間だけ電気を流す部品です(chirimen チュートリアルでは 2pin のものを採用しています)|![](../../partsImgs/tactSwitch.JPG){width=100}|![](../../partsImgs/qr/QR_48_2pin.png){width=100}|
|タクトスイッチ|4pin|ボタンを押している間だけ電気を流す部品です(chirimen チュートリアルでは 2pin のものを採用しています)|![](../../partsImgs/tactSwitch.JPG){width=100}|![](../../partsImgs/qr/QR_49_4pin.png){width=100}|
|マイクロスイッチ|SS-10GL13|小型のスイッチです|![](../../partsImgs/microSw.jpeg){width=100}|![](../../partsImgs/qr/QR_50_SS-10GL13.png){width=100}|
|タッチセンサ/スイッチ|TP223|タッチセンサ(スイッチ)です。金属の近接(1-2mm 程度の接近)も感知でき応用が利きます。|![](../../partsImgs/TP223.JPG){width=100}|![](../../partsImgs/qr/QR_51_TP223.png){width=100}|
|Nch パワー MOSFET|2SK4017|直流電流の On/Off 制御を行う部品です|![](../../partsImgs/FET.JPG){width=100}|![](../../partsImgs/qr/QR_52_2SK4017.png){width=100}|
|Nch パワー MOSFET モジュール|IRF520 (ドライバモジュール)|上の FET を利用したモーター制御と同等の回路が組まれたモジュールです IRF520 パワー MOSFET が用られています|![](../../partsImgs/FET2.JPG){width=100}|![](../../partsImgs/qr/QR_53_IRF520%20(ドライバモジュール).png){width=100}|
|DC モーター 正逆転コントローラ|L298N (ドライバモジュール)|ST マイクロ社のフルブリッジドライバである L298N を使用した DC モーターコントローラです|![](../../partsImgs/L298N.JPG){width=100}|![](../../partsImgs/qr/QR_54_L298N%20(ドライバモジュール).png){width=100}|
|DC モータ 正逆転コントローラ|L9110S|L9110 を使用した DC モータコントローラです|![](../../partsImgs/L9110S.jpeg){width=100}|![](../../partsImgs/qr/QR_55_L9110S.png){width=100}|
|DC モータ 正逆転コントローラ|MX1508|L298N を使用した DC モータコントローラです|![](../../partsImgs/MX1508.JPG){width=100}|![](../../partsImgs/qr/QR_56_MX1508.png){width=100}|
|DC モータ 正逆転コントローラ|TB6612FNG|TOSHIBA 製 TB6612FNG を利用したモータドライバです|![](../../partsImgs/TB6612FNG.JPG){width=100}|![](../../partsImgs/qr/QR_57_TB6612FNG.png){width=100}|
|赤外線人感センサ|KP-IR412|人体に反応するセンサです|![](../../partsImgs/pyro1.JPG){width=100}|![](../../partsImgs/qr/QR_58_KP-IR412.png){width=100}|
|赤外線人感センサ|HC-SR501|人体に反応するセンサです|![](../../partsImgs/pyro2.JPG){width=100}|![](../../partsImgs/qr/QR_59_HC-SR501.png){width=100}|
|ステッピングモータコントローラ|A4988|バイポーラステッピングモータを制御するドライバです|![](../../partsImgs/A4988.JPG){width=100}|![](../../partsImgs/qr/QR_60_A4988.png){width=100}|
|LED|フレキシブルＬＥＤ　緑色|通電すると光る部品です(必ず抵抗を挟んで利用してください)|![](../../partsImgs/M-18007.JPG){width=100}|![](../../partsImgs/qr/QR_61_フレキシブルＬＥＤ緑色.png){width=100}|
|LED|フレキシブルＬＥＤ　赤色|通電すると光る部品です(必ず抵抗を挟んで利用してください)|![](../../partsImgs/M-18006.JPG){width=100}|![](../../partsImgs/qr/QR_62_フレキシブルＬＥＤ赤色.png){width=100}|
|LED|フレキシブルＬＥＤ　黄色|通電すると光る部品です(必ず抵抗を挟んで利用してください)|![](../../partsImgs/M-18010.JPG){width=100}|![](../../partsImgs/qr/QR_63_フレキシブルＬＥＤ黄色.png){width=100}|
|LED|フレキシブルＬＥＤ　ピンク色|通電すると光る部品です(必ず抵抗を挟んで利用してください)|![](../../partsImgs/M-18009.JPG){width=100}|![](../../partsImgs/qr/QR_64_フレキシブルＬＥＤピンク色.png){width=100}|

## アナログセンサー (I2C ADC で読み取り)

|カテゴリー|型番|説明|画像 URL|QR|
|:----|:----|:----|:----|:----:|
|雨センサ|RD-4P|雨(水)を検出するセンサです(GPIO)|![](../../partsImgs/rain.JPG){width=100}|![](../../partsImgs/qr/QR_65_RD-4P.png){width=100}|
|水センサ|M-WL-J3Y|水を検出するセンサです|![](../../partsImgs/water.JPG){width=100}|![](../../partsImgs/qr/QR_66_M-WL-J3Y.png){width=100}|
|圧力センサ(小)|FSR 400|圧力が検知できるセンサです|![](../../partsImgs/pressureS.JPG){width=100}|![](../../partsImgs/qr/QR_67_FSR400.png){width=100}|
|可変抵抗 | TSR-3386|抵抗値を変化させられる抵抗です|![](../../partsImgs/VR.JPG){width=100}|-|
|ロードセル | ジェネリック品多種|加重により抵抗値が微少に変化する素子。差動入力にした ADS1115 で利用可能です|![](../../partsImgs/LoadCell.JPG){width=100}|-|

## アクチュエータ

|カテゴリー|型番|説明|画像 URL|QR|
|:----|:----|:----|:----|:----:|
|サーボモータ|SG90|Tower Pro 製の小型サーボモータです|-|![](../../partsImgs/qr/QR_68_SG90.png){width=100}|
|DC モータ|各 Examples をご参照ください|-|-|-|
|2 相バイポーラステッピングモータ|多種(例は TS3692N65)|A4988 をご参照ください|![](../../partsImgs/StepperMotor.JPG){width=100}|![](../../partsImgs/qr/QR_69_多種(例はTS3692N65).png){width=100}|
|ギヤードモータ|ちびギヤモータ|小型のギヤードモータです|![](../../partsImgs/chibiGear.JPG){width=100}|![](../../partsImgs/qr/QR_70_ちびギヤモータ.png){width=100}|

## その他

|カテゴリー|型番|説明|画像 URL|QR|
|:----|:----|:----|:----|:----:|
|ブレッドボード|-|-|![](../../partsImgs/breadBoardS.JPG){width=100}|-|
|ジャンパー線|-|-|![](../../partsImgs/jumperFM.JPG){width=100}|-|
|カメラ|-|-|![](../../partsImgs/camera.JPG){width=100}|-|
|ファン|-|-|![](../../partsImgs/fan.JPG){width=100}|-|
|抵抗|-|-|![](../../partsImgs/register.JPG){width=100}|-|

## ボードコンピューター

|カテゴリー|型番|説明|画像 URL|QR|
|:----|:----|:----|:----|:----:|
|マイクロビット|-|-|![](../../partsImgs/microbit.JPG){width=100}|-|
|ブレークアウト|-|-|![](../../partsImgs/microbitBreakout.JPG){width=100}|-|

![CHIRIMEN 対応デバイスリスト QR コード](../images/parts-list-qr.png)
