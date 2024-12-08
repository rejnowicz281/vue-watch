<script setup lang="ts">
import { Sidebar, SidebarContent, SidebarFooter, SidebarMenuSkeleton } from "@/components/ui/sidebar";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { useFetch } from "@/composables/use-fetch";
import type { Timer } from "@/lib/types/timer";
import { formatSeconds } from "@/lib/utils/general";
import timerService from "@/services/timer-service";
import { Infinity, Play, Plus } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import LogoutButton from "../auth/LogoutButton.vue";
import Button from "../ui/button/Button.vue";
import Input from "../ui/input/Input.vue";
import SidebarHeader from "../ui/sidebar/SidebarHeader.vue";

const { data, error, isLoading } = useFetch<Timer[]>(timerService.getTimers);

const timers = data;
</script>

<template>
    <Sidebar variant="floating" collapsible="icon">
        <SidebarContent>
            <SidebarHeader class="group-data-[collapsible=icon]:hidden">
                <form>
                    <Input :disabled="isLoading" placeholder="New Timer" />
                    <Button :disabled="isLoading" class="mt-2 w-full" type="submit">
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
                        <div class="p-2 text-sm" v-if="error">
                            We couldn't load your timers.
                            <p>{{ error }}</p>
                        </div>
                        <SidebarMenuSkeleton v-else-if="isLoading" v-for="i in 3" :key="i" />
                        <SidebarMenuItem v-else v-for="timer in timers" :key="timer._id">
                            <SidebarMenuButton asChild>
                                <RouterLink :to="`/timers/${timer._id}`">
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
