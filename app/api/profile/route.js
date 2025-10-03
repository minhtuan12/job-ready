import { NextResponse } from "next/server";
import { cloudinaryService } from "@/service/cloudinary";
import { getResourceType } from "@/app/api/helpers";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/utils/db";
import { Booking, User } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";
import { sendMail } from "@/service/mail";

export async function POST(req) {
  try {
    const data = await req.json();
    const fullName = data.fullName || ''
    if (!fullName) {
      return NextResponse.json({ error: "Không đủ thông tin" }, { status: 400 });
    }

    const user = await getUserFromCookie();
    if (!user) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }

    await db
      .update(User)
      .set({ fullName })
      .where(
        eq(User.email, user.email)
      )
    return NextResponse.json({ message: 'Thành công', status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Thất bại", details: err.message },
      { status: 500 }
    );
  }
}
