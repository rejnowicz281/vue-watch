<script setup lang="ts">
import { apiLogin } from "@/lib/utils/api";
import { authStore } from "@/store/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const onSubmit = async () => {
    const res = await apiLogin("john", "changeme");

    if (res.status === 200) {
        authStore.update(res.data.accessToken, "john");
        router.push("/");
    }
};
</script>

<template>
    <button @click="onSubmit">login</button>
</template>
