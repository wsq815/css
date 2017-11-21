import 'static/css/admin.scss';
import 'vue-xui/css/xui.min.css';

import Vue from 'vue';
import xui from 'static/main.js';
import router from './router/';
import ajax from 'utils/ajax';
import datePicker from 'vue-datepicker';

Vue.use(xui);
Vue.use(ajax);

Vue.component('datePicker', datePicker);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router
});
