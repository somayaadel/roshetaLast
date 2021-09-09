<template>
  <div class="dashboard">
       <div class="subheader">
              <h5 class="subheader_title">Patients</h5>
             
              <router-link to="/addPatient" type="button" class="btn subheader_button"  >Add Patient</router-link>
      </div>
    <b-table
            :data="patients"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :pagination-position="paginationPosition"
            :default-sort-direction="defaultSortDirection"
            default-sort="user.en_name"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <template slot-scope="props">


                <b-table-column class="padding"  label="Name" sortable>
                    {{ props.row.first_name }}  {{ props.row.last_name }}
                </b-table-column>
                <b-table-column class="padding"  label="Email" sortable>
                    {{ props.row.email }}
                </b-table-column>
                <b-table-column class="padding"  label="Mobile" sortable>
                    {{ props.row.mobile }}
                </b-table-column>
                <b-table-column class="padding"  label="Arabic Location" sortable>
                    {{ props.row.location.title.ar }}
                </b-table-column>
                <b-table-column class="padding"  label="English Location" sortable>
                    {{ props.row.location.title.en }}
                </b-table-column>
                <b-table-column v-if="props.row.user_verified == 1" class="padding"  label="user_verified" sortable>
                    <i class="fas fa-check "></i>
                </b-table-column>
                <b-table-column v-else class="padding"  label="user_verified" sortable>
                     <i class="fas fa-times"></i>
                </b-table-column>
                <b-table-column class="padding"  label="Actions" sortable>
                    <i @click="deleteModal(props.row.id)" class="fas fa-trash-alt btn" ></i>
                    <i @click="showPatient(props.row.id)" data-toggle="modal" data-target="#exampleModal2" class="fas fa-edit"></i>
                </b-table-column>


            </template>
            <template slot="empty" v-if="!isLoading && isEmpty">
                        <section class="section">
                            <div class="content has-text-grey has-text-centered">
                                <p>
                                    <b-icon
                                    icon="emoticon-sad"
                                    size="is-large">
                                </b-icon>
                            </p>
                            <p>Nothing here.</p>
                        </div>
                    </section>
                    <hr>
                </template>
        </b-table>
          <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Patient</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <b-field label="First Name">
            <b-input v-model="first_name"></b-input>
        </b-field>
        <b-field label="Last Name">
            <b-input v-model="last_name"></b-input>
        </b-field>
        <b-field label="Mobile">
            <b-input v-model="mobile"></b-input>
        </b-field>
        <b-field label="Email">
            <b-input v-model="email"></b-input>
        </b-field>
        
        <div class="form-group">
            <label for="exampleFormControlSelect1">Location</label>

              <select  v-model="location" class="form-control" id="exampleFormControlSelect1">
                <option v-for="location in locations" :key="location.id" :value="location.id">{{location.title_english}} {{location.title_arabic}}</option>
              </select>
      </div>
        
        
      </div>
      <div class="modal-footer">
        <button @click="updatePatient()"  type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
      </div>
    </div>
  </div>
</div>
        
   
  </div>
  
</template>
<script>
export default {
   data() {
            return {
                
                patients: [],
                isEmpty: false,
                isPaginated: true,
                isPaginationSimple: false,
                defaultSortDirection: 'desc',
                total: 0,
                page: parseInt(this.$route.hash.split('/')[1]),
                perPage: 10,
                isLoading: true,
                isFullPage: true,
                paginationPosition: 'bottom',
                currentPage: 1,
                first_name:"",
                last_name:"",
                mobile:"",
                email:"",
                password:"",
                password_confirmation:"",
                location:"",
                id_show:0,
                locations:[],
               
            
            
                
            }
        },
        mounted() {
            this.getPatients()
            this.getLocations()
        },
        components: {
            
        },
        created() {
            // this.$router.replace({hash: '#/1'});
         },
        methods: {
    getPatients() {
      const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.get("/user/users").then(response => {
        this.patients = response.data.data.data;
        this.perPage = response.data.data.per_page
      });
    },
     getLocations() {
      this.$http.get("/user/locations").then(response => {
        this.locations = response.data.data;
      });
    },
   
     deletePatient(id){
        const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
       
      this.$http.delete("/user/users/"+id).then(response => {
        this.getPatients();
      });
    
    },
    showPatient(id){
      
       this.$http.get("/user/users/"+id).then(response => {
        
       
          this.first_name =response.data.data.first_name,
          this.last_name =response.data.data.last_name,
          this.email =response.data.data.email,
          this.mobile = response.data.data.mobile,
          this.location = response.data.data.location_id,
          this.id_show = response.data.data.id

      });
     
    },
   updatePatient(){
      const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      console.log(this.id_show)
       this.$http.put("/user/users/"+this.id_show , { 
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          mobile: this.mobile,
          location: this.location,
          
        },).then(response => {

      });
      this.$forceUpdate();
     this.getPatients();
    },
    deleteModal(id){
     
                this.$buefy.dialog.confirm({
                    title: 'Deleting Patient',
                    message: 'Are you sure you want to <b>delete</b> This Patient ?',
                    confirmText: 'Delete',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deletePatient(id)
                })
               this.$forceUpdate();
              
    // this.$swal('Do You Want To Delete This Location ?');
   
    },
   
   
  },
         
}
</script>