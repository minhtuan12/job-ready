import { NextResponse } from "next/server";
import { cloudinaryService } from "@/service/cloudinary";
import { getResourceType } from "@/app/api/helpers";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/utils/db";
import { Application, Booking, CourseRegister, User } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";
import { sendMail } from "@/service/mail";
import { courses, softSkills } from "@/utils/constants";

export async function GET(req) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }

    const courses = await db
      .select()
      .from(CourseRegister)
      .where(eq(CourseRegister.candidateId, user.id));
    const courseIds = new Set(courses.map(item => item.courseId));
    const courseRegisters = softSkills.filter(item => courseIds.has(item.id));

    return NextResponse.json({ courseRegisters, status: 200 });
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
    const { name, email, question, courseId } = await req.json();

    if (!name || !email || !courseId) {
      return NextResponse.json({ error: "Không đủ thông tin" }, { status: 400 });
    }

    const user = await getUserFromCookie();
    if (!user) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }

    const [application] = await db
      .insert(CourseRegister)
      .values({
        name,
        email,
        courseId,
        candidateId: user.id,
        question: question ?? ''
      })
      .returning();

    const course = softSkills.find(i => i.id === courseId);
    await Promise.all([
      sendMail({
        subject: `Đăng ký khóa học ${course.name} thành công`,
        to: email
      }),
    ]);
    return NextResponse.json({ message: 'Thành công', status: 201, success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Thất bại", details: err.message, success: false },
      { status: 500, success: false }
    );
  }
}
