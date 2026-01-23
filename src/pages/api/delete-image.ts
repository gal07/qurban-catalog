import type { APIRoute } from "astro";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const DELETE: APIRoute = async ({ request }) => {
    try {
        const { url, key } = await request.json();

        if (!url && !key) {
            return new Response(JSON.stringify({ message: "URL or Key is required" }), { status: 400 });
        }

        let objectKey = key;

        // If URL is provided, try to extract the key
        // Assuming URL format: https://endpoint/bucket/KEY
        // or https://custom-domain/KEY
        if (!objectKey && url) {
            try {
                const urlObj = new URL(url);
                const pathParts = urlObj.pathname.split('/');

                // If the URL contains bucket name in path (like MinIO/R2 sometimes), handling might vary.
                // Based on upload.ts: `${publicUrlBase.replace(/\/$/, "")}/${uniqueName}`
                // If publicUrlBase has bucket name, we just need the last part.

                // Simple heuristic: take the last segment as the key
                objectKey = pathParts[pathParts.length - 1];
            } catch (e) {
                console.error("Error parsing URL:", e);
                return new Response(JSON.stringify({ message: "Invalid URL format" }), { status: 400 });
            }
        }

        if (!objectKey) {
            return new Response(JSON.stringify({ message: "Could not determine object key" }), { status: 400 });
        }

        const s3 = new S3Client({
            region: import.meta.env.S3_REGION || "us-east-1",
            endpoint: import.meta.env.S3_ENDPOINT,
            credentials: {
                accessKeyId: import.meta.env.S3_ACCESS_KEY,
                secretAccessKey: import.meta.env.S3_SECRET_KEY,
            },
            forcePathStyle: true
        });

        const command = new DeleteObjectCommand({
            Bucket: import.meta.env.S3_BUCKET,
            Key: objectKey,
        });

        await s3.send(command);

        return new Response(JSON.stringify({ message: "Image deleted successfully" }), { status: 200 });

    } catch (error) {
        console.error("Delete error:", error);
        return new Response(JSON.stringify({ message: "Failed to delete image" }), { status: 500 });
    }
};
