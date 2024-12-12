<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardFooter from "@/components/ui/card/CardFooter.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import type { HistoryEntry } from "@/lib/types/timer";
import { formatDate } from "@/lib/utils/date";
import { formatSeconds } from "@/lib/utils/general";
import { ref } from "vue";

const { onDelete, entry } = defineProps<{
    entry: HistoryEntry;
    onDelete: (id: string) => Promise<void>;
}>();

const isDeleting = ref(false);

const deleteEntry = async () => {
    isDeleting.value = true;
    await onDelete(entry._id);
    isDeleting.value = false;
};
</script>

<template>
    <Card :key="entry._id">
        <CardHeader
            ><CardTitle>
                {{
                    entry.timerLength
                        ? `${formatSeconds(entry.secondsPassed)} / ${formatSeconds(entry.timerLength)}`
                        : `${formatSeconds(entry.secondsPassed)}`
                }}</CardTitle
            >
            <CardDescription>
                <span>{{ formatDate(entry.createdAt) }}</span>
            </CardDescription>
        </CardHeader>
        <CardContent v-if="entry.note">
            <p>{{ entry.note }}</p>
        </CardContent>
        <CardFooter>
            <Button :disabled="isDeleting" class="w-full" @click="deleteEntry" variant="outline">Delete</Button>
        </CardFooter>
    </Card>
</template>
