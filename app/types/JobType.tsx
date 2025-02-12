type EventContainer = {
    _events: Record<string, unknown>;
    _eventsCount: number;
  };
  
  type Scheduler = EventContainer & {
    timeMatcher: {
      pattern: string;
      timezone: string;
      expressions: string[];
      dtf: Record<string, unknown>;
    };
  };
  
  type Task = EventContainer;
  
  type JobOptions = {
    scheduled: boolean;
    name: string;
    timezone: string;
  };
  
  type Job = EventContainer & {
    options: JobOptions;
    _task: Task;
    _scheduler: Scheduler;
  };
  
  type JobEntry = [string, Job];
  
  export type JobList = JobEntry[];