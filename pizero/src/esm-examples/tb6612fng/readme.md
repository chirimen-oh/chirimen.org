# TB6612FNG: DC モーター制御

TOSHIBA製のモータードライバーIC TB6612FNGを使ってDCモーターを制御します。
L298NやMX1508と同様にIN1・IN2の2本の信号線で正転[1,0]・逆転[0,1]・ブレーキ[1,1]・フリー[0,0]の4状態を指示しますが、TB6612FNGは加えてSTBY(スタンバイ)ピンをHIGHにしないとドライバ自体が動作しない点が異なります。

## 配線図

![配線図](./schematic.png "schematic")

**接続方法：**

- TB6612FNG の STBY を GPIO19 に接続
- TB6612FNG の AIN1 を GPIO20 に接続
- TB6612FNG の AIN2 を GPIO21 に接続
- TB6612FNG の PWMA を VCC(3.3V)に接続(常にフルスピードで動作させる場合)
- TB6612FNG の VM をモーター電源(2.5V〜13.5V)に接続
- TB6612FNG の VCC を Raspberry Pi の 3.3V に接続
- TB6612FNG の GND を共通接続
- モーターを AO1、AO2 に接続

**制御信号：**

- 正転：AIN1=1, AIN2=0
- 逆転：AIN1=0, AIN2=1
- ブレーキ：AIN1=1, AIN2=1
- フリー：AIN1=0, AIN2=0

チャンネルB(BIN1・BIN2・PWMB・BO1・BO2)も同様の配線で、もう1つのモーターを独立に制御できます。
