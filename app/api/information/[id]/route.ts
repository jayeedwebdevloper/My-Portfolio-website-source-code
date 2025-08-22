import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getCollections } from "@/lib/collections";
import { verifyAdmin } from "@/lib/auth";

type Context = {
    params: { id: string };
};

export async function PATCH(req: NextRequest, { params }: Context) {
    const admin = await verifyAdmin(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { information } = await getCollections();

    await information.updateOne(
        { _id: new ObjectId(params.id) },
        { $set: body }
    );

    return NextResponse.json({ updated: true });
}