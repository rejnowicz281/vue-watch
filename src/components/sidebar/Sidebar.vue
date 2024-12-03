<script setup lang="ts">
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { formatSeconds, sampleTimers } from "@/lib/utils/general";
import { Infinity, Play, Plus } from "lucide-vue-next";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import LogoutButton from "../auth/LogoutButton.vue";
import Button from "../ui/button/Button.vue";
import Input from "../ui/input/Input.vue";
import SidebarHeader from "../ui/sidebar/SidebarHeader.vue";

const timers = ref(sampleTimers);
</script>

<template>
    <Sidebar variant="floating" collapsible="icon">
        <SidebarContent>
            <SidebarHeader class="group-data-[collapsible=icon]:hidden">
                <form>
                    <Input placeholder="New Timer" />
                    <Button class="mt-2 w-full" type="submit">
                        <Plus />
                        Create Timer</Button
                    >
                </form>
            </SidebarHeader>
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
        <SidebarFooter>
            <LogoutButton />
        </SidebarFooter>
    </Sidebar>
</template>
