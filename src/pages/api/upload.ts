import type { APIRoute } from "astro";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const POST: APIRoute = async ({ request }) => {
    console.log("Incoming Request Content-Type:", request.headers.get("content-type"));

    let data;
    try {
        data = await request.formData();
    } catch (e: any) {
        console.error("FormData processing error:", e);
        return new Response(JSON.stringify({
            message: "Failed to process form data",
            error: e.message,
            contentType: request.headers.get("content-type")
        }), { status: 400 });
    }

    const file = data.get("file") as File;

    if (!file) {
        return new Response(JSON.stringify({ message: "No file found" }), {
            status: 400,
        });
    }

    // Validate File Type
    if (!file.type.startsWith("image/")) {
        return new Response(JSON.stringify({ message: "Invalid file type. Only images allowed." }), {
            status: 400,
        });
    }

    try {
        const s3 = new S3Client({
            region: import.meta.env.S3_REGION || "us-east-1",
            endpoint: import.meta.env.S3_ENDPOINT,
            credentials: {
                accessKeyId: import.meta.env.S3_ACCESS_KEY,
                secretAccessKey: import.meta.env.S3_SECRET_KEY,
            },
            forcePathStyle: true, // Required for some S3 compatible providers like MinIO/Cloudhost
        });

        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        // Generate unique filename: timestamp-originalName
        // Generate unique filename: random-uuid.extension
        const ext = file.name.split('.').pop();
        const uniqueName = `${crypto.randomUUID()}.${ext}`;

        const command = new PutObjectCommand({
            Bucket: import.meta.env.S3_BUCKET,
            Key: uniqueName,
            Body: buffer,
            ContentType: file.type,
            ACL: "public-read", // Ensure public access if supported by bucket
        });

        await s3.send(command);

        // Construct Public URL
        // Handle both dedicated domain or endpoint/bucket style
        const publicUrlBase = import.meta.env.S3_PUBLIC_URL || `${import.meta.env.S3_ENDPOINT}/${import.meta.env.S3_BUCKET}`;
        // Ensure no double slashes
        const finalUrl = `${publicUrlBase.replace(/\/$/, "")}/${uniqueName}`;

        return new Response(
            JSON.stringify({
                message: "Upload successful",
                url: finalUrl,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Upload error:", error);
        return new Response(JSON.stringify({ message: "Upload failed" }), {
            status: 500,
        });
    }
};
