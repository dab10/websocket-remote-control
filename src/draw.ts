import { mouse, Button, Point } from "@nut-tree/nut-js";
import internal from "stream";

export const draw = async (duplex: internal.Duplex, chunk: string, typeOfAction: string, value: string[]) => {
  const [width, length] = value;

  if (typeOfAction === 'circle') {
    const r = +width;
    const arrPoints = [];
    const startPosition = await mouse.getPosition()
    const x0 = startPosition.x;
    const y0 = startPosition.y;

    for (let i = 0; i <= 360; i = i + 0.5) {
      const rad = i / 180 * Math.PI;
      const x = r * Math.cos(rad) + x0 - r;
      const y = r * Math.sin(rad) + y0;
      arrPoints.push(new Point(x, y))
    }

    mouse.config.mouseSpeed = 1000
    await mouse.pressButton(Button.LEFT);
    await mouse.move(arrPoints);
    await mouse.releaseButton(Button.LEFT);
    duplex.write(chunk);
    return console.log(`Done: ${chunk} px`);
  }

  if (typeOfAction === 'rectangle') {
    const arrPoints: Point[] = [];
    const startPosition = await mouse.getPosition()
    const x0 = startPosition.x;
    const y0 = startPosition.y;
    let i = 0;
    while (i < +length) {
      arrPoints.push(new Point(x0 + i, y0))
      i = i + 1;
    }
    i = 0;
    while (i < +width) {
      arrPoints.push(new Point(+length + x0, y0 + i))
      i = i + 1;
    }
    i = 0;
    while (i < +length) {
      arrPoints.push(new Point(+length + x0 - i, +width + y0))
      i = i + 1;
    }
    i = 0;
    while (i < +width) {
      arrPoints.push(new Point(x0, +width + y0 - i))
      i = i + 1;
    }

    mouse.config.mouseSpeed = 500
    await mouse.pressButton(Button.LEFT);
    await mouse.move(arrPoints);
    await mouse.releaseButton(Button.LEFT);
    duplex.write(chunk);
    return console.log(`Done: ${chunk} px`);
  }

  if (typeOfAction === 'square') {
    const arrPoints: Point[] = [];
    const startPosition = await mouse.getPosition()
    const x0 = startPosition.x;
    const y0 = startPosition.y;
    let i = 0;
    while (i < +width) {
      arrPoints.push(new Point(x0 + i, y0))
      i = i + 1;
    }
    i = 0;
    while (i < +width) {
      arrPoints.push(new Point(+width + x0, y0 + i))
      i = i + 1;
    }
    i = 0;
    while (i < +width) {
      arrPoints.push(new Point(+width + x0 - i, +width + y0))
      i = i + 1;
    }
    i = 0;
    while (i < +width) {
      arrPoints.push(new Point(x0, +width + y0 - i))
      i = i + 1;
    }

    mouse.config.mouseSpeed = 500
    await mouse.pressButton(Button.LEFT);
    await mouse.move(arrPoints);
    await mouse.releaseButton(Button.LEFT);
    duplex.write(chunk);
    return console.log(`Done: ${chunk} px`);
  } else {
    return console.log('Unknown command from front')
  }
}