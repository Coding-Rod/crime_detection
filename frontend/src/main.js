import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import '../public/firebase-messaging-sw.'

import axios from 'axios'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)

app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)

// request Notification permission
Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        console.log('Notification permission granted.');
        // get the token in the form of promise
    } else {
        console.log('Unable to get permission to notify.');
    }
});

app.mount('#app')
