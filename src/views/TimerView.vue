<script setup lang="ts">
import TimerView from "@/components/timer/TimerView.vue";
import { useRoute } from "vue-router";
const id = useRoute().params.id as string;
</script>

<template>
    <TimerView :id="id" />
</template>
