<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { formatSeconds } from "@/lib/utils/general";
import { onBeforeUnmount, ref, watch } from "vue";
import EndDialog from "./EndDialog.vue";

const { timerLength, timerId, isInfiniteTimer } = defineProps<{
    timerLength: number;
    timerId?: string;
    isInfiniteTimer: boolean;
}>();

const seconds = ref(timerLength);

const setStartingSeconds = () => {
    seconds.value = timerLength;
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
            if (!paused.value) seconds.value = isInfiniteTimer ? seconds.value + 1 : seconds.value - 1;

            if (!isInfiniteTimer && seconds.value <= 0) initEnd();
        }, 1000);
};

const stopInterval = () => {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
};

watch(
    () => timerId,
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
            :timerLength="timerLength"
        />
    </div>
</template>
