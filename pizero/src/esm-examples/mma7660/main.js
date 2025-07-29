import {requestI2CAccess} from "chirimen";
import MMA7660 from "@chirimen/mma7660";

async function main() {

    const i2cAccess = await requestI2CAccess();

    const i2cPort = i2cAccess.ports.get(1);

    const mma7660 = new MMA7660(i2cPort, 0x4c);

    await mma7660.init();

    setInterval(async() => {
        const XYZData = await mma7660.getXYZ();
        const AccelerationData = await mma7660.getAcceleration();

        console.dir(`X =${  XYZData.X}`);
        console.dir(`y =${  XYZData.Y}`);
        console.dir(`z =${  XYZData.Z}`);

        console.dir(`accleration of X/Y/Z: ${  AccelerationData.X  } g/ ${  AccelerationData.Y  } g/ ${  AccelerationData.Z  } g`);

    }, 500);

}

main();