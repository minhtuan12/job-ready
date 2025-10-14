import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { Order, User } from "@/utils/schema";
import { plans } from "@/utils/constants";
import { eq } from "drizzle-orm";

export async function POST(request) {
    try {
        const data = await request.json();
        const des = data.content.split('-')[1];
        if (data.code === 'JRDA') {
            const [userId, packageId] = des.split('JR');
            await db
                .update(User)
                .set({
                    package: plans.find(item => item.id === Number(packageId)).code || '',
                })
                .where(eq(User.id, Number(userId)));
            return NextResponse.json({ message: 'success', status: 200 });
        }

        return NextResponse.json({ message: 'none', status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "thất bại", details: err.message },
            { status: 500 }
        );
    }
}
