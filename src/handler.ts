import internal from "stream";
import { draw } from "./draw";
import { mouseAction } from "./mouse";
import { printScreen } from "./printScreen";

export const handler = (duplex: internal.Duplex) => {
  duplex.on('data', async (chunk) => {
    try {
      console.log(`Received: ${chunk}`);
      const typeOfCommand = chunk.split('_')[0];
      const typeOfAction = chunk.split('_')[1].split(' ')[0];
      const value = chunk.split('_')[1].split(' ') ? chunk.split('_')[1].split(' ').slice(1) : '';
  
      if (typeOfCommand === 'mouse') {
        await mouseAction(duplex, chunk, typeOfAction, value)
      } else if (typeOfCommand === 'draw') {
        await draw(duplex, chunk, typeOfAction, value)
      } else if (typeOfCommand === 'prnt') {
        await printScreen(duplex, chunk)
      } else {
        console.log('Error: Unknown command from front')
      }
    } catch (err) {
      console.log((err as Error).message);
    }
  })
}