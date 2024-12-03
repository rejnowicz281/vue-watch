import { reactive } from "vue";

export const authStore = reactive({
    accessToken: null as string | null,
    user: null as any | null,
    update(accessToken: string | null, user: any | null) {
        this.accessToken = accessToken;
        this.user = user;
    }
});
