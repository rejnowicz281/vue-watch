import { API } from "@/lib/utils/api";
import debug from "@/lib/utils/debug";

export default {
    async register(email: string, password: string) {
        try {
            const res = await API.post("auth/register", { email, password });

            debug.log("post express register response", res);

            return res;
        } catch (error: any) {
            debug.error("Registration failed", error.response.data);
            return error.response;
        }
    },
    async login(email: string, password: string) {
        try {
            const res = await API.post("auth/login", { email, password });

            debug.log("post express login response", res);

            return res;
        } catch (error: any) {
            debug.error("Login failed", error.response.data);
            return error.response;
        }
    },
    async logout() {
        try {
            const res = await API.delete("auth/logout");

            debug.log("delete express logout response", res);

            return res;
        } catch (error: any) {
            debug.error("Logout failed", error.response.data);
            return error.response;
        }
    },
    async refresh() {
        try {
            const res = await API.post("auth/refresh");

            debug.log("post express refresh response", res);

            return res;
        } catch (error: any) {
            debug.error("Refresh failed", error.response.data);
            return error.response;
        }
    },
    async githubLogin(code: string) {
        try {
            const tokenRes = await API.post("auth/github/token", { code });

            debug.log("post express github token response", tokenRes);

            const res = await API.post("auth/github/login", {
                access_token: tokenRes.data.token
            });

            debug.log("get express github user response", res);

            return res;
        } catch (error: any) {
            debug.error("Github login failed", error.response.data);
            return error.response;
        }
    }
};
