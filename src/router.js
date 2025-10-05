// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from './shared/pages/page-not-found.component.vue'
import AnomalyPage from './domains/anomaly-detection/pages/anomaly-page.component.vue'

const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', name: 'Dashboard', component: { template: '<h1>Dashboard Placeholder</h1>' } },
    { path: '/reports', name: 'Reports', component: { template: '<h1>Reports Placeholder</h1>' } },
    { path: '/profile', name: 'Profile', component: { template: '<h1>Profile Placeholder</h1>' } },
    { path: '/alerts', name: 'Alerts', component: { template: '<h1>Alerts Placeholder</h1>' } },
    { path: '/usage-management', name: 'UsageManagement', component: { template: '<h1>Usage Management Placeholder</h1>' } },
    { path: '/', redirect: '/anomaly-detection' },
    { path: '/anomaly-detection', name: 'AnomalyDetection', component: AnomalyPage },
    { path: '/payments', name: 'Payments', component: { template: '<h1>Payments Placeholder</h1>' } },
    { path: '/subscription', name: 'Subscription', component: { template: '<h1>Subscription Placeholder</h1>' } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: PageNotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

