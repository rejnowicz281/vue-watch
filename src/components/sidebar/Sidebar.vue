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
import { formatSeconds, sampleTimers } from "@/lib/utils";
import { Infinity, Play } from "lucide-vue-next";
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
                                    <div className="flex items-center justify-between flex-1">
                                        Infinite Timer <Infinity :size="20" />
                                    </div>
                                </RouterLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem v-for="timer in timers" :key="timer.id">
                            <SidebarMenuButton asChild>
                                <RouterLink :to="`/timers/${timer.id}`">
                                    <Play />
                                    <div className="flex items-center justify-between flex-1">
                                        {{ timer.name }}
                                        <div className="text-[13px]">{{ formatSeconds(timer.length) }}</div>
                                    </div>
                                </RouterLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
</template>
