import "server-only";
import sharp from "sharp";

export async function convertImage(
  image: ArrayBuffer,
  size: { width: number; height: number }
): Promise<Uint8Array> {
  const resizedImage = new Uint8Array(
    await sharp(image).resize(size.height, size.width).toBuffer()
  );

  return resizedImage;
}
