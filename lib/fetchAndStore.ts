
import axios from "axios";
import { batchInsert } from "@/lib/batchInsert";



export async function fetchDataAndStore() {
  try {
    console.log("Veri çekme işlemi başladı...");
    
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/photos", {
      responseType: "json",
    });

    console.log(`Toplam ${data.length} kayıt çekildi. Kaydediliyor...`);
    
    await batchInsert(data);
    
    console.log("Tüm veri başarıyla kaydedildi!");

  } catch (error) {
    console.error("Veri çekme/kaydetme hatası:", error);
  }
}
