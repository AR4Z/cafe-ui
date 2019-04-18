import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            component: () => import("@/views/Home")
        },
        {
            path: "/staffcalculate",
            component: () => import("@/views/StaffCalculate")
        }
    ]
});