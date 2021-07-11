import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import header from './components/header';
import about from './pages/about';
import works from './pages/works';
import reviews from './pages/reviews';
import login from './pages/login';

const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/about',
        components: {
            default: about,
            header: header
        },
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem("token")) next();
            else next("/");
        }
    },
    {
        path: '/works',
        components: {
            default: works,
            header: header
        },
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem("token")) next();
            else next("/");
        }
    },
    {
        path: '/reviews',
        components: {
            default: reviews,
            header: header
        },
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem("token")) next();
            else next("/");
        }
    }
];

export default new VueRouter({routes});
