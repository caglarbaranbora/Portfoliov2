import { NextResponse } from "next/server";
import { fetchApps } from "@/lib/appStore";

// Returns published App Store apps for the work page.
export const revalidate = 86400;

export async function GET() {
  const apps = await fetchApps();
  return NextResponse.json({ apps });
}
