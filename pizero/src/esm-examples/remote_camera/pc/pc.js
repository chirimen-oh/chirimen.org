import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenCAM");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const mdata = msg.data;
  console.log("mdata:", mdata);
  document.getElementById("remoteImage").src = mdata.imageURI;
  const capTime = new Date(mdata.time);
  document.getElementById("timeTD").innerText =
    "撮影時刻: " + capTime.toLocaleString();
};

window.takeImage = () => {
  // get microbit's internal sensor data
  channel.send("GET IMAGE DATA");
};
