<script setup lang="ts">
import { formatSeconds, sampleTimer } from "@/lib/utils";
import { ref } from "vue";

const props = defineProps<{
    id: string;
}>();

const id = props.id;

const isInfiniteTimer = id === "infinite";

const timer = isInfiniteTimer ? null : ref(sampleTimer);

const timerName = timer ? timer.value.name : "Infinite Timer";

const startingSeconds = timer ? timer.value.length : 0;

const seconds = ref(startingSeconds);

const setStartingSeconds = () => {
    seconds.value = startingSeconds;
};

const paused = ref(true);
const started = ref(false);

let intervalId: number | null = null;

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
    started.value = false;
    paused.value = true;
    setStartingSeconds();
    stopInterval();
};

const initInterval = () => {
    if (intervalId === null)
        intervalId = setInterval(() => {
            if (!paused.value) seconds.value = isInfiniteTimer ? seconds.value + 1 : seconds.value - 1;

            if (!isInfiniteTimer && seconds.value < 0) end();
        }, 1000);
};

const stopInterval = () => {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
};
</script>

<template>
    <main>
        <h1>Timer {{ timerName }}</h1>
        <p>Seconds: {{ formatSeconds(seconds) }}</p>
        <button v-if="paused" @click="start">{{ started ? "Resume" : "Start" }}</button>
        <button v-else @click="pause">Pause</button>
        <button v-if="started" @click="end">End</button>
    </main>
</template>
