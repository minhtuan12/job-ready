import { NextResponse } from "next/server";
import { cloudinaryService } from "@/service/cloudinary";
import { getResourceType } from "@/app/api/helpers";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/utils/db";
import { Application, Booking, User } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";
import { sendMail } from "@/service/mail";

export async function GET(req) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }

    const aplications = await db
      .select()
      .from(Application)
      .where(eq(Application.candidateId, user.id));

    return NextResponse.json({ aplications, status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Thất bại", details: err.message },
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    const formData = await req.formData();
    const fullName = formData.get("fullName")
    const email = formData.get("email")
    const cv = formData.get("cv")
    const letter = formData.get("letter")
    const jobId = formData.get("jobId")

    if (!fullName || !cv || !email) {
      return NextResponse.json({ error: "Không đủ thông tin" }, { status: 400 });
    }

    const user = await getUserFromCookie();
    if (!user) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }

    if (typeof cv === 'string') {
      const [application] = await db
        .insert(Application)
        .values({
          cv: cv,
          letter: letter || '',
          candidateName: fullName,
          candidateEmail: email,
          candidateId: user.id,
          jobId
        })
        .returning();
    } else {
      // Lấy loại file
      const mimeType = cv.type; // ví dụ "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      const resourceType = getResourceType(mimeType);

      // Convert file sang buffer
      const arrayBuffer = await cv.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await cloudinaryService.uploadFile(buffer, {
        resource_type: resourceType,
        public_id: cv.name.split(".")[0], // tên file không có đuôi
        format: mimeType.split("/")[1], // pdf, docx,...
      });
      const [application] = await db
        .insert(Application)
        .values({
          cv: uploadResult.secure_url,
          letter: letter || '',
          candidateName: fullName,
          candidateEmail: email,
          candidateId: user.id,
          jobId
        })
        .returning();
    }

    // await Promise.all([
    //   sendMail({
    //     subject: "Đặt lịch phỏng vấn 1-1",
    //     to: hrEmail
    //   }),
    //   sendMail({
    //     subject: "Lịch phỏng vấn 1-1",
    //     to: email
    //   })
    // ]);
    return NextResponse.json({ message: 'Thành công', status: 201, success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Thất bại", details: err.message, success: false },
      { status: 500, success: false }
    );
  }
}
