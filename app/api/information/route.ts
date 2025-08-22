import { NextResponse } from "next/server";
import { getCollections } from "@/lib/collections";

export async function GET(req: Request) {

    const { information } = await getCollections();
    const data = await information.find().toArray();
    return NextResponse.json(data);
}