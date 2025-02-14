/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchDataAndStore } from "@/lib/fetchAndStore";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import cron from "node-cron";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { action, schedule, name } = await req.json();

  switch (action) {
    case "create":
      try {
        const existingJob = await prisma.job.findFirst({
          where: { name },
        });

        if (existingJob) {
          return NextResponse.json({
            success: false,
            message: `${name} isimli Job zaten mevcut. Lütfen başka bir isim seçin`,
          });
        }

        await prisma.job.create({
          data: { schedule, name, isRunning: false },
        });
        return NextResponse.json({
          success: true,
          message: `${name} isimli Job oluşturuldu.`,
        });
      } catch (error) {
        return NextResponse.json({
          success: false,
          message: `${name} isimli Job oluşturulurken hata oluştu..`,
        });
      }

    case "start":
      try {
        const jobToStart = await prisma.job.findUnique({ where: { name } });
        if (jobToStart && !jobToStart.isRunning) {
          cron.schedule(
            jobToStart.schedule,
            () => {
              //fetchDataAndStore();
              console.log(`${name} isimli job tetiklendi `)
            },
            { name: jobToStart.name, timezone: "Turkey" }
          );
          await prisma.job.update({
            where: { name },
            data: { isRunning: true },
          });
          return NextResponse.json({
            success: true,
            message: `${name} isimli Job başlatıldı.`,
          });
        }
      } catch (error) {
        return NextResponse.json({
          success: false,
          message: `${name} isimli Job başlatılırken hata oluştu. Hata: ${error}`,
        });
      }

    case "stop":
      try {
        const jobToStop = await prisma.job.findUnique({ where: { name } });
        if (jobToStop && jobToStop.isRunning) {
          const cronJob = cron.getTasks().get(`job_${name}`);
          if (cronJob) {
            cronJob.stop();
          }
          await prisma.job.update({
            where: { name },
            data: { isRunning: false },
          });
          return NextResponse.json({
            success: true,
            message: `${name} isimli Job durduruldu.`,
          });
        }
      } catch (error) {
        return NextResponse.json({
          success: false,
          message: `${name} isimli Job durdurulurken hata oluştu. Hata: ${error}`,
        });
      }

    case "delete":
      try {
        const jobToDelete = await prisma.job.findUnique({ where: { name } });
        if (jobToDelete) {
          if (jobToDelete.isRunning) {
            const cronJob = cron.getTasks().get(`job_${name}`);
            if (cronJob) {
              cronJob.stop();
              cron.getTasks().delete(`job_${name}`);
            }
          }
          await prisma.job.delete({ where: { name } });
          return NextResponse.json({
            success: true,
            message: `${name} islimli Job silindi.`,
          });
        }
      } catch (error) {
        return NextResponse.json({
          success: false,
          message: `${name} isimli Job silinirken hata oluştu. Hata: ${error}`,
        });
      }

    default:
      return NextResponse.json({ sccess: false, message: "Geçersiz işlem." });
  }
}
