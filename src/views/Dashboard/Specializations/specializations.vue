<template>
  <div class="dashboard">
       <div class="subheader">
              <h5 class="subheader_title">specilities</h5>
             
              <button type="button" class="btn subheader_button"  data-toggle="modal" data-target="#exampleModal">Add specility</button>
      </div>
    <b-table
            :data="specilities"
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
                <b-table-column class="padding"  label="Arabic Description" sortable>
                    {{ props.row.description_arabic }}
                </b-table-column>
                <b-table-column class="padding"  label="English Description" sortable>
                    {{ props.row.description_arabic_english }}
                </b-table-column>
                <b-table-column class="padding"  label="Actions" sortable>
                    <i @click="deleteModal(props.row.id)" class="fas fa-trash-alt btn" ></i>
                    <i @click="showSpecility(props.row.id)" data-toggle="modal" data-target="#exampleModal2" class="fas fa-edit"></i>
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
        <h5 class="modal-title" id="exampleModalLabel">Add specility</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <b-field label="English Title">
            <b-input v-model="en_title" required></b-input>
        </b-field>
        <b-field label="Arabic Title">
            <b-input v-model="ar_title" required></b-input>
        </b-field>
        <b-field label="English Description">
            <b-input v-model="en_description" required></b-input>
        </b-field>
        <b-field label="Arabic Description">
            <b-input v-model="ar_description" required></b-input>
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
        <h5 class="modal-title" id="exampleModalLabel">Edit speciality</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <b-field label="Arabic Title">
            <b-input v-model="ar_title_show"></b-input>
        </b-field>
        <b-field label="English Title">
            <b-input v-model="en_title_show"></b-input>
        </b-field>
        <b-field label="Arabic Description">
            <b-input v-model="ar_description_show"></b-input>
        </b-field>
        <b-field label="English Description">
            <b-input v-model="en_description_show"></b-input>
        </b-field>
      </div>
      <div class="modal-footer">
        <button @click="updateSpecility()"  type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
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
                
               specilities: [],
                en_title:"",
                ar_title:"",
                en_description:"",
                ar_description:"",
                en_title_show:"",
                en_description_show:"",
                ar_title_show:"",
                ar_description_show:"",
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
            this.getSpecilities()
        },
        components: {
            
        },
        created() {
            // this.$router.replace({hash: '#/1'});
         },
        methods: {
    getSpecilities() {
       const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.get("/user/specilities").then(response => {
        this.specilities = response.data.data;
        
        this.perPage = response.data.data.per_page
      });
    },
    checkFormInputs(){
            if(!this.en_title){
              this.$buefy.dialog.confirm({
                    
                    message: 'English Title Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
            }
            if(!this.ar_title){
              this.$buefy.dialog.confirm({
                    
                    message: 'Arabic Title Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
            }
            if(!this.ar_description){
              this.$buefy.dialog.confirm({
                    
                    message: 'Arabic Description Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
            }
            if(!this.en_description){
              this.$buefy.dialog.confirm({
                    
                    message: 'English Description Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
            }
            else{
              this.addSpecility()
            }

    },
    addSpecility(){
       const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.post("/user/specilities" , { title: 
      {
        en:this.en_title,
        ar:this.ar_title
        }
      ,
          description: { en:this.en_description,
          ar:this.ar_description}
        },).then(response => {

      });
      // this.$router.go(0);
      this.$forceUpdate();
      this.getSpecilities();
      
    },
     deleteSpecility(id){
        const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.delete("/user/specilities/"+id).then(response => {
        this.getSpecilities();
      });
    
    },
    showSpecility(id){
       this.$http.get("/user/specilities/"+id+"/edit").then(response => {
         
         this.ar_title_show = response.data.data.title_arabic
         this.en_title_show = response.data.data.title_english
         this.ar_description_show = response.data.data.description_arabic
         this.en_description_show = response.data.data.description_arabic_english
         this.id_show = response.data.data.id

      });
     

    },
    updateSpecility(){
      const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
       this.$http.put("/user/specilities/"+this.id_show , { title: {
         en:this.en_title_show,
         ar:this.ar_title_show
       },
          description: {
            en:this.en_description_show,
            ar:this.ar_description_show
          }
        },).then(response => {

      });
      this.$forceUpdate();
     this.getSpecilities();
    },
    deleteModal(id){
     
                this.$buefy.dialog.confirm({
                    title: 'Deleting Specility',
                    message: 'Are you sure you want to <b>delete</b> This Specility ?',
                    confirmText: 'Delete',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteSpecility(id)
                })
               this.$forceUpdate();
              
    // this.$swal('Do You Want To Delete This Location ?');
   
    },
   
   
  },
         
}
</script>