import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store' // your vuex store

// include routes
import Home from "../views/Dashboard/Home/home.vue";
import Dashboard from './dashboard'
// import Settings from './settings'
// import Home from "../views/Home.vue";
import Login from "../views/auth/login.vue";

Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Dashboard"
    }
  },

  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: 'Login',
      notRequiresAuth: true

  }
  }
];

routes = routes.concat(Dashboard);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});



// router.afterEach((to, from, next) => {
//   setTimeout(() => {
//       const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
//       if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
//   })
//   this.$jquery('html, body').scrollTop(0)
// })


router.beforeEach((to, from, next) => {
  if (to.meta.notRequiresAuth) {
      if (store.getters.isLoggedIn) {
          next({ name: 'home' })
          return
      }
      next()
  } else {
      if (store.getters.isLoggedIn) {
          next()
          return
      }
      next({ name: 'login' })
  }
  next()
})
export default router;
