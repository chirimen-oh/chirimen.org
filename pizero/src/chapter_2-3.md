# 2.3 ステップ2 (WiFi設定)
1. ターミナルウィンドの```[wifi panel]```ボタンを押します
   * ウィンドが開き、WiFiアクセスポイントがスキャンされます。ステルスでないアクセスポイントは一覧に表示されるので、以降の作業の参考にしてください。
   * Raspberry Pi Zero W は **2.4GHz帯の WiFi** にのみ対応しています。
    ![WiFi Setting](./imgs/WiFiSetting.png)
2. ウィンド下部に、WiFiアクセス情報を入力します (いずれも大文字と小文字が区別されるので注意してください)
   * SSID欄
   * PASS PHRASE欄 
3. ```[SET WiFi]```ボタンを押します
4. ```[Reboot]```ボタンを押します
   * これで Raspberry Pi Zero が再起動を始めます
5. WiFiウィンドを閉じ、ターミナルウィンドに戻ります
6. ターミナルウィンドの```[Close Connection]```ボタンを押します
7. 1-2分程待ちます（この間に Raspberry Pi Zero が再起動します）
8. ```[Connect and Login PiZero]```ボタンを押して接続します
   * 接続ダイアログが表示されます。接続すると、これまでと同様にコマンドプロンプトが表示されます。
9. ```[wifi panel]```ボタンを再び押します
10. ```[wifi Info]```ボタンを押します
    * 表示された情報を確認します
    * wlan0: inet xxx.xxx.xxx.xxx (xxxは数字)のようにIPアドレスが設定されていれば接続に成功しています。
![WiFi Setting_IPaddress](./imgs/WiFiSettingIPaddress.png)
11.  確認できたら、WiFi Settingウィンドを閉じてください。
  <!--  * あとでping chirimen.org OK も入れよう。-->
* sshやscp (WinSCP, teraterm等)などのツールに慣れている場合は、上記のアドレスでssh接続できます
  * PORT: 22
  * ID: ```pi```
  * PASSWORD: ```raspberry```
