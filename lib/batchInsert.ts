import { prisma } from "@/lib/prisma";

const BATCH_SIZE = 10000; // 10.000 kayıtlık işlemler yapacağız

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function batchInsert(data: any[]) {
  const chunks = Array.from({ length: Math.ceil(data.length / BATCH_SIZE) }, (_, i) =>
    data.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE)
  );

  for (const chunk of chunks) {
    await prisma.$transaction(
      chunk.map((item) =>
        prisma.photos.upsert({
          where: { id: item.id },
          update: item,
          create: item,
        })
      )
    );
    console.log(`Batch ${chunks.indexOf(chunk) + 1}/${chunks.length} inserted.`);
  }
}
