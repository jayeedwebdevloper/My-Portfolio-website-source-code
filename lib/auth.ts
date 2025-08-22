import { NextRequest } from "next/server";

export async function verifyAdmin(req: NextRequest) {
    const uid = req.headers.get("x-uid");

    if (!uid || uid !== process.env.ADMIN_UID) {
        return null;
    }

    return uid;
}