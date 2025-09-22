const repos = [
  "chirimen",
  "chirimen-drivers",
  "chirimen-micro-bit",
  "chirimen-TY51822r3",
  "node-web-gpio",
  "node-web-i2c",
  "PiZeroWebSerialConsole",
  "remote-connection",
  "technical-book8",
  "tutorials-TY51822r3",
  "webGPIO-etc-on-microbit-via-webBluetooth",
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    for (const repo of repos) {
      if (url.pathname === `/${repo}` || url.pathname.startsWith(`/${repo}/`)) {
        url.hostname = "www.chirimen.org";
        return Response.redirect(url, 301);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
