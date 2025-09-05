import { verifyAdmin } from "@/lib/auth";
import { getCollections } from "@/lib/collections";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const { reviews } = await getCollections();
    const data = await reviews.find().toArray();
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    if (!verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reviews } = await getCollections();
    const body = await req.json();
    const result = await reviews.insertOne(body);
    return NextResponse.json(result);
}