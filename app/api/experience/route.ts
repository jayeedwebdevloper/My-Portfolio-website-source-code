import { NextResponse } from "next/server";
import { getCollections } from "@/lib/collections";

export async function GET() {
    const { experience } = await getCollections();
    const data = await experience.find().toArray();
    return NextResponse.json(data);
}