import Vue from 'vue'
import App from './app'
import router from '@router'
import store from '@state/store'
import '@components/_globals'

// import VueAnalytics from 'vue-ua'
import Analytics from 'electron-google-analytics';
  
import VueDraggable from 'vue-draggable';

Vue.config.devtools = true

Vue.use(VueDraggable);

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

Vue.prototype.$analytics = new Analytics('UA-36950697-10');

// THIS SHOULD BE SET FOR EACH INDIVIDUAL CITY
Vue.prototype.$locationVar = 'SF';

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

if (process.env.VUE_APP_PLATFORM === 'electron') {
  Vue.prototype.$baseUrl = `${__static}/`
} else {
  Vue.prototype.$baseUrl = process.env.BASE_URL;
}

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  window.__app__ = app
}
