// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as time from './filters/time'
import AccordionList from '@/components/unit/AccordionList'

Vue.component('AccordionList', AccordionList);
export const bus = new Vue({});

Object.keys(time).forEach(key => {
  Vue.filter(key, time[key])
})

Vue.config.productionTip = false;

jQuery.support.cors = true;
jQuery.ajaxSetup({
	global: true,
	cache: false,
	dataType: "json",
	contentType: "application/json",
	xhrFields: {
		withCredentials: true
	},
	error: function (jqXHR, textStatus, errorThrown) {
		if (jqXHR.status != 400) {
			try {
				var response = JSON.parse(jqXHR.responseText);
				ErrorDebug(response);
			} catch (e) {

			}
			if (jqXHR.status == 440) {

			} else if (jqXHR.status == 401) {
				// console.log("Unauthorized");
				// console.log(localStorage.getItem("token"));
				if (localStorage.getItem("token")) {
					localStorage.removeItem("token");
				}
			} else {

			}
		}
	},
	beforeSend: function (xhr) {
		var A = localStorage.sessionId;
		if (A) {
			xhr.setRequestHeader("X-ss-id", A);
		}
	},
	complete: function (jqXHR, status) {
		// console.log("complete");
	}
});

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		if (localStorage.getItem("token")) {
			next();
		}
		else {
			next({
				path: '/Login',
				query: {redirect: to.fullPath}
			})
		}
	}
	else {
		next();
	}
})




/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
