/*
  This is example JavaScript code for MCP9808.
  Written by Haruka Terai.
*/

import { requestI2CAccess } from "chirimen";
import MCP9808 from "@chirimen/mcp9808";

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

const mcp9808 = new MCP9808(i2cPort, 0x18);
await mcp9808.init();

await mcp9808.wake();
await mcp9808.setResolution(3);

setInterval(async function () {

  let mode = await mcp9808.getResolution();
  let data_t = await mcp9808.readTempC();
  let data_f = await mcp9808.readTempF();
  console.dir(mode);
  console.dir({ "T": data_t, "F": data_f });

}, 1000);