<script setup lang="ts">
import GithubLoginButton from "@/components/auth/GithubLoginButton.vue";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import authService from "@/services/auth-service";
import { authStore } from "@/store/auth";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");

const onLogin = async (e: Event) => {
    e.preventDefault();

    const res = await authService.login(email.value, password.value);

    if (res.status === 200) {
        authStore.update(res.data.accessToken, email.value);
        router.push("/");
    }
};

const onRegister = async (e: Event) => {
    e.preventDefault();

    const res = await authService.register(email.value, password.value);

    if (res.status === 200) {
        authStore.update(res.data.accessToken, email.value);
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
    <div class="flex-1 flex flex-col justify-center items-center">
        <div class="flex flex-col gap-4">
            <form class="flex flex-col gap-4">
                <div class="grid grid-cols-4 items-center">
                    <Label for="email" class="text-right pr-3">Email</Label>
                    <Input v-model="email" type="email" id="email" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center">
                    <Label for="password" class="text-right pr-3">Password</Label>
                    <Input v-model="password" type="password" id="password" class="col-span-3" />
                </div>
                <div class="flex flex-col gap-3">
                    <Button v-on:click="onLogin">Login</Button>
                    <Button variant="outline" v-on:click="onRegister">Register</Button>
                </div>
            </form>
            <GithubLoginButton />
        </div>
    </div>
</template>
