
import {  getLogs } from "@/cron/cronservice";
import { NextResponse } from "next/server";


export async function GET() {
  const nedir = getLogs();
   
  
   return NextResponse.json({  message:nedir });
}
