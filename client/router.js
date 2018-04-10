import Vue from 'vue';
import Router from 'vue-router';

const App = r => require.ensure([], () => r(require('./App.vue')), 'app');

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '',
            component: App,
            children: [
                {
                    path: '',
                    redirect: '/all'
                }, {
                    path: 'all',
                    component: App
                }, {
                    path: 'active',
                    component: App
                }, {
                    path: 'completed',
                    component: App
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;
