export type Timer = {
    id: string;
    length: number;
    name: string;
};

export type TimerNoId = Omit<Timer, "id">;
