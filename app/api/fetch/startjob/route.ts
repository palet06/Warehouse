
import { startJob } from "@/cron/cronservice";
import { NextResponse } from "next/server";

export async function GET() {
    startJob("denemeJobuLan")
  return NextResponse.json({ message: "Job başlatıldı." });
}
