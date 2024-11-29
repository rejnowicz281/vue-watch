<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { formatSeconds, sampleTimers } from "@/lib/utils";
import { computed, onBeforeUnmount, ref, watch } from "vue";

import { useRoute } from "vue-router";

const route = useRoute();

const id = computed(() => route.params.id as string);

const isInfiniteTimer = computed(() => id.value === "infinite" || !id.value);

let timer = computed(() => {
    const infiniteTimer = {
        id: "infinite",
        name: "Infinite Timer",
        length: 0
    };

    const findTimer = sampleTimers.find((timer) => timer.id === id.value);

    const timer = isInfiniteTimer.value ? infiniteTimer : findTimer || infiniteTimer;

    return timer;
});

const seconds = ref(timer.value.length);

const setStartingSeconds = () => {
    seconds.value = timer.value.length;
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
    started.value = false;
    paused.value = true;
    setStartingSeconds();
    stopInterval();
    dialogVisible.value = true;
};

const initInterval = () => {
    if (intervalId === null)
        intervalId = setInterval(() => {
            if (!paused.value) seconds.value = isInfiniteTimer.value ? seconds.value + 1 : seconds.value - 1;

            if (!isInfiniteTimer.value && seconds.value < 0) end();
        }, 1000);
};

const stopInterval = () => {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
};

watch(
    () => id.value,
    () => end()
);

onBeforeUnmount(() => stopInterval());
</script>

<template>
    <div>
        <h1>Timer {{ timer.name }}</h1>
        <p>{{ formatSeconds(seconds) }}</p>
        <Button v-if="paused" @click="start">{{ started ? "Resume" : "Start" }}</Button>
        <Button v-else @click="pause">Pause</Button>
        <Button variant="outline" v-if="started" @click="end">End</Button>
    </div>
</template>
