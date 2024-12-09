export type Timer = {
    _id: string;
    length: number;
    name: string;
    createdAt: string;
};

export type TimerNoId = Omit<Timer, "_id">;

export type HistoryEntry = {
    _id: string;
    timer?: string;
    secondsPassed: number;
    timerLength?: number;
    note?: string;
    createdAt: string;
};

export type HistoryEntryNoId = Omit<HistoryEntry, "_id">;
