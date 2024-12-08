import authService from "@/services/auth-service";
import { jwtDecode, type JwtPayload } from "jwt-decode";

import { reactive } from "vue";

export const authStore = reactive({
    accessToken: null as string | null,
    user: null as any | null,
    update(accessToken: string | null, user: any | null) {
        this.accessToken = accessToken;
        this.user = user;
    },
    async logout() {
        const res = await authService.logout();

        if (res.status === 200) {
            this.accessToken = null;
            this.user = null;
        }

        return res;
    },
    async login(email: string, password: string) {
        const res = await authService.login(email, password);

        if (res.status === 200) {
            this.accessToken = res.data.accessToken;
            this.user = res.data.user;
        }

        return res;
    },
    validateToken(accessToken: string) {
        const decodedToken = jwtDecode(accessToken) as JwtPayload & { email: string; name: string };

        this.accessToken = accessToken;
        this.user = decodedToken.name || decodedToken.email;
    }
});
