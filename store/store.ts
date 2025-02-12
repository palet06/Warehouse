import { create } from "zustand";

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
  createJob: (name:string,time:string,active:boolean) => void;
  removeJob: (id: number) => void;
  // stopJob: (id: number) => void;
  // deleteJob: (id: number) => void;
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
  
  createJob: (name, time, active) => {   
    const id = get().jobs.length + 1;
    const job = { id, name, time, active};
    set((state) => ({
      jobs: [...state.jobs, job],
    }));

    useLogStore.getState().addLog(`✅ Job oluşturuldu: ${name}`);
  },

  removeJob: (id:number) => {
    const jobToRemove = get().jobs.find((job) => job.id === id);
    if (jobToRemove) {
     
      set((state) => ({
        jobs: state.jobs.map((job) => (job.id === id ? { ...job, active: true } : job)),
      }));
      useLogStore.getState().addLog(`🚀 Job başlatıldı: ${id}`);
    }
    //useLogStore.getState().addLog(`🚀 Job başlatıldı: ${id}`);
  },

  
}));


