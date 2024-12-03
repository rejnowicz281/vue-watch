<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";

const { spinnerSize } = defineProps({
    spinnerSize: {
        type: Number,
        default: 50
    }
});
</script>

<template>
    <div className="flex-1 flex justify-center items-center">
        <LoaderCircle :size="spinnerSize" className="animate-spin" />
    </div>
</template>
