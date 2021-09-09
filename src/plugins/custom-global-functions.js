// import Vue from 'vue'

// const destroyRow = (url, messageQues = 'Are you sure to delete this element ?', deleteSuccessMsg = 'This element has been deleted.') => {
//     return new Promise((resolve, reject) => {
//         Swal.fire({
//             title: 'Delete',
//             text: messageQues,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#e74c3c',
//             cancelButtonColor: '#6d6d6d',
//             confirmButtonText: 'Delete!',
//             cancelButtonText: 'Cancel'
//         }).then(result => {
//             if (result.value) {
//                 Vue.prototype.$http.delete(url).then(response => {
//                     if (response.status === 200 && response.data.code === 200) {
//                         alertSuccess.fire({
//                             text: deleteSuccessMsg
//                         })
//                         resolve(response)
//                     } else if (response.data.code === 23000 && response.status === 200) {
//                         alertFailed.fire({
//                             title: 'Not deleted!',
//                             text: 'This element has  been used in other model.'
//                         })

//                     } else {
//                         alertFailed.fire({
//                             title: 'Not deleted!',
//                             text: 'This element has not been deleted.'
//                         })
//                     }
//                 }).catch(error => {
//                     alertFailed.fire({
//                         title: 'Not deleted!',
//                         text: 'This element has not been deleted.'
//                     })
//                     reject(error)
//                 })
//             }
//         })
//     })
// }




// // global function

// Vue.prototype.$destroyRow = destroyRow
// window.$destroyRow = destroyRow