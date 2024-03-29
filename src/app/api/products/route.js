import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { unlink } from "fs/promises";
import { cloudinary } from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

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

    //en modo desarrollo
    // const filePath = await processImage(image);
    // Se sube la imagen a Cloudinary
    // const res = await cloudinary.uploader.upload(filePath);

    //en modo produccion
    const buffer = await processImage(image);
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
          },
          async (err, res) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(res);
          }
        )
        .end(buffer);
    });

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

    // Si se pudo subir la imagen correctamente a Cloudinary, se elimina del servidor local
    // if (res && process.env.NODE_ENV !== "production") {
    //   await unlink(filePath);
    // }
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
