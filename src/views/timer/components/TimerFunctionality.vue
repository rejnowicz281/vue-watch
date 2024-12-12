<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import type { Timer } from "@/lib/types/timer";
import { formatSeconds } from "@/lib/utils/general";
import { isTimerInfinite } from "@/lib/utils/timers";
import { CirclePlay, Pause, Play, StopCircle } from "lucide-vue-next";
import { onBeforeUnmount, ref, watch } from "vue";
import EndDialog from "./EndDialog.vue";

const { timer } = defineProps<{
    timer: Timer;
}>();

const seconds = ref(timer.length);

const setStartingSeconds = () => {
    seconds.value = timer.length;
};

const paused = ref(true);
const started = ref(false);

let intervalId: number | null = null;

const dialogVisible = ref(false);

const start = () => {
    started.value = true;
    paused.value = false;
    initInterval();
};

const pause = () => {
    paused.value = true;
    stopInterval();
};

const end = () => {
    initEnd();
    finishEnd();
};

const initEnd = () => {
    paused.value = true;
    dialogVisible.value = true;
    stopInterval();
};

const finishEnd = () => {
    started.value = false;
    dialogVisible.value = false;
    setStartingSeconds();
};

const initInterval = () => {
    if (intervalId === null)
        intervalId = setInterval(() => {
            if (!paused.value) seconds.value = isTimerInfinite(timer) ? seconds.value + 1 : seconds.value - 1;

            if (!isTimerInfinite(timer) && seconds.value <= 0) initEnd();
        }, 1000);
};

const stopInterval = () => {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
};

watch(
    () => timer.length,
    (newLength) => {
        seconds.value = newLength;
    }
);

watch(
    () => timer._id,
    () => end()
);

const handleDialogOpenChange = (open: boolean) => {
    dialogVisible.value = open;
};

onBeforeUnmount(() => {
    stopInterval();
});
</script>

<template>
    <div class="fle flex-col items-center">
        <p class="text-5xl mb-4">{{ formatSeconds(seconds) }}</p>
        <div class="flex justify-center gap-1">
            <template v-if="isTimerInfinite(timer) || seconds >= 1">
                <Button v-if="paused" @click="start">
                    <template v-if="started">
                        <Play />
                    </template>
                    <template v-else>
                        Start
                        <CirclePlay />
                    </template>
                </Button>
                <Button v-else @click="pause">
                    <Pause />
                </Button>
            </template>
            <Button variant="outline" v-if="started" @click="initEnd">
                <StopCircle />
            </Button>
        </div>

        <EndDialog
            v-if="dialogVisible"
            :timer="timer"
            :finishEnd="finishEnd"
            :onOpenChange="handleDialogOpenChange"
            :seconds="seconds"
        />
    </div>
</template>
