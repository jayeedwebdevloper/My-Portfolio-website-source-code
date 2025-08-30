import { NextRequest, NextResponse } from "next/server";
import { getCollections } from "@/lib/collections";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
    const { projects } = await getCollections();
    const data = await projects.find().toArray();
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    if (!verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projects } = await getCollections();
    const body = await req.json();
    const result = await projects.insertOne(body);
    return NextResponse.json(result);
}