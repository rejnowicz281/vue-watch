<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DialogClose from "@/components/ui/dialog/DialogClose.vue";
import DialogDescription from "@/components/ui/dialog/DialogDescription.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import { formatSeconds } from "@/lib/utils/general";
import { computed } from "vue";

const { onOpenChange, seconds, timerLength, isInfiniteTimer } = defineProps<{
    onOpenChange: (open: boolean) => void;
    finishEnd: () => void;
    seconds: number;
    timerLength: number;
    isInfiniteTimer: boolean;
}>();

const secondsPassed = computed(() => timerLength - seconds);
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
            <form @submit.prevent="finishEnd" className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="note" className="text-right">Note</Label>
                    <Input type="text" id="note" name="note" placeholder="(Optional)" class="col-span-3" />
                </div>

                <DialogFooter>
                    <DialogClose type="button" variant="outline" :as-child="true">
                        <Button>Cancel</Button>
                    </DialogClose>
                    <Button>
                        End ({{
                            isInfiniteTimer
                                ? formatSeconds(seconds)
                                : `${formatSeconds(secondsPassed)} / ${formatSeconds(timerLength)}`
                        }})
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
