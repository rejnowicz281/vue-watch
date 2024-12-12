<script setup lang="ts">
import { computed, ref, watch } from "vue";

import Loading from "@/components/general/Loading.vue";
import EditTimerDialog from "@/components/timers/dialogs/EditTimerDialog.vue";
import Button from "@/components/ui/button/Button.vue";
import { useAsync } from "@/composables/use-async";
import { type Timer } from "@/lib/types/timer";
import { infiniteTimer, isTimerInfinite } from "@/lib/utils/timers";
import timerService from "@/services/timer-service";
import { History } from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";
import DeleteAlertDialog from "./components/DeleteAlertDialog.vue";
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
    <div class="flex-1 flex flex-col" v-else>
        <div class="flex-1 flex flex-col items-center gap-2 justify-center">
            <h1 class="text-4xl font-bold">{{ timer.name }}</h1>
            <TimerFunctionality :timer="timer" />
        </div>
        <div class="flex gap-2 justify-center pb-3">
            <DeleteAlertDialog :id="timer._id" v-if="!isTimerInfinite(timer)" />
            <EditTimerDialog
                v-if="!isTimerInfinite(timer)"
                :initialName="timer.name"
                :initialLength="timer.length"
                :onSuccess="onEditSuccess"
                :_id="timer._id"
            />
            <Button variant="outline" size="icon" :asChild="true">
                <RouterLink :to="`/timers/${id}/history`">
                    <History />
                </RouterLink>
            </Button>
        </div>
    </div>
</template>
