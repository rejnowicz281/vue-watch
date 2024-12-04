import type { Watch, WatchNoId } from "@/lib/types/watch";
import { API } from "@/lib/utils/api";
import debug from "@/lib/utils/debug";

export default {
    async getWatches() {
        try {
            const res = await API.get("watches");
            debug.log("get watches response", res);
            return res;
        } catch (error: any) {
            debug.error("Get watches failed", error.response.data);
            return error.response;
        }
    },
    async getWatch(id: string) {
        try {
            const res = await API.get(`watches/${id}`);
            debug.log("get watch response", res);
            return res;
        } catch (error: any) {
            debug.error("Get watch failed", error.response.data);
            return error.response;
        }
    },
    async addWatch(watch: WatchNoId) {
        try {
            const res = await API.post("watches", watch);
            debug.log("post watches response", res);
            return res;
        } catch (error: any) {
            debug.error("Add watch failed", error.response.data);
            return error.response;
        }
    },
    async editWatch(watch: Watch) {
        try {
            const res = await API.put(`watches/${watch.id}`, watch);
            debug.log("put watch response", res);
            return res;
        } catch (error: any) {
            debug.error("Edit watch failed", error.response.data);
            return error.response;
        }
    },
    async deleteWatch(id: string) {
        try {
            const res = await API.delete(`watches/${id}`);
            debug.log("delete watch response", res);
            return res;
        } catch (error: any) {
            debug.error("Delete watch failed", error.response.data);
            return error.response;
        }
    }
};
