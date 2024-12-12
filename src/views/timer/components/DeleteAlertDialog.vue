<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import Button from "@/components/ui/button/Button.vue";

import timerService from "@/services/timer-service";
import { sidebarStore } from "@/store/sidebar";
import { Trash } from "lucide-vue-next";
import { useRouter } from "vue-router";

const { id } = defineProps<{
    id: string;
}>();

const router = useRouter();

const onDelete = async () => {
    const res = await timerService.deleteTimer(id);

    if (res.status === 200) {
        sidebarStore.setTimers(sidebarStore.timers.filter((timer) => timer._id !== id));
        router.push("/timers/infinite");
    }
};
</script>

<template>
    <AlertDialog>
        <AlertDialogTrigger :as-child="true">
            <Button variant="outline" size="icon">
                <Trash />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the timer and will remove it from your
                    collection along with its history.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction @click="onDelete">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
