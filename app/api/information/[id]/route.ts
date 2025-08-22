import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getCollections } from "@/lib/collections";
import { verifyAdmin } from "@/lib/auth";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const admin = await verifyAdmin(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { information } = await getCollections();

    const { id } = await params;
    await information.updateOne(
        { _id: new ObjectId(id) },
        { $set: body }
    );

    return NextResponse.json({ updated: true });
}