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
      path: "/lobby",
      name: "lobby",
      component: () => import("../lobby/views/Lobby.vue"),
    },
  ],
});

export default router;
