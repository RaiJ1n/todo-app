import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import DashBoard from "@/views/Dashboard.vue";
import Register from "@/views/Register.vue";
import { useAuth } from "@/store/authStore";
import { useTodo } from "@/store/TodoStore";
import Register from "@/views/Register.vue";
const { checkAuth, isAuthenticated } = useAuth();
const { fetchTodo } = useTodo();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashBoard,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { requiresAuth: false },
    },
    // {
    //   path: "/search",
    //   name: "search",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/SearchView.vue"),
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

router.beforeEach(async (to, from, next) => {
  await checkAuth();
  await fetchTodo();
  console.log(isAuthenticated.value);
  //
  if (to.meta.requiresAuth && !isAuthenticated.value) return next("/login");

  if (
    to.name === "login" &&
    to.meta.requiresAuth === false &&
    isAuthenticated.value
  ) {
    return next("/todo");
  }
  if (
    to.name === "register" &&
    to.meta.requiresAuth === false &&
    isAuthenticated.value
  ) {
    return next("/todo");
  }
  next();
});

export default router;