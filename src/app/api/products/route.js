import { NextResponse, NextRequest } from "next/server";

export function GET() {
  return NextResponse.json("Listando productos");
}

export function POST() {
  return NextResponse.json("creando productos");
}
