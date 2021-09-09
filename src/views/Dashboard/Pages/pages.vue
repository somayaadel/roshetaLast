<template>
  <div class="dashboard">
       <div class="subheader">
              <h5 class="subheader_title">Pages</h5>
             
              <router-link to="/addPage" type="button" class="btn subheader_button"  >Add Page</router-link>
      </div>
    <b-table
            :data="pages"
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
                    {{ props.row.body_arabic }}
                </b-table-column>
                <b-table-column class="padding"  label="English Description" sortable>
                    {{ props.row.body_english }}
                </b-table-column>
                <b-table-column class="padding"  label="Actions" sortable>
                    <i @click="deleteModal(props.row.id)" class="fas fa-trash-alt btn" ></i>
                    <i @click="showPage(props.row.id)" data-toggle="modal" data-target="#exampleModal2" class="fas fa-edit"></i>
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
        <h5 class="modal-title" id="exampleModalLabel">Edit Page</h5>
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
            <b-input v-model="body_arabic"></b-input>
        </b-field>
        <b-field label="English Description">
            <b-input v-model="body_english"></b-input>
        </b-field>
      </div>
      <div class="modal-footer">
        <button @click="updatePage()"  type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
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
                
               pages: [],
                title_arabic:"",
                title_english:"",
                body_arabic:"",
                body_english:"",
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
            this.getPages()
        },
        components: {
            
        },
        created() {
            // this.$router.replace({hash: '#/1'});
         },
        methods: {
    getPages() {
       const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.get("/user/pages").then(response => {
        this.pages = response.data.data;
        
        this.perPage = response.data.data.per_page
      });
    },

   
     deletePage(id){
        const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.delete("/user/pages/"+id).then(response => {
        this.getPages();
      });
    
    },
    showPage(id){
       this.$http.get("/user/pages/"+id+"/edit").then(response => {
         
         this.title_arabic = response.data.data.title_arabic
         this.title_english = response.data.data.title_english
         this.body_arabic = response.data.data.body_arabic
         this.body_english = response.data.data.body_english
         this.id_show = response.data.data.id

      });
     

    },
    updatePage(){
      const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
       this.$http.put("/user/pages/"+this.id_show , { title: {
         en:this.title_english,
         ar:this.title_arabic
       },
          body: {
            en:this.body_english,
            ar:this.body_arabic
          }
        },).then(response => {

      });
      this.$forceUpdate();
     this.getPages();
    },
    deleteModal(id){
     
                this.$buefy.dialog.confirm({
                    title: 'Deleting Page',
                    message: 'Are you sure you want to <b>delete</b> This Page ?',
                    confirmText: 'Delete',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deletePage(id)
                })
               this.$forceUpdate();
              
    // this.$swal('Do You Want To Delete This Location ?');
   
    },
   
   
  },
         
}
</script>