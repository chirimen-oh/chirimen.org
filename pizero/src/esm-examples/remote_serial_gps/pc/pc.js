import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenGPS");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = ({ data }) => {
  if (!data.fix) {
    fixTd.innerText = "衛星未捕捉";
    messageDiv.innerText = "GPS衛星をまだ捕捉できていません";
    return;
  }
  fixTd.innerText = "OK";
  latTd.innerText = data.lat;
  lonTd.innerText = data.lon;
  altTd.innerText = data.alt;
  satTd.innerText = data.satellites;
  qualityTd.innerText = data.quality;
  timeTd.innerText = data.time;
  messageDiv.innerText = `緯度:${data.lat} 経度:${data.lon}`;
};
