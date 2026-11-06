import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { rateLimited, sameOrigin } from "@/lib/email/guard";

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};
/** File signatures: PDF starts with "%PDF", DOCX is a zip ("PK"), DOC is an OLE file (D0 CF 11 E0). */
const MAGIC: Record<string, number[]> = { pdf: [0x25, 0x50, 0x44, 0x46], docx: [0x50, 0x4b], doc: [0xd0, 0xcf, 0x11, 0xe0] };

const safe = (v: string, max: number) => v.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^[-.]+/, "").slice(0, max) || "file";

export async function POST(request: NextRequest) {
  try {
    if (!sameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (rateLimited(request, 5)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    if (
      !process.env.AWS_REGION ||
      !process.env.AWS_ACCESS_KEY_ID ||
      !process.env.AWS_SECRET_ACCESS_KEY ||
      !process.env.AWS_S3_BUCKET_NAME
    ) {
      console.error("Missing AWS environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const jobId = formData.get("jobId");

    if (!(file instanceof File) || !file.size) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File is larger than 5 MB" }, { status: 400 });
    }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!TYPES[ext] || !MAGIC[ext].every((b, i) => buffer[i] === b)) {
      return NextResponse.json({ error: "Please upload a PDF or Word document" }, { status: 400 });
    }

    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const fileName = `uploads/${safe(String(jobId ?? ""), 64)}/${randomUUID()}-${safe(file.name, 100)}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: TYPES[ext],
      })
    );

    const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
