import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

// Lists images in public/assets/images/gallery so new photos auto-appear in
// the home sliding gallery without code changes.
export const revalidate = 3600;

const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public/assets/images/gallery");
    const files = await readdir(dir);
    const images = files
      .filter((f) => IMAGE_RE.test(f))
      .map((f) => `gallery/${f}`);
    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
