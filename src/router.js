// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from './shared/pages/page-not-found.component.vue'

const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', name: 'Dashboard', component: { template: '<h1>Dashboard Placeholder</h1>' } },
    { path: '/reports', name: 'Reports', component: { template: '<h1>Reports Placeholder</h1>' } },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('./domains/profile/pages/profile-page.component.vue')
    },
    { path: '/alerts', name: 'Alerts', component: { template: '<h1>Alerts Placeholder</h1>' } },
    { path: '/usage-management', name: 'UsageManagement', component: { template: '<h1>Usage Management Placeholder</h1>' } },
    { path: '/anomaly-detection', name: 'AnomalyDetection', component: { template: '<h1>Anomaly Detection Placeholder</h1>' } },
    { path: '/payments', name: 'Payments', component: { template: '<h1>Payments Placeholder</h1>' } },
    { path: '/subscription', name: 'Subscription', component: { template: '<h1>Subscription Placeholder</h1>' } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: PageNotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router


/* // src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from './shared/pages/page-not-found.component.vue'

const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', name: 'Dashboard', component: { template: '<h1>Dashboard Placeholder</h1>' } },
    { path: '/reports', name: 'Reports', component: { template: '<h1>Reports Placeholder</h1>' } },
    { path: '/profile', name: 'Profile', component: { template: '<h1>Profile Placeholder</h1>' } },
    { path: '/alerts', name: 'Alerts', component: { template: '<h1>Alerts Placeholder</h1>' } },
    { path: '/usage-management', name: 'UsageManagement', component: { template: '<h1>Usage Management Placeholder</h1>' } },
    { path: '/anomaly-detection', name: 'AnomalyDetection', component: { template: '<h1>Anomaly Detection Placeholder</h1>' } },
    { path: '/payments', name: 'Payments', component: { template: '<h1>Payments Placeholder</h1>' } },
    { path: '/subscription', name: 'Subscription', component: { template: '<h1>Subscription Placeholder</h1>' } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: PageNotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router */
