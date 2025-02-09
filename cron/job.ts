import cron from "node-cron";
import { fetchDataAndStore } from "@/lib/fetchAndStore";

cron.schedule("0 0 * * *", async () => {
  console.log("Gece job başladı...");
  await fetchDataAndStore();
  console.log("Job tamamlandı.");
});
