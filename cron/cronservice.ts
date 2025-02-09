/* eslint-disable @typescript-eslint/no-explicit-any */
import cron from "node-cron";


// Zamanlayıcıları saklamak için bir nesne
export const jobs = {};

// Logları tutacak bir dizi
export const logs:any[] = [];


const logAction = (message:string) => {
    const timestamp = new Date().toISOString();
    logs.push(`[${timestamp}] ${message}`);
    console.log(`[${timestamp}] ${message}`);
};

export function createJob(name, schedule:string, task:()=>void) {
    if (jobs[name]) {
        logAction(`Job '${name}' zaten mevcut.`);
        return false;
    }
    
    const job = cron.schedule(schedule, task, { scheduled: false });
    jobs[name] = job;
    logAction(`Job '${name}' oluşturuldu.`);
    return true;
}

export function startJob(name) {
    if (!jobs[name]) {
        logAction(`Job '${name}' bulunamadı.`);
        return false;
    }
    
    
    jobs[name].start();
    logAction(`Job '${name}' başlatıldı.`);
    return true;
}

export function stopJob(name) {
    if (!jobs[name]) {
        logAction(`Job '${name}' bulunamadı.`);
        return false;
    }
    
    jobs[name].stop();
    logAction(`Job '${name}' durduruldu.`);
    return true;
}

export function deleteJob(name) {
    if (!jobs[name]) {
        logAction(`Job '${name}' bulunamadı.`);
        return false;
    }
    
    jobs[name].stop();
    delete jobs[name];
    logAction(`Job '${name}' silindi.`);
    return true;
}

export function getLogs() {
    return logs;
}
export function setLogs(message:string) {
    logs.push(message)
}


