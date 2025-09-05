import { verifyAdmin } from "@/lib/auth";
import { getCollections } from "@/lib/collections";
import { getBucket } from "@/lib/gridfs";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { reviews } = await getCollections();
        const bucket = await getBucket();
        const { id } = await params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const query = { _id: new ObjectId(id) };
        const review = await reviews.findOne(query);

        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        // delete associated files (icon + gallery)
        const filesToDelete: string[] = [];
        if (review.image) filesToDelete.push(review.image);

        for (const fileUrl of filesToDelete) {
            try {
                const filename = decodeURIComponent(fileUrl.replace("/api/photos/", ""));
                const files = await bucket.find({ filename }).toArray();
                if (files.length) {
                    await bucket.delete(files[0]._id);
                }
            } catch (err) {
                console.error("File delete failed:", err);
            }
        }

        // finally delete the service document
        await reviews.deleteOne(query);

        return NextResponse.json({ deleted: true });
    } catch (err) {
        console.error("DELETE /testimonial/[id] error:", err);
        return NextResponse.json({ error: "Delete failed", message: String(err) }, { status: 400 });
    }
}