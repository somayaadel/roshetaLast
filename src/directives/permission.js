import Vue from 'vue'
import store from '@/store'


Vue.directive('can',
    function(el, binding, vnode) {
      let permissions = store.state.user.permissions;
      if(binding.arg == "permission"){
         if(permissions && permissions.indexOf(binding.value) === -1) {
            if(vnode.elm.parentElement){
               vnode.elm.parentElement.removeChild(vnode.elm)
            }
         }
      }

      let roles = store.state.user.roles;
      if(binding.arg == "role"){
         if(roles && roles.indexOf(binding.value) === -1) {
            if(vnode.elm.parentElement){
               vnode.elm.parentElement.removeChild(vnode.elm)
            }
         }
      }
    }
);