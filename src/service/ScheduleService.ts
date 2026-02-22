export class ScheduleService {
    private intervalId: NodeJS.Timeout | null = null;
    private readonly ONE_HOUR_MS = 60 * 60 * 1000;
    private readonly interval: number;
    private readonly task: () => Promise<void>;

    constructor(task: () => Promise<void>, interval?: number) {
        this.task = task;
        this.interval = interval ?? this.ONE_HOUR_MS;
    }

    start() {
        // Skip if scheduler is running
        if (this.intervalId) return;

        console.log(`Set interval ${this.interval}ms`);

        // Run task immediately
        console.log("Running task for the first time");
        this.task().catch(console.error);

        this.intervalId = setInterval(() => {
            console.log("Running scheduled task");
            this.task().catch(console.error);
        }, this.interval);
    }

    stop() {
        // To stop scheduled task
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log("Scheduler stopped");
        }
    }
}
