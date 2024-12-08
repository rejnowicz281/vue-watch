<script setup lang="ts">
import { authStore } from "@/store/auth";
import { LogOut } from "lucide-vue-next";
import { useRouter } from "vue-router";
import Button from "../ui/button/Button.vue";
const router = useRouter();

const logout = async () => {
    const res = await authStore.logout();

    if (res.status === 200) router.push("/auth");
};
</script>

<template>
    <Button @click="logout" variant="outline" size="sm" icon="logout">
        <LogOut class="group-data-[collapsible=icon]:block hidden" />
        <span class="group-data-[collapsible=icon]:hidden">Logout</span></Button
    >
</template>
