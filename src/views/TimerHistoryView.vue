<script setup lang="ts">
import Loading from "@/components/general/Loading.vue";
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardFooter from "@/components/ui/card/CardFooter.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import { useFetch } from "@/composables/use-fetch";
import type { HistoryEntry } from "@/lib/types/timer";
import { formatSeconds } from "@/lib/utils/general";
import timerHistoryService from "@/services/timer-history-service";
import { computed, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

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
    <div v-else>
        <RouterLink :to="`/timers/${id}`">Back</RouterLink>
        <h1 class="text-4xl font-semibold">Timer History</h1>
        <div class="flex flex-col gap-4">
            <Card v-for="entry in data" :key="entry._id">
                <CardHeader
                    ><CardTitle>{{ entry.note }}</CardTitle>
                    <CardDescription>
                        {{
                            entry.timerLength
                                ? `${formatSeconds(entry.secondsPassed)} / ${formatSeconds(entry.timerLength)}`
                                : `${formatSeconds(entry.secondsPassed)}`
                        }}
                    </CardDescription>
                    <CardFooter>
                        <Button @click="onDelete(entry._id)" variant="outline" size="sm">Delete</Button>
                        <p>{{ entry.createdAt }}</p>
                    </CardFooter>
                </CardHeader>
            </Card>
        </div>
    </div>
</template>
