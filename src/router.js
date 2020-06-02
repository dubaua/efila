import Vue from 'vue';
import Router from 'vue-router';
import ContentPage from '@/components/ContentPage.vue';
import Product from '@/components/product/Product.vue';
import store from '@/store/index.js';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/pages/:pageId',
      name: 'Page',
      component: ContentPage,
    },
    {
      path: '/:productId',
      name: 'product',
      component: Product,
    },
    {
      path: '/',
      name: 'home',
      component: Product,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (store.getters.isOverlayed) {
    store.dispatch('closeAll');
  }
  next();
});

export default router;
