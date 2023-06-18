import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import { useUserStore } from "../stores/user.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/query",
      name: "query",
      component: () => import("../views/QueryView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/user",
      name: "user-info",
      component: () => import("../views/UserView.vue"),
    },
    {
      path: "/create-house",
      component: () => import("../views/HouseCreate.vue"),
    },
    {
      path: "/my-houses",
      component: () => import("../views/HouseOwns.vue"),
    },
    {
      path: "/house/:id",
      component: () => import("../views/HouseDetail.vue"),
    },
    {
      path: "/my-orders",
      component: () => import("../views/OrderView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const store = useUserStore();

  if (!store.user.name) {
    await store.auth();
  }

  next();
});

export default router;
