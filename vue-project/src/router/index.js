import { createRouter, createWebHistory } from 'vue-router'
import AnalyticsView from '../views/AnalyticsView.vue'
import TestingView from '../views/TestingView.vue'
import ChatbotSettingsView from '../views/ChatbotSettingsView.vue'
import KnowledgeSourceView from '../views/KnowledgeSourceView.vue'

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
    
  ]
})

export default router
