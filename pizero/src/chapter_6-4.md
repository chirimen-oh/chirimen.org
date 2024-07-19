# 6.4 自分専用チャンネルで制御
サンプルのコードは共通のチャンネルを使って制御しています。この状態では複数の人が同時に実習していると混信します。(他の人のPCでON/OFFを指示しても、自分のLEDがON/OFFする。同じチャンネルを使っているため。)

これはこれで使い道はあるのですが、自分のLEDは自分だけで制御したい場合は専用のチャンネルを使って制御しましょう。　チャンネルの指定はPiZero側のコードと、PC側のコード両方を同時に同じ内容で設定する必要があり、以下の部分になります。

```channel = await relay.subscribe("chirimenLED");```

この```chirimenLED```という文字列(チャンネル名)を他の人と被らない別のチャンネル名に書き換えます(```chirimenLED5```など)