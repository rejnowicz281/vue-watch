<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { formatSeconds, sampleTimers } from "@/lib/utils/general";
import EndDialog from "@/views/timer/components/EndDialog.vue";
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
            if (!paused.value) seconds.value = isInfiniteTimer.value ? seconds.value + 1 : seconds.value - 1;

            if (!isInfiniteTimer.value && seconds.value <= 0) initEnd();
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

const handleDialogOpenChange = (open: boolean) => {
    dialogVisible.value = open;
};

onBeforeUnmount(() => {
    stopInterval();
});
</script>

<template>
    <div>
        <RouterLink :to="`/timers/${id}/history`">Go to History</RouterLink>
        <h1 class="text-4xl font-bold">{{ timer.name }}</h1>
        <p>{{ formatSeconds(seconds) }}</p>
        <template v-if="isInfiniteTimer || seconds >= 1">
            <Button v-if="paused" @click="start">{{ started ? "Resume" : "Start" }}</Button>
            <Button v-else @click="pause">Pause</Button>
        </template>
        <Button variant="outline" v-if="started" @click="initEnd">End</Button>

        <EndDialog
            v-if="dialogVisible"
            :finishEnd="finishEnd"
            :onOpenChange="handleDialogOpenChange"
            :isInfiniteTimer="isInfiniteTimer"
            :seconds="seconds"
            :timerLength="timer.length"
        />
    </div>
</template>
