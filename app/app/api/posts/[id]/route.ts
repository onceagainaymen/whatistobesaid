import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

export async function GET(req: NextRequest) {
  try {
    const id = req.json();
  } catch (e) {}
}
