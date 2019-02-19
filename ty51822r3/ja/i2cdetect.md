# i2cdetect について

![i2cdetect](imgs/i2cdetect/i2cdetect.png)  


CHIRIMEN for Raspberry Pi 3 では I2C デバイスが正常に接続されているかどうかを確認するために、ターミナルから `i2cdetect` というコマンドを使う事ができました。このコマンドは I2C バスをスキャンして反応のあったスレーブアドレスを表示するツールです。  

CHIRIMEN for TY51822r3 では残念ながらこのコマンドを使用する事はできませんが、代替として I2C デバイスをスキャンするための Web アプリを準備しました。
`i2cdetect` コマンドとまったく同等という訳ではありませんが、このチュートリアルで使用している I2C デバイスが正常に接続されているかどうかの判断では問題なく動作します。

この `i2cdetect` Web アプリはデバイスの確認に `read8()` を使用しています。これはコマンドラインの `i2cdetect` での `-r` オプションに相当します。
リード動作の場合、幾つかの Write Only の I2C デバイスでは異常状態になる事が確認されているようです。

## [i2cdetect 実行ページ](examples/i2cdetect.html)  
