import { create } from "zustand";
import cron from "node-cron";

type Log = {
  id: number;
  message: string;
  time: string;
};

type Job = {
  id: number;
  name: string;
  time: string;
  active: boolean;
};

type LogStore = {
  logs: Log[];
  addLog: (message: string) => void;
};

type JobStore = {
  jobs: Job[];
  createJob: (name:string, schedule:string, task:()=>void) => cron.ScheduledTask;
  startJob: (id: number) => void;
  stopJob: (id: number) => void;
  deleteJob: (id: number) => void;
};



const formatTime = () => {
  const now = new Date();
  return now.toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
};






export const useLogStore = create<LogStore>((set) => ({
  logs: [],
  addLog: (message) =>
    set((state) => ({
      logs: [...state.logs, { id: state.logs.length + 1, message, time: formatTime() }],
    })),
}));

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],

  
  
  createJob: (name, schedule, task) => {
   
    const id = get().jobs.length + 1;
    const cronItself = cron.schedule(schedule, task,{scheduled:false,name:name,timezone:"Turkey"});
    const job = { id, name, time: schedule, active: false, cronItself};
    set((state) => ({
      jobs: [...state.jobs, job],
    }));

    useLogStore.getState().addLog(`✅ Job oluşturuldu: ${name}`);
    return cronItself
  },




  startJob: (id) => {
    const jobToStart = get().jobs.find((job) => job.id === id);
    if (jobToStart) {
      jobToStart.cronItself.start();
      set((state) => ({
        jobs: state.jobs.map((job) => (job.id === id ? { ...job, active: true } : job)),
      }));
      useLogStore.getState().addLog(`🚀 Job başlatıldı: ${id}`);
    }
    //useLogStore.getState().addLog(`🚀 Job başlatıldı: ${id}`);
  },

  stopJob: (id) => {

    const jobToStop = get().jobs.find((job) => job.id === id);
    if (jobToStop) {
      jobToStop.cronItself.stop();
      set((state) => ({
        jobs: state.jobs.map((job) => (job.id === id ? { ...job, active: false } : job)),
      }));
      useLogStore.getState().addLog(`🚀 Job Durduruldu: ${id}`);
    }
    //useLogStore.getState().addLog(`🚀 Job Durduruldu: ${id}`);
    
  },

  deleteJob: (id) => {

    const jobToDelete = get().jobs.find((job) => job.id === id);
    if (jobToDelete) {
      jobToDelete.cronItself.stop();

      
      
      
      useLogStore.getState().addLog(`🚀 Job silinemedi ama durduruldu: ${id}`);
    }


    
    
  },
}));


