<template>
  <div class="dashboard">
       <div class="subheader">
              <h5 class="subheader_title">Doctors</h5>
             
              <router-link to="/addDoctor" type="button" class="btn subheader_button"  >Add Doctor</router-link>
      </div>
    <b-table
            :data="doctors"
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
                    {{ props.row.first_name }} {{ props.row.last_name }}
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
                <b-table-column v-if="props.row.specialities.length == 0" class="padding"  label="English Speciality" sortable>
                    No Items Found
                </b-table-column>
                <b-table-column v-if="props.row.specialities.length == 0" class="padding"  label="Arabic Speciality" sortable>
                    No Items Found
                </b-table-column>
                <b-table-column v-if="props.row.specialities.length" v-for="speciality in props.row.specialities"  :key="speciality.id" class="padding"  label="English Speciality" sortable>
                   {{speciality.title.en}}
                </b-table-column>
                <b-table-column v-if="props.row.specialities.length" v-for="speciality in props.row.specialities"  :key="speciality.id" class="padding"  label="Arabic Speciality" sortable>
                   {{speciality.title.ar}}
                </b-table-column>
                <b-table-column v-if="props.row.user_verified == 1"  class="padding"  label="user_verified" sortable>
                     <i class="fas fa-check "></i>
                </b-table-column>
                <b-table-column v-else class="padding"  label="user_verified" sortable>
                   <i class="fas fa-times"></i>
                </b-table-column>
                <b-table-column class="padding"  label="Actions" sortable>
                    <i @click="deleteModal(props.row.id)" class="fas fa-trash-alt btn" ></i>
                    <i @click="showDoctor(props.row.id)" data-toggle="modal" data-target="#exampleModal2" class="fas fa-edit"></i>
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
        <h5 class="modal-title" id="exampleModalLabel">Edit Location</h5>
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
        <div class="form-group">
            <label for="exampleFormControlSelect1">speciality</label>

              <select  v-model="speciality_id" class="form-control" id="exampleFormControlSelect1">
                <option v-for="speciality in specialities" :key="speciality.id" :value="speciality.id">{{speciality.title_english}}  {{speciality.title_arabic}}</option>
              </select>
      </div>
        
      </div>
      <div class="modal-footer">
        <button @click="updateDoctor()"  type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
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
                
                doctors: [],
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
            speciality_id:"",
            id_show:0,
            locations:[],
            specialities:[]
               
            }
        },
        mounted() {
            this.getDoctors()
            this.getLocations()
            this.getSpecilities()
        },
        components: {
            
        },
        
        methods: {
    getDoctors() {
       const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.get("/user/doctors").then(response => {
        this.doctors = response.data.data.data;
        
        this.perPage = response.data.data.per_page
      });
    },
     getLocations() {
      this.$http.get("/user/locations").then(response => {
        this.locations = response.data.data;
      });
    },
    getSpecilities() {
      this.$http.get("/user/specilities").then(response => {
        this.specialities = response.data.data;
      });
    },
   
     deleteDoctor(id){
        const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.delete("/user/doctors/"+id).then(response => {
        this.getDoctors();
      });
    
    },
    showDoctor(id){
       this.$http.get("/user/doctors/"+id).then(response => {
        
        
          this.first_name =response.data.data.first_name,
           this.last_name =response.data.data.last_name,
          this.email =response.data.data.email,
          this.mobile = response.data.data.mobile,
          this.location = response.data.data.location_id,
          this.speciality_id = response.data.data.specialities[0].id
          this.id_show = response.data.data.id

      });
     
    },
    updateDoctor(){
       const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
       this.$http.put("/user/doctors/"+this.id_show , { 
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          mobile: this.mobile,
          location: this.location,
          speciality_id: this.speciality_id
        },).then(response => {

      });
      this.$forceUpdate();
     this.getDoctors();
    },
    deleteModal(id){
     
                this.$buefy.dialog.confirm({
                    title: 'Deleting Doctor',
                    message: 'Are you sure you want to <b>delete</b> This Doctor ?',
                    confirmText: 'Delete',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteDoctor(id)
                })
               this.$forceUpdate();
              
    // this.$swal('Do You Want To Delete This Location ?');
   
    },
   
   
  },
         
}
</script>