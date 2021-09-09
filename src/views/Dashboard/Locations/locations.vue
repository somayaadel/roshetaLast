<template>
  <div class="dashboard">
       <div class="subheader">
              <h5 class="subheader_title">Locations</h5>
             
              <button type="button" class="btn subheader_button"  data-toggle="modal" data-target="#exampleModal">Add Location</button>
      </div>
    <b-table
            :data="locations"
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
                <!-- <b-table-column  label="ID" width="40" sortable numeric >
                    {{ props.row.id }}
                </b-table-column> -->

                <b-table-column class="padding"  label="Arabic Name" sortable>
                    {{ props.row.title_arabic }}
                </b-table-column>
                <b-table-column class="padding"  label="English Name" sortable>
                    {{ props.row.title_english }}
                </b-table-column>
                
                <b-table-column class="padding"  label="Actions" sortable>
                    <i @click="deleteModal(props.row.id)" class="fas fa-trash-alt btn" ></i>
                    <i @click="showLocation(props.row.id)" data-toggle="modal" data-target="#exampleModal2" class="fas fa-edit"></i>
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
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Location</h5>
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
      </div>
      <div class="modal-footer">
        <button  @click="checkFormInputs" type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
      </div>
    </div>
  </div>
</div>
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
        <b-field label="English Title">
            <b-input v-model="title_english_show"></b-input>
        </b-field>
        <b-field label="Arabic Title">
            <b-input v-model="title_arabic_show"></b-input>
        </b-field>
        
      </div>
      <div class="modal-footer">
        <button @click="updateLocation()"  type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
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
                
                locations: [],
                title_english:"",
                title_arabic:"",
                title_english_show:"",
                title_arabic_show:"",
                id_show :0,
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
              
               
            
            
                
            }
        },
        mounted() {
            this.getLocations()
        },
        components: {
            
        },
        created() {
            // this.$router.replace({hash: '#/1'});
         },
         methods: {
           
            getLocations() {
               const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.get("/user/locations").then(response => {
        this.locations = response.data.data;
       
        this.perPage = response.data.data.per_page
       
        
      });
    },
    checkFormInputs(){
      if(!this.title_arabic){
        this.$buefy.dialog.confirm({
                    
                    message: 'Arabic Title Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }if(!this.title_english){
        this.$buefy.dialog.confirm({
                    
                    message: 'English Title Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }else{
this.addLocation()

      }
    },
    addLocation(){
       const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.post("/user/locations" , { 
        title:{ 
               en:this.title_english,
               ar: this.title_arabic
        }
        }).then(response => {
      });
      // this.$router.go(0);
      this.$forceUpdate();
      this.getLocations()
    },
     deleteLocation(id){
        const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.delete("/user/locations/"+id).then(response => {
        this.$forceUpdate();
      this.getLocations()
      });
    
    },
    showLocation(id){
       this.$http.get("/user/locations/"+id+"/edit").then(response => {
        
         this.title_english_show = response.data.data.title_english
         this.title_arabic_show = response.data.data.title_arabic
         this.id_show = response.data.data.id
      });
      this.title_show = ""
     
    },
    updateLocation(){
     const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
       this.$http.put("/user/locations/"+this.id_show , {
         title:{ 
               en:this.title_english_show,
               ar: this.title_arabic_show
        }
        },).then(response => {
      });
      this.$forceUpdate();
      this.getLocations()
    },
    deleteModal(id){
     
                this.$buefy.dialog.confirm({
                    title: 'Deleting Location',
                    message: 'Are you sure you want to <b>delete</b> This Location ?',
                    confirmText: 'Delete',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteLocation(id)
                })
               this.$forceUpdate();
              // this.getLocations()
    // this.$swal('Do You Want To Delete This Location ?');
   
    },
         }
}
</script>