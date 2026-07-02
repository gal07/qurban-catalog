import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
//#region src/pages/api/upload.ts
var upload_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	console.log("Incoming Request Content-Type:", request.headers.get("content-type"));
	let data;
	try {
		data = await request.formData();
	} catch (e) {
		console.error("FormData processing error:", e);
		return new Response(JSON.stringify({
			message: "Failed to process form data",
			error: e.message,
			contentType: request.headers.get("content-type")
		}), { status: 400 });
	}
	const file = data.get("file");
	if (!file) return new Response(JSON.stringify({ message: "No file found" }), { status: 400 });
	if (!file.type.startsWith("image/")) return new Response(JSON.stringify({ message: "Invalid file type. Only images allowed." }), { status: 400 });
	try {
		const s3 = new S3Client({
			region: "us-east-1",
			endpoint: void 0,
			credentials: {
				accessKeyId: void 0,
				secretAccessKey: void 0
			},
			forcePathStyle: true
		});
		const arrayBuffer = await file.arrayBuffer();
		const buffer = new Uint8Array(arrayBuffer);
		const ext = file.name.split(".").pop();
		const uniqueName = `${crypto.randomUUID()}.${ext}`;
		const command = new PutObjectCommand({
			Bucket: void 0,
			Key: uniqueName,
			Body: buffer,
			ContentType: file.type,
			ACL: "public-read"
		});
		await s3.send(command);
		const finalUrl = `${`undefined/undefined`.replace(/\/$/, "")}/${uniqueName}`;
		return new Response(JSON.stringify({
			message: "Upload successful",
			url: finalUrl,
			key: uniqueName
		}), { status: 200 });
	} catch (error) {
		console.error("Upload error:", error);
		return new Response(JSON.stringify({ message: "Upload failed" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/upload@_@ts
var page = () => upload_exports;
//#endregion
export { page };
