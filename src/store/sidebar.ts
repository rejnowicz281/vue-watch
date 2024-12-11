import type { Timer } from "@/lib/types/timer";
import { reactive } from "vue";

export const sidebarStore = reactive({
    timers: [] as Timer[],
    setTimers(timers: Timer[]) {
        sidebarStore.timers = timers;
    },
    editTimer(timer: Timer) {
        const index = sidebarStore.timers.findIndex((t) => t._id === timer._id);

        sidebarStore.timers[index] = timer;
    }
});
