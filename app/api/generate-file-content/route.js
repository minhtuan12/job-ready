import { NextResponse } from "next/server";
import { cloudinaryService } from "@/service/cloudinary";
import { getResourceType } from "@/app/api/helpers";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/utils/db";
import { User } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";
import mammoth from "mammoth";
import PDFParser from "pdf2json";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ error: "Không có file" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    let text = "";

    if (file.type === "application/pdf") {
      const pdfParser = new PDFParser();
      await new Promise((resolve, reject) => {
        pdfParser.on("pdfParser_dataError", reject);
        pdfParser.on("pdfParser_dataReady", resolve);
        pdfParser.parseBuffer(Buffer.from(arrayBuffer));
      });
      text = pdfParser.getRawTextContent();
    } else if (
      file.type === "application/msword" ||
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const { value } = await mammoth.extractRawText({ buffer: Buffer.from(arrayBuffer) });
      text = value;
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Upload thất bại", details: err.message },
      { status: 500 }
    );
  }
}
