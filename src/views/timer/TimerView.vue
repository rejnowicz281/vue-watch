<script setup lang="ts">
import { computed, ref, watch } from "vue";

import Loading from "@/components/general/Loading.vue";
import EditTimerDialog from "@/components/timers/dialogs/EditTimerDialog.vue";
import Button from "@/components/ui/button/Button.vue";
import { useAsync } from "@/composables/use-async";
import { type Timer } from "@/lib/types/timer";
import { infiniteTimer, isTimerInfinite } from "@/lib/utils/timers";
import timerService from "@/services/timer-service";
import { sidebarStore } from "@/store/sidebar";
import { useRoute, useRouter } from "vue-router";
import TimerFunctionality from "./components/TimerFunctionality.vue";

const route = useRoute();

const router = useRouter();

const id = computed(() => route.params.id as string);

const timer = ref<Timer | null>(null);

const { error, isLoading, doFetch } = useAsync(async () => {
    const res = id.value === "infinite" ? { data: [infiniteTimer] } : await timerService.getTimer(id.value);

    if (id.value === "infinite" || res.status === 200) timer.value = res.data[0];
});

watch(id, doFetch);

const onDelete = async () => {
    if (!timer.value) return;

    const res = await timerService.deleteTimer(id.value);

    if (res.status === 200) {
        sidebarStore.setTimers(sidebarStore.timers.filter((timer) => timer._id !== id.value));
        router.push("/timers/infinite");
    }
};

const onEditSuccess = async (newTimer: Timer) => {
    timer.value = newTimer;
};
</script>

<template>
    <Loading v-if="isLoading" />
    <div v-else-if="error">
        <p>{{ error }}</p>
    </div>
    <div v-else-if="!timer">
        <p>Timer not found</p>
    </div>
    <template v-else>
        <RouterLink :to="`/timers/${id}/history`">Go to History</RouterLink>
        <h1 class="text-4xl font-bold">{{ timer.name }}</h1>
        <Button v-if="!isTimerInfinite(timer)" variant="destructive" @click="onDelete"> Delete </Button>
        <EditTimerDialog
            v-if="!isTimerInfinite(timer)"
            :initialName="timer.name"
            :initialLength="timer.length"
            :onSuccess="onEditSuccess"
            :_id="timer._id"
        />
        <TimerFunctionality :timer="timer" />
    </template>
</template>
