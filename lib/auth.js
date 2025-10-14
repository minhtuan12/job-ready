import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { db } from "@/utils/db";
import { User } from "@/utils/schema";
import { eq, or } from "drizzle-orm";
import { cloudinaryService } from "@/service/cloudinary";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getUserFromCookie() {
    try {
        const cookiesList = await cookies();
        const token = cookiesList.get("token")?.value;
        if (!token) return null;

        const { payload } = await jwtVerify(token, secret);
        if (payload.email || payload.username) {
            const result = await db
                .select()
                .from(User)
                .where(
                    or(
                        eq(User.email, payload.email || ""),
                        eq(User.username, payload.username || "")
                    )
                );

            if (result.length > 0) {
                let cvUrls = [];
                if (result[0].cvUrls) {
                    for (let url of result[0].cvUrls) {
                        const paths = url.split('/');
                        const publicId = decodeURIComponent(paths[paths.length - 2] + '/' + paths[paths.length - 1]);
                        const file = await cloudinaryService.getFileInfo(publicId, 'raw');
                        if (file) {
                            cvUrls.push({
                                url: file.secure_url,
                                name: file.display_name
                            })
                        }
                    }
                }
                return {
                    id: result[0].id,
                    email: result[0].email,
                    emailAddresses: [{ emailAddress: result[0].email }],
                    primaryEmailAddress: { emailAddress: result[0].email },
                    username: result[0].username,
                    fullName: result[0].fullName,
                    packages: result[0].package || 'free',
                    cvUrls
                };
            }
            return null;
        }

        return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}
