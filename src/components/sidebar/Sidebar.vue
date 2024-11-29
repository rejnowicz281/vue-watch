<script setup lang="ts">
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { sampleTimers } from "@/lib/utils";
import { Play } from "lucide-vue-next";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const timers = ref(sampleTimers);
</script>

<template>
    <Sidebar variant="floating" collapsible="icon">
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Timers</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <RouterLink to="/timers/infinite">
                                    <Play />
                                    <span>Infinite Timer</span>
                                </RouterLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem v-for="timer in timers" :key="timer.id">
                            <SidebarMenuButton asChild>
                                <RouterLink :to="`/timers/${timer.id}`">
                                    <Play />
                                    <span>{{ timer.name }}</span>
                                </RouterLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
</template>
