import { createApp } from 'vue'
import router from './router'
import VueLazyLoad from 'vue3-lazyload'
import {VueFire, VueFireAuth} from 'vuefire'

import {app as firebaseApp} from '@/firebase'
import App from './App.vue'
import './style.css'


const app = createApp(App)

app.use(VueLazyLoad,{})
app.use(router)
app.use(VueFire,{
    firebaseApp,
    modules: [
        // ... other modules
        VueFireAuth(),
    ],
})
app.mount('#app')
