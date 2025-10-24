import { createRouter, createWebHistory } from 'vue-router'
import { authService } from './domains/iam/services/auth.service.js'
import SubscriptionPage from "./domains/subscriptions/pages/subscription-page.component.vue"
import PageNotFound from './shared/pages/page-not-found.component.vue'
import BillingPage from "./domains/payments/pages/BillingPage.vue";
import ProfilePage from "./domains/profile/pages/profile-page.component.vue"
import ReportPage from "./domains/reports/pages/reports-page.component.vue"
import AlertPage from "./domains/alerts/pages/alerts-page.component.vue"
import AnomalyPage from './domains/anomaly-detection/pages/anomaly-page.component.vue'
import DashboardPage from '@/domains/dashboard/pages/dashboard.component.vue'

// Lazy load para IAM
const LoginPage = () => import('./domains/iam/pages/login-page.component.vue')

const routes = [
    { path: '/', redirect: '/dashboard' },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: { requiresGuest: true }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/reports',
        name: 'Reports',
        component: ReportPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfilePage,
        meta: { requiresAuth: true }
    },
    {
        path: '/alerts',
        name: 'Alerts',
        component: AlertPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/usage-management',
        name: 'UsageManagement',
        component: { template: '<h1>Usage Management Placeholder</h1>' },
        meta: { requiresAuth: true }
    },
    {
        path: '/payments',
        name: 'Payments',
        component: BillingPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/anomaly-detection',
        name: 'AnomalyDetection',
        component: AnomalyPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/subscription',
        name: 'Subscription',
        component: SubscriptionPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: PageNotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation Guards
router.beforeEach((to, from, next) => {
    const isAuthenticated = authService.isAuthenticated()

    console.log('🛡️ Route guard:', {
        to: to.name,
        requiresAuth: to.meta.requiresAuth,
        requiresGuest: to.meta.requiresGuest,
        isAuthenticated
    })

    // Si la ruta requiere autenticación y no está autenticado
    if (to.meta.requiresAuth && !isAuthenticated) {
        console.log('🔒 Redirecting to login')
        next('/login')
    }
    // Si la ruta es para invitados (login) y ya está autenticado
    else if (to.meta.requiresGuest && isAuthenticated) {
        console.log('✅ Already authenticated, redirecting to dashboard')
        next('/dashboard')
    }
    // Continuar normalmente
    else {
        console.log('➡️ Continuing to route')
        next()
    }
})

export default router