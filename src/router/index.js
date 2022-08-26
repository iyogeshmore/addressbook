import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Home from "../components/Home.vue";
import EditForm from "../components/EditForm.vue";
import SignUp from "../components/SignUp.vue";
import Login from "../components/Login.vue";  

Vue.use(VueRouter);

const routes = [
  {
    path: "/addcontact",
    name: "home",
    component: HomeView,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/editaddressbook/:id?",
    name: "EditForm",
    component: EditForm,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/Signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
