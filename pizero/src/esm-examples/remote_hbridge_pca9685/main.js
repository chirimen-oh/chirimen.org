// Remote Example PCA9685PWM + HBridge - reciever
// for CHIRIMEN with nodejs

import { requestI2CAccess } from "node-web-i2c";
import PCA9685_PWM from "@chirimen/pca9685-pwm";

import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import { RelayServer } from "./RelayServer.js";

let pca9685pwm;
let channel;

async function controlMotor(message) {
	console.log(message.data);
	if ( message.data.motor==undefined || message.data.speed==undefined ){
		return;
	}
	const motorNum = message.data.motor;
	const motorSpeed = message.data.speed;
	let direction = 0;
	if (motorSpeed > 0) {
		direction = 1;
	} else if (motorSpeed == 0) {
		direction = 0;
	} else {
		direction = -1;
	}
	const speed = Math.min(1, Math.abs(motorSpeed));
	await setMotor(direction, speed);
	console.log("MOTOR" + motorNum + "を" + direction * speed + "に設定しました");
	channel.send({motor:motorNum, setSpeed:(speed*direction)});
}

async function setMotor(direction, speed) {
	// direction: モーターの回転方向 正転:1,逆転:-1,停止:0
	// speed: モーターのスピード 0:停止....1.0:全速
	if (direction == 1) {
		await pca9685pwm.setPWM(1, 0);
		await pca9685pwm.setPWM(0, speed);
	} else if (direction == -1) {
		await pca9685pwm.setPWM(0, 0);
		await pca9685pwm.setPWM(1, speed);
	} else {
		await pca9685pwm.setPWM(0, 0);
		await pca9685pwm.setPWM(1, 0);
	}
}

// I2C PCA9685モジュール（PWM）の初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
pca9685pwm = new PCA9685_PWM(i2cPort, 0x40);
await pca9685pwm.init(100);

// webSocketリレーの初期化
//
const relay = RelayServer("chirimentest","chirimenSocket",nodeWebSocketLib,"https://chirimen.org");
channel = await relay.subscribe("chirimenPWMHB");
console.log("web socketリレーサービスに接続しました");
channel.onmessage = controlMotor;
