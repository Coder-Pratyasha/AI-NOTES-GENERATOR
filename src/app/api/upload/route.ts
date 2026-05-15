import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const filePath = path.join(uploadDir, file.name);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      message: "PDF uploaded successfully",
      filename: file.name,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}