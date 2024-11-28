<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <RouterLink to="/">Infinite Timer</RouterLink>
    <RouterLink to="/timers/123">Timer 123</RouterLink>

    <RouterView />
</template>
