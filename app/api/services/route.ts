import { NextRequest, NextResponse } from "next/server";
import { getCollections } from "@/lib/collections";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
    const { services } = await getCollections();
    const data = await services.find().toArray();
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    if (!verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { services } = await getCollections();
    const body = await req.json();
    const result = await services.insertOne(body);
    return NextResponse.json(result);
}