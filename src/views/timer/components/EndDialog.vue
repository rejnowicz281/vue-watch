<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DialogClose from "@/components/ui/dialog/DialogClose.vue";
import DialogDescription from "@/components/ui/dialog/DialogDescription.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import type { Timer } from "@/lib/types/timer";
import { formatSeconds } from "@/lib/utils/general";
import { isTimerInfinite } from "@/lib/utils/timers";
import timerHistoryService from "@/services/timer-history-service";
import { computed, ref } from "vue";

const { onOpenChange, seconds, timer, finishEnd } = defineProps<{
    onOpenChange: (open: boolean) => void;
    finishEnd: () => void;
    seconds: number;
    timer: Timer;
}>();

const note = ref("");

const secondsPassed = computed(() => timer.length - seconds);

const onSubmit = () => {
    timerHistoryService.addTimerHistoryEntry({
        timer: timer._id,
        note: note.value,
        secondsPassed: isTimerInfinite(timer) ? seconds : secondsPassed.value,
        timerLength: timer.length
    });

    finishEnd();
};
</script>

<template>
    <Dialog :open="true" @update:open="onOpenChange">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>End Countdown</DialogTitle>
                <DialogDescription>
                    Click End to end the timer countdown. You can also add a note to the timer history.
                </DialogDescription>
            </DialogHeader>
            <form @submit.prevent="onSubmit" class="grid gap-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="note" class="text-right">Note</Label>
                    <Input
                        v-model="note"
                        type="text"
                        id="note"
                        name="note"
                        placeholder="(Optional)"
                        class="col-span-3"
                    />
                </div>

                <DialogFooter>
                    <DialogClose type="button" variant="outline" :as-child="true">
                        <Button>Cancel</Button>
                    </DialogClose>
                    <Button>
                        End ({{
                            isTimerInfinite(timer)
                                ? formatSeconds(seconds)
                                : `${formatSeconds(secondsPassed)} / ${formatSeconds(timer.length)}`
                        }})
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
