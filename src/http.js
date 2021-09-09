import Vue from "vue";
import axios from "axios";
// import router from './router'
// import store from '@/store'
// 192.168.1.173:3200
const $domain = 'http://admin.myrosheta.com'
const $domain_api = $domain + '/api/'

const token = localStorage.getItem('token')

const base = axios.create({
    baseURL: $domain_api,
    headers: !token ? {} : {
        'Authorization': 'Bearer ' + token
    }
})

// before a request is made start the nprogress
base.interceptors.request.use(config => {
    // store.dispatch('loader/show');
    return config
})

base.interceptors.response.use(function(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // store.dispatch('loader/hide');
        return response;
    }
    // ,
    // function (error) {
    //    // Any status codes that falls outside the range of 2xx cause this function to trigger
    //    // Do something with response error

    //    // const status = error.response.status

    //    // const errors = {
    //    //    500: 'Internal Server Error',
    //    //    429: 'many request',
    //    //    405: 'Method Not Allowed',
    //    //    404: 'Url Model Not Found',
    //    //    401: 'Unauthorized'
    //    // }

    //    // if (Object.keys(errors).indexOf(String(status)) != -1) {
    //    //    globalError.fire({
    //    //       title: 'Error ' + status + ' !',
    //    //       text: errors[status]
    //    //    })
    //    //    /*   setTimeout(() => {
    //    //        console.clear()
    //    //      }) */
    //    // }

    //    // if (status === 422) {
    //    //    let errorCode = error.response.data.error

    //    //    // get json errors
    //    //    const errorsMessage = require(`@/lang/errors/${$i18n.locale}.json`)

    //    //    if(errorsMessage[errorCode]){
    //    //       errorCode = errorsMessage[errorCode];
    //    //    }
    //    //    globalError.fire({
    //    //       title: "Validation Error: " + errorCode + '!'
    //    //    })
    //    //    // setTimeout(() => {
    //    //    //   console.clear()
    //    //    // })
    //    // }

    //    // if (status === 403) {
    //    //    // store.dispatch('get_user')
    //    //    alert('you dont have permission')
    //    //    router.push('/')
    //    // }

    //    // store.dispatch('loader/hide');

    // }
);


Vue.prototype.$http = base
Vue.prototype.$domain_api = $domain_api
Vue.prototype.$domain = $domain

/**
 * get user details after reload the browser
 */
// if(token){
//    // store.dispatch('get_user');
// }

/**
 * locale
 */
// store.dispatch('locale/setLocale');