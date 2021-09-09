<template>
  <div class="dashboard">
       <div class="subheader">
              <h5 class="subheader_title">Rates and Reviews</h5>
             
              <router-link to="/addFeedback" type="button" class="btn subheader_button"  >Add Feedback</router-link>
      </div>
    <b-table
            :data="feedbacks"
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


                <b-table-column style="width:12%" class="padding"  label="Patient Name" sortable>
                    {{ props.row.patient_name }} 
                </b-table-column>
                <b-table-column style="width:53%" class="padding"  label="Comment" sortable>
                    {{ props.row.comment }}
                </b-table-column>
                <b-table-column class="padding"  label="Doctor Name" sortable>
                    {{ props.row.user_name }}
                </b-table-column>
                <b-table-column v-if="props.row.status == 0" class="padding"  label="Status" sortable>
                    Not Approved
                </b-table-column>
                <b-table-column v-if="props.row.status == 1" class="padding"  label="Status" sortable>
                    Approved
                </b-table-column>
                <b-table-column class="padding"  label="Rating" sortable>
                    {{ props.row.rating }}
                </b-table-column>
                
               
                <b-table-column class="padding"  label="Actions" sortable>
                    <i @click="deleteModal(props.row.id)" class="fas fa-trash-alt btn" ></i>
                    <i @click="showFeedback(props.row.id)" data-toggle="modal" data-target="#exampleModal2" class="fas fa-edit"></i>
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
        <h5 class="modal-title" id="exampleModalLabel">Edit Feedback</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div class="form-group">
            <label for="exampleFormControlSelect1">Patient Name</label>

              <select  v-model="patient_id" class="form-control" id="exampleFormControlSelect1">
                <option v-for="patient in patients" :key="patient.id" :value="patient.id">{{patient.first_name}}  {{patient.last_name}}</option>
              </select>
      </div>
        <b-field label="Comment">
            <b-input v-model="comment"></b-input>
        </b-field>
      <div class="form-group">
            <label for="exampleFormControlSelect1">Status</label>

              <select  v-model="status" class="form-control" id="exampleFormControlSelect1">
                <option value="1">Approved</option>
                <option value="0">Not Approved</option>
              </select>
        </div>
      
        <div class="form-group">
            <label for="exampleFormControlSelect1">Doctor Name</label>

              <select  v-model="user_id" class="form-control" id="exampleFormControlSelect1">
                <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">{{doctor.first_name}}  {{doctor.last_name}}</option>
              </select>
        </div>
        <b-field label="Rate">
            <b-input v-model="rating"></b-input>
        </b-field>
          
        
        
        
      </div>
      <div class="modal-footer">
        <button @click="updateFeedback()"  type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
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
                
                feedbacks: [],
                doctors: [],
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
                patient_id:"",
                comment:"",
                status:"",
                user_id:"",
                rating:"",
                id_show:0
               
               
            
            
                
            }
        },
        mounted() {
            this.getFeedbak()
            this.getPatients()
            this.getDoctors()
            
            
        },
        components: {
            
        },
        created() {
            // this.$router.replace({hash: '#/1'});
         },
        methods: {
    getFeedbak() {
       const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.get("/user/feedback").then(response => {
        
        this.feedbacks = response.data.data;
        this.perPage = response.data.per_page
      });
    },
   getPatients() {
      this.$http.get("/user/users").then(response => {

        this.patients = response.data.data.data;
        
      });
    },
     getDoctors() {
      this.$http.get("/user/doctors").then(response => {
        this.doctors = response.data.data.data;
       
      });
    },
     deleteFeedback(id){
        const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.delete("/user/feedback/"+id).then(response => {
        this.getFeedbak();
      });
    
    },
    showFeedback(id){
       this.$http.get("/user/feedback/"+id).then(response => {
        
       
          this.patient_id =response.data.data.patient_id,
          this.rating =response.data.data.rating,
          this.comment =response.data.data.comment,
          this.status = response.data.data.status,
          this.user_id = response.data.data.user_id,
          this.id_show = response.data.data.id

      });
     
    },
   updateFeedback(){
       const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
       this.$http.put("/user/feedback/"+this.id_show , { 
           user_id: this.user_id,
          rating: this.rating,
          comment: this.comment,
          patient_id: this.patient_id,
          status:this.status
          
        },).then(response => {

      });
      this.$forceUpdate();
     this.getFeedbak();
    },
    deleteModal(id){
     
                this.$buefy.dialog.confirm({
                    title: 'Deleting Feedback',
                    message: 'Are you sure you want to <b>delete</b> This Feedback ?',
                    confirmText: 'Delete',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteFeedback(id)
                })
               this.$forceUpdate();
              
    // this.$swal('Do You Want To Delete This Location ?');
   
    },
   
   
  },
         
}
</script>