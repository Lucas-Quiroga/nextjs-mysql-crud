import { NextResponse, NextRequest } from "next/server";
import { conn } from "@/libs/mysql";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM product");
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    // Se obtiene el formulario enviado en la solicitud
    const data = await request.formData();
    // Se obtiene la imagen del formulario
    const image = data.get("image");
    // Si no se proporciona una imagen, se devuelve un error de solicitud incorrecta
    if (!image) {
      return NextResponse.json(
        { message: "Image es required" },
        {
          status: 400,
        }
      );
    }

    // Se convierte la imagen en un buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Se construye la ruta del archivo donde se guardará la imagen
    const filePath = path.join(process.cwd(), "public", image.name);
    // Se escribe el buffer en el archivo especificado
    await writeFile(filePath, buffer);

    // Se sube la imagen a Cloudinary
    const res = await cloudinary.uploader.upload(filePath);

    // Si se pudo subir la imagen correctamente a Cloudinary, se elimina del servidor local
    if (res) {
      await unlink(filePath);
    }

    // Se inserta el producto en la base de datos
    const result = await conn.query("INSERT INTO product SET ?", {
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      image: res.secure_url, // Se añade la URL segura de la imagen subida a Cloudinary
    });

    // Se devuelve una respuesta con los datos del producto insertado
    return NextResponse.json({
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      id: result.insertId,
    });
  } catch (error) {
    // Si ocurre un error durante el proceso, se devuelve un error interno del servidor
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}
