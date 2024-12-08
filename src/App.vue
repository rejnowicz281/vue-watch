<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import Loading from "./components/general/Loading.vue";
import { API, clearInterceptors, setupInterceptors } from "./lib/utils/api";
import authService from "./services/auth-service";
import { authStore } from "./store/auth";

const isLoading = ref(true);

const router = useRouter();

async function refreshToken() {
    if (!authStore.user) {
        try {
            const response = await authService.refresh();

            if (response.status === 200) {
                const token = response.data.accessToken;

                authStore.validateToken(token);
            }
        } catch (error) {
            console.error("Failed to refresh token", error);
            authStore.update(null, null);
        }
    }
}

onBeforeMount(async () => {
    await refreshToken();

    if (!authStore.user && router.currentRoute.value.name !== "register" && router.currentRoute.value.name !== "login")
        router.push("/login");

    await setupInterceptors(API);

    isLoading.value = false;
});

onBeforeUnmount(() => {
    clearInterceptors(API);
});
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <Loading v-if="isLoading" />
        <RouterView v-else />
    </div>
</template>
