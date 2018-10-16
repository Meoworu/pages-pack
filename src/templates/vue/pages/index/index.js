import Vue from 'vue';
import axios from 'axios';

Vue.prototype.axios = axios;

import App from './app.vue';
import './${name}.scss';

new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
})