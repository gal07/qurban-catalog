import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
//#region src/pages/api/delete-image.ts
var delete_image_exports = /* @__PURE__ */ __exportAll({ DELETE: () => DELETE });
var DELETE = async ({ request }) => {
	try {
		const { url, key } = await request.json();
		if (!url && !key) return new Response(JSON.stringify({ message: "URL or Key is required" }), { status: 400 });
		let objectKey = key;
		if (!objectKey && url) try {
			const pathParts = new URL(url).pathname.split("/");
			objectKey = pathParts[pathParts.length - 1];
		} catch (e) {
			console.error("Error parsing URL:", e);
			return new Response(JSON.stringify({ message: "Invalid URL format" }), { status: 400 });
		}
		if (!objectKey) return new Response(JSON.stringify({ message: "Could not determine object key" }), { status: 400 });
		const s3 = new S3Client({
			region: "us-east-1",
			endpoint: void 0,
			credentials: {
				accessKeyId: void 0,
				secretAccessKey: void 0
			},
			forcePathStyle: true
		});
		const command = new DeleteObjectCommand({
			Bucket: void 0,
			Key: objectKey
		});
		await s3.send(command);
		return new Response(JSON.stringify({ message: "Image deleted successfully" }), { status: 200 });
	} catch (error) {
		console.error("Delete error:", error);
		return new Response(JSON.stringify({ message: "Failed to delete image" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/delete-image@_@ts
var page = () => delete_image_exports;
//#endregion
export { page };
