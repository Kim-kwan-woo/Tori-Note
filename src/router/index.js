import Vue from 'vue'
import Router from 'vue-router'

// Dashboard Components
import dashboard from '../views/dashboard'

// Storage Components
import MyPdfFiles from '../views/storage/MyPdfFiles'

//  Widgets Components
import mainView from '../mainView'

import login from '../views/samples/user-pages/login'
import register from '../views/samples/user-pages/register'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  mode: 'hash',
  routes: [{
    path: '/',
    redirect: '/dashboard',
    component: mainView,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
      },
      {
        path: '/MyPdfFiles',
        name: 'MyPdfFiles',
        component: MyPdfFiles
      }
    ]
  },
  {
    path: '*',
    redirect: '/pages/error_404',
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: '/pages/login',
        component: login
      },
      {
        path: '/pages/register',
        component: register
      }
    ]}
  ]
})
