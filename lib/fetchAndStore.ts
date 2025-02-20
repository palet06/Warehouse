import axios from "axios";
import { batchInsert } from "@/lib/batchInsert";
import { createLog } from "./serveractions/prismaActions";

export async function fetchDataAndStore(jobName: string) {
  try {
    console.log("Veri çekme işlemi başladı...");
    await createLog(jobName, "Verileri çekme işlemi başladı", 0);

    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      {
        responseType: "json",
      }
    );

    console.log(`Toplam ${data.length} kayıt çekildi. Kaydediliyor...`);
    await createLog(
      jobName,
      `Toplam ${data.length} kayıt çekildi. Kaydediliyor...`,
      0
    );

    await batchInsert(data);
    console.log("Tüm veri başarıyla kaydedildi!");
    await createLog(jobName, "Tüm veri başarıyla kaydedildi!", data.length);
  } catch (error) {
    console.error("Veri çekme/kaydetme hatası:", error);
    await createLog(jobName, `, işlem yapılırken hata oluştu. ${error}`, 0);
  }
}
