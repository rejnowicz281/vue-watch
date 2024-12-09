import type { HistoryEntryNoId } from "@/lib/types/timer";
import { API } from "@/lib/utils/api";
import debug from "@/lib/utils/debug";

export default {
    async getTimerHistory(timerId: string) {
        try {
            const res = await API.get(`timer-history/${timerId}`);
            debug.log("get timer history Response", res);
            return res;
        } catch (error: any) {
            debug.error("Get timer history failed", error.response.data);
            return error.response;
        }
    },
    async addTimerHistoryEntry(entry: Omit<HistoryEntryNoId, "createdAt">) {
        try {
            const res = await API.post("timer-history", entry);
            debug.log("post timer history entry response", res);
            return res;
        } catch (error: any) {
            debug.error("Add timer history entry failed", error.response.data);
            return error.response;
        }
    },
    async deleteHistoryEntry(id: string) {
        try {
            const res = await API.delete(`timer-history/${id}`);
            debug.log("delete timer history entry response", res);
            return res;
        } catch (error: any) {
            debug.error("Delete timer history failed", error.response.data);
            return error.response;
        }
    }
};
