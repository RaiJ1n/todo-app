import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import DashBoard from "@/views/Dashboard.vue";
import Register from "@/views/Register.vue";
import { useAuth } from "@/store/authStore";
// import { useTodo } from "@/store/TodoStore";
const { checkAuth, isAuthenticated } = useAuth();


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
  ],
});

router.beforeEach(async (to, from, next) => {
  await checkAuth();
//   await fetchTodo();
  console.log(isAuthenticated.value);

  if (to.meta.requiresAuth && !isAuthenticated.value) return next("/login");

  if (
    to.name === "login" &&
    to.meta.requiresAuth === false &&
    isAuthenticated.value
  ) {
    return next("/list");
  }
  if (
    to.name === "register" &&
    to.meta.requiresAuth === false &&
    isAuthenticated.value
  ) {
    return next("/");
  }
  next();
});

export default router;