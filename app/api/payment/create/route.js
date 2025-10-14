import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { Order, User } from "@/utils/schema";
import { getUserFromCookie } from "@/lib/auth";

export async function POST(request) {
    try {
        const user = await getUserFromCookie();
        if (!user) {
            return new Response(JSON.stringify({ error: "User not authenticated" }), {
                headers: { "Content-Type": "application/json" },
                status: 401,
            });
        }

        const { packageId } = await request.json();
        await db.insert(Order).values({
            userId: user.id,
            packageId,
            createdAt: new Date()
        });
        return NextResponse.json({ message: 'success', status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "thất bại", details: err.message },
            { status: 500 }
        );
    }
}
