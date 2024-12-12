<script setup lang="ts">
import Loading from "@/components/general/Loading.vue";
import Button from "@/components/ui/button/Button.vue";
import { useFetch } from "@/composables/use-fetch";
import type { HistoryEntry } from "@/lib/types/timer";
import timerHistoryService from "@/services/timer-history-service";
import { computed, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import EntryCard from "./components/EntryCard.vue";

const route = useRoute();

const id = computed(() => route.params.id as string);

const { data, error, isLoading, doFetch } = useFetch<HistoryEntry[]>(
    async () => await timerHistoryService.getTimerHistory(id.value === "infinite" ? "infinite" : id.value)
);

watch(id, doFetch);

const onDelete = async (id: string) => {
    if (!data.value) return;

    const res = await timerHistoryService.deleteHistoryEntry(id);

    if (res.status === 200) data.value = data.value.filter((entry) => entry._id !== id);
};
</script>

<template>
    <Loading v-if="isLoading" />
    <div v-else-if="error">
        <p>{{ error }}</p>
    </div>
    <div v-else-if="!data">
        <p>Timer history not found</p>
    </div>
    <div class="flex-1 flex flex-col items-center gap-4" v-else>
        <h1 class="text-4xl font-semibold">Timer History</h1>
        <div class="flex-1 flex flex-col gap-4">
            <EntryCard :entry="entry" :onDelete="onDelete" v-for="entry in data" />
        </div>
        <div class="flex gap-2 justify-center pb-3">
            <Button :as-child="true" variant="outline">
                <RouterLink :to="`/timers/${id}`">Go Back</RouterLink>
            </Button>
        </div>
    </div>
</template>
