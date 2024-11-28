import InfiniteTimerView from "@/views/InfiniteTimerView.vue";
import TimerHistoryView from "@/views/TimerHistoryView.vue";
import { createRouter, createWebHistory } from "vue-router";
import TimerView from "../views/TimerView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "infiniteTimer",
            component: InfiniteTimerView
        },
        {
            path: "/timers/:id",
            name: "timer",
            component: TimerView,
            children: [{ path: "history", component: TimerHistoryView }]
        }
    ]
});

export default router;
