<script setup lang="ts">
import { computed, watch } from "vue";

import Loading from "@/components/general/Loading.vue";
import { useFetch } from "@/composables/use-fetch";
import { type Timer } from "@/lib/types/timer";
import { infiniteTimer } from "@/lib/utils/timers";
import timerService from "@/services/timer-service";
import { useRoute } from "vue-router";
import TimerFunctionality from "./components/TimerFunctionality.vue";

const route = useRoute();

const id = computed(() => route.params.id as string);

const isInfiniteTimer = computed(() => id.value === "infinite" || !id.value);

const { data, error, isLoading, doFetch } = useFetch<Timer>(async () =>
    isInfiniteTimer.value
        ? {
              data: [infiniteTimer]
          }
        : await timerService.getTimer(id.value)
);

watch(id, () => doFetch && doFetch());

const timer = computed(() => (data.value instanceof Array ? data.value[0] : null));
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
        <TimerFunctionality :timerLength="timer.length" :timerId="timer._id" :isInfiniteTimer="isInfiniteTimer" />
    </template>
</template>
