// Remote HT16K33 8x8 Matrix LED - receiver

import { requestI2CAccess } from "node-web-i2c";
import HT16K33 from "@chirimen/ht16k33";
import { RelayServer } from "./RelayServer.js";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// プリセットパターン（"#"=点灯 / "_"=消灯 の8x8パターン。元の ht16k33/main.js と同じもの）
const presetPatterns = {
  smile: `
    _ _ # # # # _ _
    _ # _ _ _ _ # _
    # _ # _ _ # _ #
    # _ _ _ _ _ _ #
    # _ # _ _ # _ #
    # _ _ # # _ _ #
    _ # _ _ _ _ # _
    _ _ # # # # _ _
  `,
  invader: `
    # _ _ _ _ _ _ #
    _ # _ _ _ _ # _
    _ _ # # # # _ _
    _ # # # # # # _
    # # _ # # _ # #
    _ # # # # # # _
    _ _ # _ _ # _ _
    # # _ _ _ _ # #
  `,
  dog: `
    _ # _ _ _ _ # _
    # # # # # # # _
    # _ _ # _ _ # _
    # # _ # # _ # _
    # _ _ # _ _ # _
    # # # # # # # _
    _ # # # # # # #
    _ # _ # _ # _ #
  `,
};

function parsePattern(patternText) {
  return patternText
    .replace(/[^#_]/g, "")
    .split("")
    .map((c) => c === "#");
}

async function showPattern(patternText) {
  const pattern = parsePattern(patternText);
  if (pattern.length !== 64) {
    throw new Error(
      `パターンは8x8(64マス)で指定してください（現在${pattern.length}マス）`,
    );
  }
  ht.set_8x8_array(pattern);
  await ht.write_display();
}

async function controlDisplay(message) {
  const { preset, pattern, clear } = message.data ?? {};
  try {
    if (clear) {
      ht.clear();
      await ht.write_display();
      channel.send({ status: "ok", message: "表示をクリアしました" });
      return;
    }
    const patternText = preset ? presetPatterns[preset] : pattern;
    if (!patternText) return;
    await showPattern(patternText);
    channel.send({ status: "ok", message: "表示を更新しました" });
  } catch (error) {
    channel.send({ status: "error", message: error.message });
  }
}

// I2C HT16K33マトリクスLEDドライバの初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const ht = new HT16K33(i2cPort);
await ht.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenHT16K33");
console.log("web socketリレーサービスに接続しました");
channel.onmessage = controlDisplay;
