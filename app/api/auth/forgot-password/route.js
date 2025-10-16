import { NextResponse } from "next/server";
import { createAccount, hashPassword, isUserExists } from "@/utils/helpers";
import { User } from "@/utils/schema";
import { sendMail } from "@/service/mail";
import { db } from "@/utils/db";
import { eq, or } from "drizzle-orm";

export async function POST(request) {
    try {
        const { email } = await request.json();
        const [user] = await db
            .select()
            .from(User)
            .where(
                or(
                    eq(User.email, email),
                    eq(User.username, email)
                )
            )
            .limit(1);
        if (!user || !user.password) {
            return NextResponse.json({
                success: false,
                message: "Tài khoản này không tồn tại hoặc được đăng nhập bằng Google",
            });
        }

        const newPassword = "User@123";
        await Promise.all([
            db
                .update(User)
                .set({ password: await hashPassword(newPassword) })
                .where(
                    or(eq(User.email, email), eq(User.username, email))
                ),
            sendMail({
                subject: `JobReady - Mật khẩu mới cho tài khoản ${email}`,
                to: user.email,
                text: "Mật khẩu mới là: User@123",
            })
        ]);

        return NextResponse.json({
            success: true,
            message: "Successfully reset password",
            email: user.email
        });
    } catch (error) {
        const errorResponse = JSON.stringify(error, null, 2);
        console.error("Error reset password:", errorResponse);
        return NextResponse.json(
            { error: "Failed to sign up" },
            { status: 500 }
        );
    }
}
