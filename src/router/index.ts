import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TimerHistoryView from "@/views/TimerHistoryView.vue";
import { createRouter, createWebHistory } from "vue-router";
import TimerView from "../views/TimerView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            component: LoginView
        },
        {
            path: "/register",
            name: "register",
            component: RegisterView
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
