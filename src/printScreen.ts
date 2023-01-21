import Jimp from 'jimp';
import { Region, screen, mouse } from "@nut-tree/nut-js";
import internal from "stream";

export const printScreen = async (duplex: internal.Duplex, chunk: string) => {
  try {
    const startPosition = await mouse.getPosition()
    const x0 = startPosition.x;
    const y0 = startPosition.y;
    const image = await screen.grabRegion(new Region(x0 - 100, y0 - 100, 200, 200));
    const imageNormalizeRGB = await image.toRGB();

    new Jimp({data: imageNormalizeRGB.data, width: 200, height: 200}, async (err: Error, image: Jimp) => {
      if (err) return console.log((err as Error).message);
      
      const imageRes = await image.getBufferAsync(Jimp.MIME_PNG);
      duplex.write(`${chunk} ${imageRes.toString('base64')}`);
      return console.log(`Done: ${chunk} buffer image: ${imageRes.toString('base64').slice(0, 10)}...`);
    })
  } catch (error) {
    console.log((error as Error).message);
  }

}