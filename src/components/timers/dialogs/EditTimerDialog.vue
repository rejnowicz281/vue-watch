<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DialogClose from "@/components/ui/dialog/DialogClose.vue";
import DialogDescription from "@/components/ui/dialog/DialogDescription.vue";
import DialogTrigger from "@/components/ui/dialog/DialogTrigger.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import type { Timer } from "@/lib/types/timer";
import timerService from "@/services/timer-service";
import { sidebarStore } from "@/store/sidebar";
import { Edit } from "lucide-vue-next";
import { ref } from "vue";

const { initialName, initialLength, _id, onSuccess } = defineProps<{
    _id: string;
    initialName: string;
    initialLength: number | undefined;
    onSuccess: (timer: Timer) => void;
}>();

const name = ref(initialName);
const length = ref(initialLength);
const open = ref(false);

const isSubmitting = ref(false);

const onSubmit = async () => {
    isSubmitting.value = true;
    const res = await timerService.editTimer({
        _id,
        name: name.value,
        length: length.value as number
    });

    if (res.status === 200) {
        sidebarStore.editTimer(res.data);
        onSuccess(res.data);
        open.value = false;
    }

    isSubmitting.value = false;
};
</script>

<template>
    <Dialog :open="open" @update:open="open = $event">
        <DialogTrigger :as-child="true">
            <Button variant="outline" size="icon"><Edit /></Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Timer</DialogTitle>
                <DialogDescription>
                    Edit the timer's name and length. Click submit to save the changes.
                </DialogDescription>
            </DialogHeader>
            <form @submit.prevent="onSubmit" class="grid gap-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" class="text-right">Name</Label>
                    <Input
                        v-model="name"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Timer name"
                        class="col-span-3"
                    />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="length" class="text-right">Length</Label>
                    <Input
                        v-model="length"
                        type="number"
                        id="length"
                        name="length"
                        placeholder="Length in seconds"
                        class="col-span-3"
                    />
                </div>

                <DialogFooter>
                    <DialogClose type="button" variant="outline" :as-child="true">
                        <Button>Cancel</Button>
                    </DialogClose>
                    <Button :disabled="isSubmitting">Submit</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
