import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import store from './store'
import VueRouter from 'vue-router'
import Board from './components/Board'
import History from './components/History'
import Login from './components/Login'
import Register from './components/Register'
import moment from 'moment-timezone'
import config from './config'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(new VueSocketIO({
  debug: true,
  connection: config.backendURL,
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  }
}))

const routes = [
  { path: '/', component: Board },
  { path: '/resource/:name/history', component: History },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = new VueRouter({
  mode: 'history',
  routes // routes: routes
})

Vue.filter('timeFormatFull', function (timeString) {
  if (!timeString) return ''
  return moment.tz(timeString, 'UTC').local().format('MMM Do YYYY, h:mm a')
})

Vue.filter('timeFormat', function (timeString) {
  if (!timeString) return ''
  return moment.tz(timeString, 'UTC').local().format('MMM Do, h:mm a')
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
