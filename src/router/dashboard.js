import patients from '../views/Dashboard/Patients/patients.vue'
import addPatient from '../views/Dashboard/Patients/addPatient.vue'
import doctors from '../views/Dashboard/Doctors/doctors.vue'
import addDoctor from '../views/Dashboard/Doctors/addDoctor.vue'
import Booking from '../views/Dashboard/Booking/bookings.vue'
// import Rates from '../views/Dashboard/Rates&Reviews/rates&reviews.vue'
import Pages from '../views/Dashboard/Pages/pages.vue'
import Locations from '../views/Dashboard/Locations/locations.vue'
import Contacts from '../views/Dashboard/Contacts/contacts.vue'
import Specializations from '../views/Dashboard/Specializations/specializations.vue'
import services from '../views/Dashboard/services/services.vue'
import addService from '../views/Dashboard/services/addService.vue'
import feedback from '../views/Dashboard/Feedback/feedback.vue'
import addFeedback from '../views/Dashboard/Feedback/addFeedback.vue'
import addPage from '../views/Dashboard/Pages/addPage.vue'




const routes = [

    // {
    //     path: '/Rates&Reviews',
    //     name: 'Rates',
    //     component: Rates,
    //     meta: {
    //         title: 'Dashboard--Rates&Reviews'
    //     }
    // },

    {
        path: '/patients',
        name: 'patients',
        component: patients,
        meta: {
            title: 'Dashboard--patients'
        }
    },
    {
        path: '/addPatient',
        name: 'addPatient',
        component: addPatient,
        meta: {
            title: 'Dashboard--addPatient'
        }
    },

    
    
    {
        path: '/doctors',
        name: 'doctors',
        component: doctors,
        meta: {
            title: 'Dashboard--doctors'
        }
    },
    {
        path: '/addDoctor',
        name: 'addDoctor',
        component: addDoctor,
        meta: {
            title: 'Dashboard--addDoctor'
        }
    },

    
    

    {
        path: '/Booking',
        name: 'Booking',
        component: Booking,
        meta: {
            title: 'Dashboard--Booking'
        }
    },

   
   

    
    {
        path: '/pages',
        name: 'pages',
        component: Pages,
        meta: {
            title: 'Dashboard--pages'
        }
    },
    

    
    {
        path: '/contacts',
        name: 'contacts',
        component: Contacts,
        meta: {
            title: 'Dashboard--Contacts'
        }
    },

    {
        path: '/locations',
        name: 'Locations',
        component: Locations,
        meta: {
            title: 'Dashboard--Locations'
        }
    },

   
    {
        path: '/specializations',
        name: 'specializations',
        component: Specializations,
        meta: {
            title: 'Dashboard--Specializations'
        }
    },
    {
        path: '/services',
        name: 'services',
        component: services,
        meta: {
            title: 'Dashboard--services'
        }
    },
    {
        path: '/addService',
        name: 'addService',
        component: addService,
        meta: {
            title: 'Dashboard--addService'
        }
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: feedback,
        meta: {
            title: 'Dashboard--feedback'
        }
    },
    {
        path: '/addFeedback',
        name: 'addFeedback',
        component: addFeedback,
        meta: {
            title: 'Dashboard--addFeedback'
        }
    },
    {
        path: '/addPage',
        name: 'addPage',
        component: addPage,
        meta: {
            title: 'Dashboard--addPage'
        }
    },
]




export default routes