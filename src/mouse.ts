import { mouse, left, right, up, down } from "@nut-tree/nut-js";
import internal from "stream";

export const mouseAction = async (duplex: internal.Duplex, chunk: string, typeOfAction: string, value: string[]) => {
  try {
    const [valueToMoveMouse] = value;

    if (typeOfAction === 'left') {
      await mouse.move(left(parseInt(valueToMoveMouse)));
      duplex.write(chunk);
      return console.log(`Done: ${chunk} px`);
    }
    if (typeOfAction === 'right') {
      await mouse.move(right(parseInt(valueToMoveMouse)));
      duplex.write(chunk);
      return console.log(`Done: ${chunk} px`);
    }
    if (typeOfAction === 'up') {
      await mouse.move(up(parseInt(valueToMoveMouse)));
      duplex.write(chunk);
      return console.log(`Done: ${chunk} px`);
    }
    if (typeOfAction === 'down') {
      await mouse.move(down(parseInt(valueToMoveMouse)));
      duplex.write(chunk);
      return console.log(`Done: ${chunk} px`);
    }
    if (typeOfAction === 'position') {
      const res = await mouse.getPosition()
      duplex.write(`${chunk} ${res.x},${res.y}`);
      return console.log(`Done: ${chunk} x: ${res.x} px, y: ${res.y} px`)
    } else {
      return console.log('Error: Unknown command from front');
    }
  } catch (err) {
    console.log((err as Error).message);
  }
}