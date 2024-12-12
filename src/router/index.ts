import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import AuthView from "@/views/AuthView.vue";
import TimerHistoryView from "@/views/timer-history/TimerHistoryView.vue";
import { createRouter, createWebHistory } from "vue-router";
import TimerView from "../views/timer/TimerView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/auth",
            name: "auth",
            component: AuthView
        },
        {
            path: "/",
            component: DashboardLayout,
            children: [
                {
                    path: "/",
                    name: "infiniteTimer",
                    redirect: "/timers/infinite"
                },
                {
                    path: "/timers/:id",
                    name: "timer",
                    component: TimerView
                },
                {
                    path: "/timers/:id/history",
                    name: "timerHistory",
                    component: TimerHistoryView
                }
            ]
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            redirect: "/"
        }
    ]
});

export default router;
