export type Watch = {
    id: string;
    length: number;
    name: string;
};

export type WatchNoId = Omit<Watch, "id">;
