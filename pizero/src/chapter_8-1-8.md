# 8.1.8 RaspberryPi のカメラに関する注意
<img src="./imgs/PiZero_camera1.jpg" width=300>　<img src="./imgs/PiZero_camera2.jpg" width=300>

- 接続端子・フラットケーブルは壊れやすい
  - 無理に引っ張らない
  - 折り曲げない様に注意

> **Note**\
> 利用可能なカメラモジュールは v1、v3 です。
> また Raspberry Pi Zero 用 CHIRIMEN v1.4.0 未満をお使いの場合、Camera Module v3 には未対応です。
> [Raspberry Pi Zero 用 CHIRIMEN v1.4.0 以上](https://github.com/chirimen-oh/chirimen-lite/releases) をお使いください。

## カメラの動作テスト

以下のコマンドで画像ファイルが保存されます:

```
raspistill -v --width 640 --height 480 -o test.jpg
```

> **Note**\
> [Raspberry Pi Zero 用 CHIRIMEN v1.4.0 以上](https://github.com/chirimen-oh/chirimen-lite/releases) をお使いの場合、`rpicam-still --list-cameras` コマンドで利用可能なカメラの一覧を表示可能です:
>
> ```
> $ rpicam-still --list-cameras
> Available cameras
> -----------------
> 0 : ov5647 [2592x1944 10-bit GBRG] (/base/soc/i2c0mux/i2c@1/ov5647@36)
>     Modes: 'SGBRG10_CSI2P' : 640x480 [58.92 fps - (16, 0)/2560x1920 crop]
>                              1296x972 [43.25 fps - (0, 0)/2592x1944 crop]
>                              1920x1080 [30.62 fps - (348, 434)/1928x1080 crop]
>                              2592x1944 [15.63 fps - (0, 0)/2592x1944 crop]
> ```
>
> 詳細: [Camera software - Raspberry Pi Documentation](https://www.raspberrypi.com/documentation/computers/camera_software.html)

[応用センサー一覧に戻る](./chapter_8-1.md)
