<script setup lang="ts">
import { Sidebar, SidebarContent, SidebarFooter, SidebarMenuSkeleton, useSidebar } from "@/components/ui/sidebar";

import AddTimerDialog from "@/components/sidebar/AddTimerDialog.vue";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { useAsync } from "@/composables/use-async";
import { formatSeconds } from "@/lib/utils/general";
import timerService from "@/services/timer-service";
import { authStore } from "@/store/auth";
import { sidebarStore } from "@/store/sidebar";
import { Infinity, Play } from "lucide-vue-next";
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import LogoutButton from "../auth/LogoutButton.vue";
import SidebarHeader from "../ui/sidebar/SidebarHeader.vue";

const { error, isLoading } = useAsync(async () => {
    const res = await timerService.getTimers();

    if (res.status === 200) sidebarStore.setTimers(res.data);
});

const route = useRoute();

const timers = computed(() => sidebarStore.timers);

const { setOpenMobile } = useSidebar();
</script>

<template>
    <Sidebar variant="floating" collapsible="icon">
        <SidebarContent>
            <SidebarHeader>
                <AddTimerDialog />
            </SidebarHeader>
            <SidebarGroup>
                <SidebarGroupLabel>Timers</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                @click="setOpenMobile(false)"
                                :class="route.path === `/timers/infinite` ? 'bg-gray-100' : ''"
                                :as-child="true"
                            >
                                <RouterLink to="/timers/infinite">
                                    <Play />
                                    <div class="flex items-center justify-between flex-1">
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
                            <SidebarMenuButton
                                @click="setOpenMobile(false)"
                                :class="route.path === `/timers/${timer._id}` ? 'bg-gray-100' : ''"
                                :as-child="true"
                            >
                                <RouterLink :to="`/timers/${timer._id}`">
                                    <Play />
                                    <div class="flex items-center justify-between flex-1">
                                        {{ timer.name }}
                                        <div class="text-[13px]">{{ formatSeconds(timer.length) }}</div>
                                    </div>
                                </RouterLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <span class="text-center truncate group-data-[collapsible=icon]:hidden">{{ authStore.user }}</span>
            <LogoutButton />
        </SidebarFooter>
    </Sidebar>
</template>
