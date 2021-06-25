import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as VueGoogleMaps from "vue2-google-maps"

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
	load: {
		key: "AIzaSyADzmh-czHQ04vh1bZBoWssLdmVU2t-DL4",
		libraries: "places"
	}
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
