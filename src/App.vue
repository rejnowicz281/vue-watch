<script setup lang="ts">
import { RouterView } from "vue-router";
import Sidebar from "./components/sidebar/Sidebar.vue";
import { SidebarProvider } from "./components/ui/sidebar";
import SidebarTrigger from "./components/ui/sidebar/SidebarTrigger.vue";
</script>

<template>
    <SidebarProvider>
        <Sidebar id="app-sidebar" />
        <SidebarTrigger />
        <RouterView />
    </SidebarProvider>
</template>
