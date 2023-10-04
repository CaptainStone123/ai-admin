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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'analytics',
      component: AnalyticsView
    },
    {
      path: '/testing',
      name: 'testing',
      component: TestingView
    },
    {
      path: '/chatbot-settings',
      name: 'chatbot-settings',
      component: ChatbotSettingsView
    },
    {
      path: '/knowledge-source',
      name: 'knowledge-source',
      component: KnowledgeSourceView
    },
    {
      path: '/knowledge-source/data-item-1',
      name: 'DataItem',
      component: DataItem1View
    },
    {
      path: '/knowledge-source/data-item-2',
      name: 'DataItem2',
      component: DataItem2View
    },
    {
      path: '/knowledge-source/data-item-3',
      name: 'DataItem3',
      component: DataItem3View
    },
    {
      path: '/knowledge-source/data-item-4',
      name: 'DataItem4',
      component: DataItem4View
    },
    {
      path: '/knowledge-source/data-item-5',
      name: 'DataItem5',
      component: DataItem5View
    },
    
  ]
})

export default router
