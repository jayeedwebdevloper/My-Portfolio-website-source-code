import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getCollections } from "@/lib/collections";
import { verifyAdmin } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const admin = await verifyAdmin(req as any);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { information } = await getCollections();

    await information.updateOne(
        { _id: new ObjectId(params.id) },
        { $set: body }
    );

    return NextResponse.json({ updated: true });
}