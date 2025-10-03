import { NextResponse } from "next/server";
import { cloudinaryService } from "@/service/cloudinary";
import { getResourceType } from "@/app/api/helpers";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/utils/db";
import { User } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ error: "Không có file" }, { status: 400 });
    }

    const user = await getUserFromCookie();
        
        // Kiểm tra nếu người dùng chưa đăng nhập hoặc không có email
        if (!user) {
          return new Response(JSON.stringify({ error: "User not authenticated" }), {
            headers: { "Content-Type": "application/json" },
            status: 401,
          });
        }
    
    // Lấy loại file
    const mimeType = file.type; // ví dụ "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    const resourceType = getResourceType(mimeType);

    // Convert file sang buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload lên Cloudinary
    const uploadResult = await cloudinaryService.uploadFile(buffer, {
      resource_type: resourceType,
      public_id: file.name.split(".")[0], // tên file không có đuôi
      format: mimeType.split("/")[1], // pdf, docx,...
    });

    const updatedCvUrls = [...(user?.cvUrls ?? []), uploadResult.secure_url];
    
    await db
      .update(User)
      .set({ cvUrls: updatedCvUrls })
      .where(eq(User.username, user.username));

    return NextResponse.json(uploadResult);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Upload thất bại", details: err.message },
      { status: 500 }
    );
  }
}
