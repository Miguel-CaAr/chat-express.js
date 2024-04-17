import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../login/views/LoginView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../home/views/HomeView.vue"),
    },
  ],
});

export default router;
