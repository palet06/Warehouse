/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import cron from "node-cron";

export async function GET() {
  const anyJobinMemory = cron.getTasks().entries();
  const nedir = anyJobinMemory.toArray();
  if (anyJobinMemory) {
    return NextResponse.json(nedir);
  }
  return NextResponse.json({message:"Job bulunamadı."})
}

export async function POST(req: NextRequest) {
  const { name, time } = await req.json();
  console.log("posttan gelen veriler",name,time)

  try {
    cron.schedule(
      time,
      () => {
        console.log("Task Çalıştı");
      },
      {
        scheduled: false,
        name: name,
        timezone: "Turkey",
      }
    );

    return NextResponse.json({ message: `${name} Job'u hafızada oluşturuldu` });
  } catch (error) {
    return NextResponse.json({ message: "Cron-Job oluşturulken hata oluştu" });
  }
}


