<script setup lang="ts">
import Card from "@/components/ui/card/Card.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import { formatSeconds, sampleTimerHistory } from "@/lib/utils/general";
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";

/*

export const sampleTimerHistory = [
    {
        id: "1",
        seconds_passed: 10,
        timer_length: 10,
        note: "a cool note"
    },
    {
        id: "2",
        seconds_passed: 5,
        timer_length: 10,
        note: "half finished"
    }
];

*/

import { useRoute } from "vue-router";

const route = useRoute();

const id = computed(() => route.params.id as string);

const history = ref(sampleTimerHistory);
</script>

<template>
    <div>
        <RouterLink :to="`/timers/${id}`">Back</RouterLink>
        <h1 class="text-4xl font-semibold">Timer History</h1>
        <div class="flex flex-col gap-4">
            <Card v-for="entry in history" :key="entry.id">
                <CardHeader
                    ><CardTitle>{{ entry.note }}</CardTitle>
                    <CardDescription>
                        {{
                            entry.timer_length
                                ? `${formatSeconds(entry.seconds_passed)} / ${formatSeconds(entry.timer_length)}`
                                : `${formatSeconds(entry.seconds_passed)}`
                        }}
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    </div>
</template>
