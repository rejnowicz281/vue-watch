export type Timer = {
    _id: string;
    length: number;
    name: string;
};

export type TimerNoId = Omit<Timer, "_id">;
