import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/compat/app'
import 'firebase/compat/messaging'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)

app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)

const firebaseConfig = {
    apiKey: "AIzaSyDOiVXW7-HuQ8K9Fo5ROuMPHpdiV_IS9c0",
    authDomain: "crime-detection-48ba3.firebaseapp.com",
    projectId: "crime-detection-48ba3",
    storageBucket: "crime-detection-48ba3.appspot.com",
    messagingSenderId: "525094847317",
    appId: "1:525094847317:web:16eb6b0ec093f7b656a5dc",
    measurementId: "G-9240F08QT7"
  };

const app1 = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app1);

// request Notification permission
Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        console.log('Notification permission granted.');
        // get the token in the form of promise

        messaging.getToken(
            { vapidKey: 'BOkDxL7FM4fvNS6eXgqDrstRTnjBRpDp6Rv5JUMy9EgMIEuuCVui1kA9pqQNlkVFwN_v5NeZ6KDywBnf7ZrWuqM' }
        ).then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                localStorage.setItem('fcm_token', currentToken);
            } else {
                console.log('No Instance ID token available. Request permission to generate one.');
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
    } else {
        console.log('Unable to get permission to notify.');
    }
});


messaging.onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
        image: payload.notification.image,
        click_action: payload.notification.click_action
    };

    new Notification(notificationTitle, notificationOptions);

    });

app.mount('#app')
