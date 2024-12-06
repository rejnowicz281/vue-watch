<script setup lang="ts">
import GithubLoginButton from "@/components/auth/GithubLoginButton.vue";
import authService from "@/services/auth-service";
import { authStore } from "@/store/auth";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onSubmit = async () => {
    const res = await authService.login("1@gmail.com", "123");

    if (res.status === 200) {
        authStore.update(res.data.accessToken, "1@gmail.com");
        router.push("/");
    }
};

async function githubInit() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const codeParam = urlParams.get("code");

    if (codeParam) {
        const res = await authService.githubLogin(codeParam);

        const accessToken = res.data.accessToken;
        const username = res.data.username;

        if (accessToken && username) authStore.update(accessToken, username);

        router.push("/timers/infinite");
    }
}

onBeforeMount(async () => {
    await githubInit();
});
</script>

<template>
    <button @click="onSubmit">login</button>
    <GithubLoginButton />
</template>
