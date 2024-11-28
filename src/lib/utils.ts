export const sampleTimerHistory = [
    {
        id: 1,
        seconds_passed: 10,
        timer_length: 10,
        note: "a cool note"
    },
    {
        id: 2,
        seconds_passed: 5,
        timer_length: 10,
        note: "half finished"
    }
];

export const sampleTimer = {
    id: 123,
    length: 10,
    name: "sampleTimer"
};

// format seconds into format mm:ss
export function formatSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    return `${minutes < 10 ? "0" : ""}${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
}
