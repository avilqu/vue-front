import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import 'bootstrap';
import './assets/css/bootstrap.min.css';
// import './assets/css/main.css';
// import './assets/css/login.css';

createApp(App)
    .use(store)
    .use(router)
    .mount('#app');
