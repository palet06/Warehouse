
import { createServer } from "http";
import next from "next";
import { syncJobsAtStartup } from "./lib/serveractions/prismaActions";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  console.log("🚀 Warehouse server başlatılıyor...");

  
  await syncJobsAtStartup();

  createServer((req, res) => {
    handle(req, res);
  }).listen(3000, () => {
    console.log("✅ Warehouse server http://localhost:3000 adresinde çalışıyor.");
  });
});
