<script setup lang="ts">
import { GITHUB_AUTH_URL } from "@/lib/utils/config";
import { Github } from "lucide-vue-next";
import Button from "../ui/button/Button.vue";

const onClick = () => {
    window.location.assign(GITHUB_AUTH_URL);
};
</script>

<template>
    <Button className="gap-1" variant="outline" :onClick="onClick">
        <Github :size="20" />
        Github Login
    </Button>
</template>
