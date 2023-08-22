import {createApp} from 'vue'
import App from './App.vue'
import './style.css'
import router from "@/router";
import {createPinia} from "pinia";
import VueLuckyCanvas from '@lucky-canvas/vue'
import 'amfe-flexible'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(VueLuckyCanvas)
app.mount('#app')
