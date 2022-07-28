import Vue from 'vue'
import App from './App'
import Common from "@/units/Common";
import api  from "units/servers/api.js";
import i18n from './i18n/index.js'; 
import VueI18n from 'vue-i18n'; 

import {
    router,
    RouterMount
} from './router'

Vue.use(router)
Vue.use(VueI18n)

Vue.filter('formatplace',(data)=>{
   var tys = data-0
   tys = tys.toFixed(2)
   return tys
})

// 此方法用来重置页面数据
Vue.prototype.resetData = function(...arr){
	// 循环每个参数
	arr.forEach((item, index)=>{
		// 如果时参数是字符串时
		if(Object.prototype.toString.call(item) === "[object String]") {
			// 判断当前元素的类型并将该元素值设置为初始化状态
			switch (Object.prototype.toString.call(this[item])){
				case "[object String]":
					this[item] = "";
					break;
				case "[object Number]":
					this[item] = 0;
					break;
				case "[object Array]":
					this[item] = [];
					break;
				case "[object Object]":
					this[item] = {};
					break;
				case "[object Boolean]":
					this[item] = false;
					break;
			}
		}
		// 如果参数类型为对象时
		else if(Object.prototype.toString.call(item) === "[object Object]"){
			// 找到每一项并重置为传递的任意值
			for(let key in item) {
				this[key] = item[key];
			}
		}
	})
}

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$Common = Common

App.mpType = 'app'

const app = new Vue({
    ...App,
	i18n, //很重要，别忘记
})

// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
