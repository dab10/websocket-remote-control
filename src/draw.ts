import { mouse, Button, Point, screen } from "@nut-tree/nut-js";
import internal from "stream";

export const draw = async (duplex: internal.Duplex, chunk: string, typeOfAction: string, value: string[]) => {
  try {
    const [widthString, lengthString] = value;
    const width = parseInt(widthString);
    const length = parseInt(lengthString);
    const screenWidth = await screen.width();
    const screenHeight = await screen.height();
  
  
    if (typeOfAction === 'circle') {
      const r = width;
      const arrPoints = [];
      const startPosition = await mouse.getPosition()
      const x0 = startPosition.x + 1;
      const y0 = startPosition.y + 1;
    
      if (x0 + 2 * r > (screenWidth - 1) || y0 + r > (screenHeight - 1) || y0 - r < 0 || x0 < 0) {
        return console.log('Error: Out of boundaries of screen. Please move mouse another position');
      }
  
      for (let i = -180; i <= 180; i = i + 0.5) {
        const rad = i / 180 * Math.PI;
        const x = r * Math.cos(rad) + x0 + r;
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
      const x0 = startPosition.x + 1;
      const y0 = startPosition.y + 1;
  
      if (x0 + length > (screenWidth - 1) || y0 + width > (screenHeight - 1) || y0  < 0 || x0  < 0) {
        return console.log('Error: Out of boundaries of screen. Please move mouse another position');
      }
  
      let i = 0;
      while (i <= length) {
        arrPoints.push(new Point(x0 + i, y0))
        i = i + 1;
      }
      i = 0;
      while (i <= width) {
        arrPoints.push(new Point(length + x0, y0 + i))
        i = i + 1;
      }
      i = 0;
      while (i <= length) {
        arrPoints.push(new Point(length + x0 - i, width + y0))
        i = i + 1;
      }
      i = 0;
      while (i <= width) {
        arrPoints.push(new Point(x0, width + y0 - i))
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
      const x0 = startPosition.x + 1;
      const y0 = startPosition.y + 1;
  
      if (x0 + width > (screenWidth - 1) || y0 + width > (screenHeight - 1) || y0  < 0 || x0  < 0) {
        return console.log('Error: Out of boundaries of screen. Please move mouse another position');
      }
  
      let i = 0;
      while (i <= width) {
        arrPoints.push(new Point(x0 + i, y0))
        i = i + 1;
      }
      i = 0;
      while (i <= width) {
        arrPoints.push(new Point(width + x0, y0 + i))
        i = i + 1;
      }
      i = 0;
      while (i <= width) {
        arrPoints.push(new Point(width + x0 - i, width + y0))
        i = i + 1;
      }
      i = 0;
      while (i <= width) {
        arrPoints.push(new Point(x0, width + y0 - i))
        i = i + 1;
      }
  
      mouse.config.mouseSpeed = 500
      await mouse.pressButton(Button.LEFT);
      await mouse.move(arrPoints);
      await mouse.releaseButton(Button.LEFT);
      duplex.write(chunk);
      return console.log(`Done: ${chunk} px`);
    } else {
      return console.log('Error: Unknown command from front')
    }
  } catch (err) {
    console.log((err as Error).message);
  }
}