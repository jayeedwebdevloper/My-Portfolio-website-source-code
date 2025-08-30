import { verifyAdmin } from "@/lib/auth";
import { getCollections } from "@/lib/collections";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { skills } = await getCollections();
        const { id } = await params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const query = { _id: new ObjectId(id) }
        await skills.deleteOne(query);

        return NextResponse.json({ deleted: true });
    } catch (err) {
        console.error("DELETE /skills/[id] error:", err);
        return NextResponse.json({ error: "Delete failed", message: String(err) }, { status: 400 });
    }
}