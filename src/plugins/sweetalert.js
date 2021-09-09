import Swal from 'sweetalert2'
// import 'sweetalert2/src/sweetalert2.scss'

window.Swal = Swal

const alertSuccess = Swal.mixin({
  position: 'center',
  showConfirmButton: false,
  timer: 1500,
  icon: 'success'
})

const alertFailed = Swal.mixin({
  showConfirmButton: false,
  icon: 'error',
  position: 'center',

  // timer: 1500,
})

// main sweetalert

const alertTop = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const alertBottom = Swal.mixin({
  toast: true,
  position: 'bottom-start',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


const globalError = Swal.mixin({
  toast: true,
  icon: 'error',
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.alertSuccess = alertSuccess
window.alertFailed = alertFailed

window.alertBottom = alertBottom
window.alertTop = alertTop

window.globalError = globalError

