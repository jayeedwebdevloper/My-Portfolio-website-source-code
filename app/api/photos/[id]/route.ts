import { NextRequest, NextResponse } from "next/server";
import { getBucket } from "@/lib/gridfs";
import { verifyAdmin } from "@/lib/auth";

export async function GET(
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const bucket = await getBucket();
        const { id } = await params;
        const decodedId = decodeURIComponent(id);
        // Find file by filename (_id)
        const files = await bucket.find({ filename: decodedId }).toArray();
        if (!files.length) throw new Error("Not found");

        const downloadStream = bucket.openDownloadStreamByName(decodedId);

        return new NextResponse(downloadStream as any, {
            headers: {
                "Content-Type": files[0].contentType || "application/octet-stream",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const bucket = await getBucket();
        const { id } = await params;
        const decodedId = decodeURIComponent(id);

        const files = await bucket.find({ filename: decodedId }).toArray();
        if (!files.length) throw new Error("File not found");

        await bucket.delete(files[0]._id); // delete by ObjectId
        return NextResponse.json({ deleted: true });
    } catch (err) {
        return NextResponse.json({ error: "Delete failed", message: err }, { status: 400 });
    }
}
