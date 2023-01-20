import { mouse, left, right, up, down } from "@nut-tree/nut-js";
import internal from "stream";

export const mouseAction = async (duplex: internal.Duplex, chunk: string, typeOfAction: string, value: string[]) => {
  const [valueToMoveMouse] = value;

  if (typeOfAction === 'left') {
    await mouse.move(left(+valueToMoveMouse));
    duplex.write(chunk);
    console.log(`Done: ${chunk} px`);
  }
  if (typeOfAction === 'right') {
    await mouse.move(right(+valueToMoveMouse));
    duplex.write(chunk);
    console.log(`Done: ${chunk} px`);
  }
  if (typeOfAction === 'up') {
    await mouse.move(up(+valueToMoveMouse));
    duplex.write(chunk);
    console.log(`Done: ${chunk} px`);
  }
  if (typeOfAction === 'down') {
    await mouse.move(down(+valueToMoveMouse));
    duplex.write(chunk);
    console.log(`Done: ${chunk} px`);
  }
  if (typeOfAction === 'position') {
    const res = await mouse.getPosition()
    duplex.write(`${chunk} ${res.x},${res.y}`);
    console.log(`Done: ${chunk} x: ${res.x} px, y: ${res.y} px`)
  } else {
    console.log('Unknown command from front');
  }
}