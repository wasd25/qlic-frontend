// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from './shared/pages/page-not-found.component.vue'
import BillingPage from "./domains/payments/pages/BillingPage.vue";
import ProfilePage from "./domains/profile/pages/profile-page.component.vue"
import ReportPage from "./domains/reports/pages/reports-page.component.vue"
import AlertPage from "./domains/alerts/pages/alerts-page.component.vue"
import AnomalyPage from './domains/anomaly-detection/pages/anomaly-page.component.vue'

const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', name: 'Dashboard', component: { template: '<h1>Dashboard Placeholder</h1>' } },
    { path: '/reports', name: 'Reports', component: ReportPage },
    { path: '/profile', name: 'Profile', component: ProfilePage },
    { path: '/alerts', name: 'Alerts', component: AlertPage },
    { path: '/usage-management', name: 'UsageManagement', component: { template: '<h1>Usage Management Placeholder</h1>' } },
    { path: '/payments', name: 'Payments', component: BillingPage},
    { path: '/anomaly-detection', name: 'AnomalyDetection', component: AnomalyPage },
    { path: '/subscription', name: 'Subscription', component: { template: '<h1>Subscription Placeholder</h1>' } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: PageNotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
