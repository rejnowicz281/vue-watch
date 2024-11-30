import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const sampleTimerHistory = [
    {
        id: "1",
        seconds_passed: 10,
        timer_length: 10,
        note: "a cool note"
    },
    {
        id: "2",
        seconds_passed: 5,
        timer_length: 10,
        note: "half finished"
    },
    {
        id: "3",
        seconds_passed: 5,
        timer_length: 0,
        note: "infint"
    }
];

export const sampleTimers = [
    {
        id: "1",
        length: 10,
        name: "sampleTimer1"
    },
    {
        id: "2",
        length: 20,
        name: "sampleTimer2"
    }
];

// format seconds into format mm:ss
export function formatSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    return `${minutes < 10 ? "0" : ""}${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
}
