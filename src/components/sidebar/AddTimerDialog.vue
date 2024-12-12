<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DialogClose from "@/components/ui/dialog/DialogClose.vue";
import DialogDescription from "@/components/ui/dialog/DialogDescription.vue";
import DialogTrigger from "@/components/ui/dialog/DialogTrigger.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import timerService from "@/services/timer-service";
import { sidebarStore } from "@/store/sidebar";
import { Plus } from "lucide-vue-next";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSidebar } from "../ui/sidebar";

const name = ref("");
const length = ref();
const open = ref(false);
const router = useRouter();

const { state } = useSidebar();

const isSubmitting = ref(false);

const onSubmit = async () => {
    isSubmitting.value = true;

    const res = await timerService.addTimer({
        name: name.value,
        length: length.value
    });

    if (res.status === 200) {
        sidebarStore.setTimers([...sidebarStore.timers, res.data]);
        open.value = false;
        name.value = "";
        length.value = undefined;
        router.push(`/timers/${res.data._id}`);
    }

    isSubmitting.value = false;
};
</script>

<template>
    <Dialog :open="open" @update:open="open = $event">
        <DialogTrigger :as-child="true">
            <Button :variant="state === 'collapsed' ? 'outline' : 'default'" class="mt-2 w-full">
                <Plus />
                <span class="group-data-[collapsible=icon]:hidden">Create Timer</span></Button
            >
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Timer</DialogTitle>
                <DialogDescription>
                    Add a new timer to your collection. Click submit to save the timer.
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
