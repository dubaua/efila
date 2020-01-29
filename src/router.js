import Vue from 'vue';
import Router from 'vue-router';
import ContactAndDelivery from '@/components/ContactAndDelivery.vue';
import Product from '@/components/product/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/contact-and-delivery',
      name: 'ContactAndDelivery',
      component: ContactAndDelivery,
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
