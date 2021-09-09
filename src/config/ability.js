import Vue from 'vue'

Vue.prototype.permissions = [];

Vue.prototype.$getPermissions = () => {
   let permessions = [];
   //  Vue.prototype.$http.get('myPermissions').then((res) => {
   //    Vue.prototype.permissions = res.data
   //  });
}

if(Vue.prototype.$token){
   Vue.prototype.$getPermissions();
}
