import type { Timer } from "../types/timer";

export const infiniteTimer = {
    _id: "infinte",
    name: "Infinite Timer",
    length: 0
};

export function isTimerInfinite(data: Timer | { _id: string }) {
    return data._id === infiniteTimer._id;
}
