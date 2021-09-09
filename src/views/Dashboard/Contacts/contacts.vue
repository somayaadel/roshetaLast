<template>
  <div class="dashboard">
       <div class="subheader">
              <h5 class="subheader_title">Contacts</h5>
             
      </div>
    <b-table
            :data="contacts"
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
                    {{ props.row.name }} 
                </b-table-column>
                <b-table-column class="padding"  label="Email" sortable>
                    {{ props.row.email }}
                </b-table-column>
                <b-table-column class="padding"  label="Phone" sortable>
                    {{ props.row.phone }}
                </b-table-column>
                <b-table-column class="padding"  label="Description" sortable>
                    {{ props.row.description }}
                </b-table-column>
                
               
                
               
                <b-table-column class="padding"  label="Actions" sortable>
                    <i @click="deleteModal(props.row.id)" class="fas fa-trash-alt btn" ></i>
                    <i @click="showContact(props.row.id)" data-toggle="modal" data-target="#exampleModal2" class="fas fa-edit"></i>
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
        <h5 class="modal-title" id="exampleModalLabel">Show Contact</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <b-field label="Name">
            <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="Email">
            <b-input v-model="email"></b-input>
        </b-field>
        <b-field label="Phone">
            <b-input v-model="phone"></b-input>
        </b-field>
        <b-field label="Description">
            <b-input v-model="description"></b-input>
        </b-field>
        
        
        
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
                
                contacts: [],
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
                name:"",
                email:"",
                phone:"",
                description:"",
                id_show:0
               
               
            
            
                
            }
        },
        mounted() {
            this.getContacts()
           
            
        },
        components: {
            
        },
        created() {
            // this.$router.replace({hash: '#/1'});
         },
        methods: {
    getContacts() {
       const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.get("/user/contacts").then(response => {
        this.contacts = response.data.data;
        this.perPage = response.data.per_page
      });
    },
  
   
     deleteContact(id){
        const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      this.$http.delete("/user/contacts/"+id).then(response => {
        this.getContacts();
      });
    
    },
    showContact(id){
       this.$http.get("/user/contacts/"+id).then(response => {
        
       
          this.name =response.data.data.name,
          this.email =response.data.data.email,
          this.phone =response.data.data.phone,
          this.description = response.data.data.description,
          this.id_show = response.data.data.id

      });
     
    },
 
    deleteModal(id){
     
                this.$buefy.dialog.confirm({
                    title: 'Deleting Contact',
                    message: 'Are you sure you want to <b>delete</b> This contact ?',
                    confirmText: 'Delete',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteContact(id)
                })
               this.$forceUpdate();
              
    // this.$swal('Do You Want To Delete This Location ?');
   
    },
   
   
  },
         
}
</script>