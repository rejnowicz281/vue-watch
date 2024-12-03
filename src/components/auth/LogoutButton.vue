<script setup lang="ts">
import { apiLogout } from "@/lib/utils/api";
import { authStore } from "@/store/auth";
import { useRouter } from "vue-router";
import Button from "../ui/button/Button.vue";
const router = useRouter();

const logout = async () => {
    const res = await apiLogout();

    if (res.status === 200) {
        authStore.update(null, null);
        router.push("/login");
    }
};
</script>

<template>
    <Button @click="logout" variant="outline" size="sm" icon="logout">Logout</Button>
</template>
