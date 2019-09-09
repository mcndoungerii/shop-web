import Vue from "vue";
import Router from "vue-router";
import AuthRequired from './authRequired'
Vue.use(Router);

import Error from "pages/Error";
import User from "pages/user";
import UserLogin from "pages/user/Login";
import ShopLogin from "pages/user/shopLogin";
import UserRegister from "pages/user/Register";
import UserForgotPassword from "pages/user/ForgotPassword";


import LandingPages from 'pages/landingPages'
import LandingPagesSinglepageHome from 'pages/landingPages/SinglepageHome'


import App from "pages/app";

import Dashboards from "pages/app/dashboards";
import DashboardsDefault from "pages/app/dashboards/Default";




import Users from "pages/app/users/list"
import Products from "pages/app/products/list"
import Payments from "pages/app/Payments/list"
import Shops from "pages/app/shops/list"
import Customers from "pages/app/customers/list"
import Sales from "pages/app/sales/list"
import Stocks from "pages/app/stocks/list"
import Suppliers from "pages/app/suppliers/list"
import Reports from "pages/app/reports/list"
import Orders from "pages/app/orders/list"











const routes = [{
    path: "/",
    component: LandingPages,
    redirect: "/app",
  },
  {
    path: "/singlepage-home",
    component: LandingPagesSinglepageHome
  },
  {
    path: "/error",
    component: Error
  },
  {
    path: "/user",
    component: User,
    redirect: "/user/login",
    children: [{
        path: "login",
        component: UserLogin
      },
      {
        path: "register",
        component: UserRegister
      },
      {
        path: "shop/login",
        component: ShopLogin
      },
      {
        path: "forgot-password",
        component: UserForgotPassword
      }
    ]
  },
  {
    path: "/app",
    component: App,
    redirect: "/app/dashboards",
    beforeEnter: AuthRequired,
    children: [{
        path: "dashboards",
        component: Dashboards,
        redirect: "/app/dashboards/default",
        children: [{
            path: "default",
            component: DashboardsDefault
          },

        ]
      },
      {
        path: "products",
        component: Products,
      },
      {
        path: "users",
        component: Users,
      },
      {
        path: "users/:type",
        component: Users,
      },
      {
        path: "payments",
        component: Payments,
      },
      {
        path: "shops",
        component: Shops,
      },
      {
        path: "customers",
        component: Customers,
      },
      {
        path: "sales",
        component: Sales,
      },
      {
        path: "stocks",
        component: Stocks,
      },
      {
        path: "suppliers",
        component: Suppliers,
      },
      {
        path: "reports",
        component: Reports,
      },
      {
        path: "orders",
        component: Orders,
      },


    ]
  },
  {
    path: "*",
    component: Error
  },
];



const router = new Router({
  linkActiveClass: "active",
  routes,
  mode: "history"
});

export default router