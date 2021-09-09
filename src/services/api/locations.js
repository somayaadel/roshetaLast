import http from '../../http'
// import destroyRow from '../../plugins/custom-global-functions'


export default {
    getLocations(){
        return http.get('/locations ')
        .then(res => {
            return res;
        });
    },
}