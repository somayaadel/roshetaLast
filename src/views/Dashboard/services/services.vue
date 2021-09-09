<template>
  <div class="dashboard">
       <div class="subheader">
              <h5 class="subheader_title">Services</h5>
             
              <router-link to="/addService" type="button" class="btn subheader_button"  >Add Service</router-link>
      </div>
    <b-table
            :data="services"
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


                <b-table-column class="padding"  label="Arabic Title" sortable>
                    {{ props.row.title_arabic }} 
                </b-table-column>
                <b-table-column class="padding"  label="English Title" sortable>
                    {{ props.row.title_english }}
                </b-table-column>
                <b-table-column class="padding"  label="Arabic Description" sortable>
                    {{ props.row.description_arabic }}
                </b-table-column>
                <b-table-column class="padding"  label="English Description" sortable>
                    {{ props.row.description_arabic_english }}
                </b-table-column>
                <b-table-column class="padding"  label="Arabic Speciality" sortable>
                    {{ props.row.speciality.title.ar }}
                </b-table-column>
                <b-table-column class="padding"  label="English Speciality" sortable>
                    {{ props.row.speciality.title.en }}
                </b-table-column>
                
               
                <b-table-column class="padding"  label="Actions" sortable>
                    <i @click="deleteModal(props.row.id)" class="fas fa-trash-alt btn" ></i>
                    <i @click="showService(props.row.id)" data-toggle="modal" data-target="#exampleModal2" class="fas fa-edit"></i>
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
        <h5 class="modal-title" id="exampleModalLabel">Edit Service</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <b-field label="Arabic Title">
            <b-input v-model="title_arabic"></b-input>
        </b-field>
        <b-field label="English Title">
            <b-input v-model="title_english"></b-input>
        </b-field>
        <b-field label="Arabic Description">
            <b-input v-model="description_arabic"></b-input>
        </b-field>
        <b-field label="English Description">
            <b-input v-model="description_arabic_english"></b-input>
        </b-field>
        
        <div class="form-group">
            <label for="exampleFormControlSelect1">Speciality</label>

              <select  v-model="speciality" class="form-control" id="exampleFormControlSelect1">
                <option v-for="speciality in specialities" :key="speciality.id" :value="speciality.id">{{speciality.title_english}}  {{speciality.title_arabic}}</option>
              </select>
      </div>
        
        
      </div>
      <div class="modal-footer">
        <button @click="updateService()"  type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
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
                
                services: [],
                specialities: [],
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
                title_arabic:"",
                title_english:"",
                description_arabic:"",
                description_arabic_english:"",
                speciality:"",
                id_show:0
               
               
            
            
                
            }
        },
        mounted() {
            this.getServices()
            this.getSpecilities()
            
        },
        components: {
            
        },
        created() {
            // this.$router.replace({hash: '#/1'});
         },
        methods: {
    getServices() {
       const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.get("/user/services").then(response => {
        this.services = response.data.data;
        this.perPage = response.data.per_page
      });
    },
   getSpecilities() {
      this.$http.get("/user/specilities").then(response => {
        this.specialities = response.data.data;
      });
    },
   
     deleteService(id){
        const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.delete("/user/services/"+id).then(response => {
        this.getServices();
      });
    
    },
    showService(id){
       this.$http.get("/user/services/"+id).then(response => {
        
       
          this.title_arabic =response.data.data.title_arabic,
          this.title_english =response.data.data.title_english,
          this.description_arabic =response.data.data.description_arabic,
          this.description_arabic_english = response.data.data.description_arabic_english,
          this.speciality = response.data.data.speciality.id,
          this.id_show = response.data.data.id

      });
     
    },
   updateService(){
       const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
       this.$http.put("/user/services/"+this.id_show , { 
           title: {
         en:this.title_english,
         ar:this.title_arabic
       },
          description: {
            en:this.description_arabic_english,
            ar:this.description_arabic
          },
       
          speciality: this.speciality
          
        },).then(response => {

      });
      this.$forceUpdate();
     this.getServices();
    },
    deleteModal(id){
     
                this.$buefy.dialog.confirm({
                    title: 'Deleting Service',
                    message: 'Are you sure you want to <b>delete</b> This Service ?',
                    confirmText: 'Delete',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteService(id)
                })
               this.$forceUpdate();
              
    // this.$swal('Do You Want To Delete This Location ?');
   
    },
   
   
  },
         
}
</script>