import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") as "draft" | "published";
    const image = formData.get("image") as File | null;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 },
      );
    }

    let imagePath = null;
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${crypto.randomUUID()}-${path.extname(image.name)}`;
      const filepath = path.join(process.cwd(), "public", "uploads", filename);
      await mkdir(path.join(process.cwd(), "public", "uploads"), {
        recursive: true,
      });
      await writeFile(filepath, buffer);
      imagePath = `/uploads/${filename}`;
    }

    const res = await db.insert(posts).values({
      title: title,
      content: content,
      status: status,
      user_id: id,
      image_path: imagePath,
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}

// THE INDEX ALGORITHM
export async function GET(req: NextRequest) {
  try {
    const result = await db
      .select()
      .from(posts)
      .where(eq(posts.status, "published"));
    return NextResponse.json({ result }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
