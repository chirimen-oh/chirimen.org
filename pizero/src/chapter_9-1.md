# 10.1 CHIRIMEN ブラウザー版との差異

| CHIRIMEN ブラウザー版                                 | Node.js                                                                                                                          |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| ライブラリ、ドライバーはhtmlで読み込む                | jsの中で直接読み込む                                                                                                             |
| <pre>`<script src="polyfill.js"></script >`</pre>     | <pre>`import { requestGPIOAccess } from "node-web-gpio";`</pre><br><pre>`import { requestI2CAccess } from "node-web-i2c";`</pre> |
| <pre>`<script src="..../adt7410.js"></script >`</pre> | <pre>`import ADT7410 from "@chirimen/adt7410";`</pre>                                                                            |
|                                                       | Sleep関数を宣言<br><pre>`const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));`</pre>                             |
