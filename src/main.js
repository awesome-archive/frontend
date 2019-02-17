import { sync } from 'vuex-router-sync'
import store from '@/store'
import router from '@/router'
import i18n from '@/i18n'
import Vue from '@/utils/vue'
import { recaptcha, noAuth } from '@/utils/constants'
import { login, validateLogin } from '@/utils/auth'
import App from '@/App'

sync(store, router)
export const playerEventBus = new Vue()
async function start () {
  if (noAuth) {
    await login('', '', '')
  } else {
    await validateLogin()
  }

  if (recaptcha) {
    await new Promise (resolve => {
      const check = () => {
        if (typeof window.grecaptcha === 'undefined') {
          setTimeout(check, 100)
        } else {
          resolve()
        }
      }

      check()
    })
  }

  new Vue({
    el: '#app',
    store,
    router,
    i18n,
    template: '<App/>',
    components: { App }
  })
}

start()
