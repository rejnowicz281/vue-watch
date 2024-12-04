<script setup lang="ts">
import authService from "@/services/auth-service";
import { authStore } from "@/store/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const onSubmit = async () => {
    const res = await authService.login("john", "changeme");

    if (res.status === 200) {
        authStore.update(res.data.accessToken, "john");
        router.push("/");
    }
};
</script>

<template>
    <button @click="onSubmit">login</button>
</template>
