# MMA7660 ３軸加速度センサー

## 配線図

![配線図1](./schematic.png "schematic")

## ドライバのインストール

```
npm i @chirimen/mma7660
```

## サンプルコード説明

ドライバの初期化
```
await mma7660.init();
```

X軸、Y軸、Z軸の方向検出生データを取得
```
await mma7660.getXYZ();
```

X軸、Y軸、Z軸の加速度を取得
３軸それぞれについて-1〜+1の間でデータが取得でき、定期的にデータを取得することで特定軸への傾きを検出するなどが可能
```
await mma7660.getAcceleration();
```