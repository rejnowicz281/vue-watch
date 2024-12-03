<script setup lang="ts">
import { RouterView } from "vue-router";
import Sidebar from "../sidebar/Sidebar.vue";
import SidebarProvider from "../ui/sidebar/SidebarProvider.vue";
import SidebarTrigger from "../ui/sidebar/SidebarTrigger.vue";
</script>

<template>
    <SidebarProvider>
        <Sidebar id="app-sidebar" />
        <SidebarTrigger />
        <RouterView></RouterView>
    </SidebarProvider>
</template>
