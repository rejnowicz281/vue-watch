import type { Timer } from "@/lib/types/timer";
import { reactive } from "vue";

export const sidebarStore = reactive({
    timers: [] as Timer[],
    setTimers(timers: Timer[]) {
        sidebarStore.timers = timers;
    }
});
