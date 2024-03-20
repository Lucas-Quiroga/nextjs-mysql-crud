import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { cloudinary } from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";
import { unlink } from "fs/promises";

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM product WHERE id = ?", [
      params.id,
    ]);
    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM product WHERE id = ?", [
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.formData();
    const image = data.get("image");
    const updateData = {
      name: data.get("name"),
      price: data.get("price"),
      description: data.get("description"),
    };
    if (!data.get("name")) {
      return NextResponse.json(
        {
          message: "El nombre es requerido",
        },
        {
          status: 400,
        }
      );
    }

    if (image) {
      //en modo desarrollo
      // const filePath = await processImage(image);

      //en modo producción
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

      updateData.image = res.secure_url;

      const result = await conn.query("UPDATE product SET ? WHERE id = ?", [
        updateData,
        params.id,
      ]);

      if (result.affectedRows === 0) {
        return NextResponse.json(
          {
            message: "Producto no encontrado",
          },
          {
            status: 404,
          }
        );
      }

      const updateProduct = await conn.query(
        "SELECT * FROM product WHERE id = ?",
        [params.id]
      );

      return NextResponse.json(updateProduct[0]);

      // Se sube la imagen a Cloudinary
      //en modo desarrollo
      // const res = await cloudinary.uploader.upload(filePath);

      // Si se pudo subir la imagen correctamente a Cloudinary, se elimina del servidor local
      // if (res && process.env.NODE_ENV !== "production") {
      //   await unlink(filePath);
      // }
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
