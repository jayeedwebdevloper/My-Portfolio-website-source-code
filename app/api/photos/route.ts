import { NextRequest, NextResponse } from "next/server";
import { getBucket } from "@/lib/gridfs";
import { verifyAdmin } from "@/lib/auth";

export async function POST(req: NextRequest): Promise<Response> {
    const admin = await verifyAdmin(req); // ✅ also await this if it's async
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bucket = await getBucket();

    // Create custom filename-id
    const timestamp = Date.now();
    const cleanName = file.name.replace(/\s+/g, "_"); // replace spaces with _
    const customId = `${cleanName}-${timestamp}`;

    const uploadStream = bucket.openUploadStream(customId, {
        contentType: file.type,
        metadata: { originalName: file.name },
    });

    const arrayBuffer = await file.arrayBuffer();
    uploadStream.end(Buffer.from(arrayBuffer));

    // ✅ Explicitly Promise<Response>
    return new Promise<Response>((resolve, reject) => {
        uploadStream.on("finish", () => {
            resolve(
                NextResponse.json({
                    id: customId,
                    url: `/api/photos/${encodeURIComponent(customId)}`,
                })
            );
        });
        uploadStream.on("error", (err) => {
            reject(
                NextResponse.json({ error: "Upload failed", details: String(err) }, { status: 500 })
            );
        });
    });
}