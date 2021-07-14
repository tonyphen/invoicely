import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from "@/views/dashboard/Dashboard";
import MyAccount from "@/views/dashboard/MyAccount";
import Signup from "@/views/Signup";
import LogIn from "@/views/LogIn";
import Clients from "@/views/dashboard/Clients";
import Client from "@/views/dashboard/Client";
import AddClient from "@/views/dashboard/AddClient";
import EditClient from "@/views/dashboard/EditClient";
import EditTeam from "@/views/dashboard/EditTeam";
import Invoices from "@/views/dashboard/Invoices";
import Invoice from "@/views/dashboard/Invoice";
import AddInvoice from "@/views/dashboard/AddInvoice";

import store from '../store'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '/sign-up', name: 'Signup', component: Signup },
  { path: '/log-in', name: 'LogIn', component: LogIn },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta:{requireLogin: true,}},
  { path: '/dashboard/invoices', name: 'Invoices', component: Invoices, meta:{requireLogin: true,}},
  { path: '/dashboard/invoices/:id', name: 'Invoice', component: Invoice, meta:{requireLogin: true,}},
  { path: '/dashboard/invoices/add', name: 'AddInvoice', component: AddInvoice, meta:{requireLogin: true,}},
  { path: '/dashboard/clients', name: 'Clients', component: Clients, meta:{requireLogin: true,}},
  { path: '/dashboard/clients/add/', name: 'AddClient', component: AddClient, meta:{requireLogin: true,}},
  { path: '/dashboard/clients/:id', name: 'Client', component: Client, meta:{requireLogin: true,}},
  { path: '/dashboard/clients/:id/edit', name: 'EditClient', component: EditClient, meta:{requireLogin: true,}},
  { path: '/dashboard/my-account', name: 'MyAccount', component: MyAccount, meta: {requireLogin: true,}},
  { path: '/dashboard/my-account/edit-team', name: 'EditTeam', component: EditTeam, meta:{requireLogin: true,}},

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated){
    next('/log-in')
  } else {
    next()
  }
})

export default router
