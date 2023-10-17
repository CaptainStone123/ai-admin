import { createRouter, createWebHistory } from 'vue-router'
import AnalyticsView from '../views/AnalyticsView.vue'
import TestingView from '../views/TestingView.vue'
import ChatbotSettingsView from '../views/ChatbotSettingsView.vue'
import KnowledgeSourceView from '../views/KnowledgeSourceView.vue'
import DataItem1View from '../views/DataItem1View.vue'
import DataItem2View from '../views/DataItem2View.vue'
import DataItem3View from '../views/DataItem3View.vue'
import DataItem4View from '../views/DataItem4View.vue'
import DataItem5View from '../views/DataItem5View.vue'
import AccountView from '../views/AccountView.vue'
import Login from '../components/Login.vue'
import { useStore } from 'vuex';
 
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: AnalyticsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/testing',
      name: 'testing',
      component: TestingView,
      meta: { requiresAuth: true },
    },
    {
      path: '/chatbot-settings',
      name: 'chatbot-settings',
      component: ChatbotSettingsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/knowledge-source',
      name: 'knowledge-source',
      component: KnowledgeSourceView,
      meta: { requiresAuth: true },
    },
    {
      path: '/knowledge-source/data-item-1',
      name: 'DataItem',
      component: DataItem1View,
      meta: { requiresAuth: true },
    },
    {
      path: '/knowledge-source/data-item-2',
      name: 'DataItem2',
      component: DataItem2View,
      meta: { requiresAuth: true },
    },
    {
      path: '/knowledge-source/data-item-3',
      name: 'DataItem3',
      component: DataItem3View,
      meta: { requiresAuth: true },
    },
    {
      path: '/knowledge-source/data-item-4',
      name: 'DataItem4',
      component: DataItem4View,
      meta: { requiresAuth: true },
    },
    {
      path: '/knowledge-source/data-item-5',
      name: 'DataItem5',
      component: DataItem5View,
      meta: { requiresAuth: true },
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const store = useStore();

  console.log('Before navigation, isAuthenticated:', store.getters['isAuthenticated']);
  
  await store.dispatch('checkAuthentication'); 
  const isAuthenticated = store.getters['isAuthenticated'];

  console.log('After checkAuthentication, isAuthenticated:', isAuthenticated);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});



export default router
