/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchDataAndStore } from "@/lib/fetchAndStore";
import { NextRequest, NextResponse } from "next/server";
import cron from "node-cron";
import { prisma } from "@/lib/prisma";
import { createLog } from "@/lib/serveractions/prismaActions";


export async function POST(req: NextRequest) {
  const { action, schedule, name } = await req.json();

  switch (action) {
    case "create":
      try {
        const existingJob = await prisma.job.findFirst({
          where: { name },
        });
        const existingTime = await prisma.job.findFirst({
          where: { schedule },
        });

        if (existingJob) {
          return NextResponse.json({
            success: false,
            message: `${name} isimli Job zaten mevcut. Lütfen başka bir isim seçin`,
          });
        }
        if (existingTime) {
          return NextResponse.json({
            success: false,
            message: `Aynı çalışma saatine sahip başka bir Job var. Lütfen başka bir saat seçin`,
          });
        }

        

        await prisma.job.create({
          data: { schedule, name, isRunning: false },
        }); //Veritabanında jobu oluşturuyoruz. Henüz hafızada yok. Start edilince hafızada oluşturulacak.

        await createLog(name, "Job Oluşturuldu", 0);
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
            async () => {
              await fetchDataAndStore(name);
              
              //console.log(`${name} isimli job tetiklendi `);
             
            },
            { name: jobToStart.name, timezone: "Turkey" }
          );
          await prisma.job.update({
            where: { name },
            data: { isRunning: true },
          });
          await createLog(name, "Job Aktif Hale Getirildi", 0);
          return NextResponse.json({
            success: true,
            message: `${name} isimli Job aktif hale getirildi.`,
          });
        }
      } catch (error) {
        return NextResponse.json({
          success: false,
          message: `${name} isimli Job aktif hale getirilirken hata oluştu. Hata: ${error}`,
        });
      }

    case "stop":
      try {
        const jobToStop = await prisma.job.findUnique({ where: { name } });
        if (jobToStop && jobToStop.isRunning) {
          const cronJob = cron.getTasks().get(name);
          if (cronJob) {
            cronJob.stop();
          }
          await prisma.job.update({
            where: { name },
            data: { isRunning: false },
          });
          await createLog(name, "Job pasif hale getirildi.", 0);
          return NextResponse.json({
            success: true,
            message: `${name} isimli Job durduruldu ve pasif hale getirildi.`,
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
            const cronJob = cron.getTasks().get(name);
            if (cronJob) {
              cronJob.stop();
              cron.getTasks().delete(name);
            }
          }
          await prisma.job.delete({ where: { name } });
          await createLog(name, "Job durduruldu ve silindi.", 0);
          return NextResponse.json({
            success: true,
            message: `${name} islimli Job durduruldu ve silindi.`,
          });
        }
      } catch (error) {
        return NextResponse.json({
          success: false,
          message: `${name} isimli Job silinirken hata oluştu. Hata: ${error}`,
        });
      }

    case "getall":
      try {
        const allJobs = await prisma.job.findMany();

        return NextResponse.json({
          success: true,
          allJobs: allJobs,
        });
      } catch (error) {
        return NextResponse.json({
          success: false,
          message: `Job'lar alınırken hata oluştu`,
        });
      }

    default:
      return NextResponse.json({ sccess: false, message: "Geçersiz işlem." });
  }
}
