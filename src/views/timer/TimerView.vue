<script setup lang="ts">
import { computed, watch } from "vue";

import Loading from "@/components/general/Loading.vue";
import Button from "@/components/ui/button/Button.vue";
import { useFetch } from "@/composables/use-fetch";
import { type Timer } from "@/lib/types/timer";
import { infiniteTimer } from "@/lib/utils/timers";
import timerService from "@/services/timer-service";
import { sidebarStore } from "@/store/sidebar";
import { useRoute, useRouter } from "vue-router";
import TimerFunctionality from "./components/TimerFunctionality.vue";

const route = useRoute();

const router = useRouter();

const id = computed(() => route.params.id as string);

const isInfiniteTimer = computed(() => id.value === "infinite" || !id.value);

const { data, error, isLoading, doFetch } = useFetch<Timer[]>(async () =>
    isInfiniteTimer.value
        ? {
              data: [infiniteTimer]
          }
        : await timerService.getTimer(id.value)
);

watch(id, () => doFetch && doFetch());

const timer = computed(() => (data.value instanceof Array ? data.value[0] : null));

const onDelete = async () => {
    if (!data.value) return;

    const res = await timerService.deleteTimer(id.value);

    if (res.status === 200) {
        sidebarStore.setTimers(sidebarStore.timers.filter((timer) => timer._id !== id.value));
        router.push("/timers/infinite");
    }
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
        <Button v-if="!isInfiniteTimer" variant="destructive" @click="onDelete"> Delete </Button>
        <TimerFunctionality :timerLength="timer.length" :timerId="timer._id" :isInfiniteTimer="isInfiniteTimer" />
    </template>
</template>
