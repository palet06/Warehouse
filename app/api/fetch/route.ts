import { fetchDataAndStore } from "@/lib/fetchAndStore";
import { createJob } from "@/cron/cronservice";
import { NextResponse } from "next/server";

export async function GET() {
  createJob("denemeJobuLan","*/1 * * * *",fetchDataAndStore)
  return NextResponse.json({ message: "Job başlatıldı." });
}
