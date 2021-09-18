import { createWebHistory, createRouter } from 'vue-router'
import Home from '../components/Home'
import Show from "../components/Show"
const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/show",
        component: Show
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
