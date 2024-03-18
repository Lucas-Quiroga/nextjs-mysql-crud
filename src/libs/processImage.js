import { writeFile } from "fs/promises";
import path from "path";

export async function processImage(image) {
  // Se convierte la imagen en un buffer
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Se construye la ruta del archivo donde se guardará la imagen
  const filePath = path.join(process.cwd(), "public", image.name);
  // Se escribe el buffer en el archivo especificado
  await writeFile(filePath, buffer);
  return filePath;
}
