<script setup lang="ts">
import { jwtDecode } from "jwt-decode";
import { onBeforeMount, ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import Loading from "./components/general/Loading.vue";
import { apiRefresh } from "./lib/utils/api";
import { authStore } from "./store/auth";

const isLoading = ref(true);

const router = useRouter();

async function refreshToken() {
    if (!authStore.user) {
        const response = await apiRefresh();

        if (response.status === 200) {
            try {
                const token = response.data.accessToken;
                const decodedToken = jwtDecode(token);

                authStore.update(token, decodedToken);
            } catch (error) {
                console.error("Token decode fail", error);
                authStore.update(null, null);
            }
        }
    }

    isLoading.value = false;
}

onBeforeMount(async () => {
    await refreshToken();
    if (!authStore.user && router.currentRoute.value.name !== "register") router.push("/login");
});
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <Loading v-if="isLoading" />
        <RouterView v-else />
    </div>
</template>
