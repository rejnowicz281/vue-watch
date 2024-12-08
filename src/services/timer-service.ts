import type { Timer, TimerNoId } from "@/lib/types/timer";
import { API } from "@/lib/utils/api";
import debug from "@/lib/utils/debug";

export default {
    async getTimers() {
        try {
            const res = await API.get("timers");
            debug.log("get timers response", res);
            return res;
        } catch (error: any) {
            debug.error("Get timer failed", error.response.data);
            return error.response;
        }
    },
    async getTimer(id: string) {
        try {
            const res = await API.get(`timers/${id}`);
            debug.log("get timer response", res);
            return res;
        } catch (error: any) {
            debug.error("Get timer failed", error.response.data);
            return error.response;
        }
    },
    async addTimer(timer: TimerNoId) {
        try {
            const res = await API.post("timers", timer);
            debug.log("post timer response", res);
            return res;
        } catch (error: any) {
            debug.error("Add timer failed", error.response.data);
            return error.response;
        }
    },
    async editTimer(timer: Timer) {
        try {
            const res = await API.put(`timers/${timer._id}`, timer);
            debug.log("put timer response", res);
            return res;
        } catch (error: any) {
            debug.error("Edit timer failed", error.response.data);
            return error.response;
        }
    },
    async deleteTimer(id: string) {
        try {
            const res = await API.delete(`timers/${id}`);
            debug.log("delete timer response", res);
            return res;
        } catch (error: any) {
            debug.error("Delete timer failed", error.response.data);
            return error.response;
        }
    }
};
