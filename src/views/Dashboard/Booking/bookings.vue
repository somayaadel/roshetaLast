<template>
  <div class="dashboard">
       <div class="subheader">
              <h5 class="subheader_title">Bookings</h5>
             
      </div>
       <div class="subheader filters">
              
              <h5  class="subheader_title">Status :</h5>
              <select  class="form-control" style="display:inline-block; width:23%;margin-top: 6px;margin-left: 3%;" v-model="status"  id="exampleFormControlSelect1">
                <option value="pending" >Pending </option>
                <option value="accepted" >Accepted </option>
                <option value="rejected" >Rejected </option>
                <option value="completed" >Completed </option>
                
              </select>
              <h5 style="margin-left:10%" class="subheader_title">Charge :</h5>
              <select class="form-control" style="display:inline-block; width:23%;margin-top: 6px;margin-right: 21%;" v-model="charge"  id="exampleFormControlSelect1">
                <option value="100" >less than 100 </option>
                <option value="200" >less than 200 </option>
                <option value="400" >less than 400 </option>
                <option value="1000" >less than 1000 </option>
                <option value="3000" >less than 3000 </option>
                <option value="5000" >less than 5000 </option>
                <option value="10000" >less than 10000 </option>
              </select>
               <div class="columns">
                 <div class="column is-4">
               <h5  class="subheader_title">Date From :</h5>
              <b-field >
               
            <b-datepicker
                
                v-model="dateFrom"
                style="    margin-top: -14%;
    margin-left: 31%;width: 72%;"
              
                placeholder="Click to select..."
                icon="calendar-today"
                trap-focus>
            </b-datepicker>
        </b-field>
                 </div>
                 <div class="column is-4">
               <h5 style="margin-left:27%" class="subheader_title">Date To :</h5>
              <b-field  >
            <b-datepicker
               style="       margin-top: -14%;
    margin-left: 52%;
    width: 72%;"
                v-model="dateTo"
                
                placeholder="Click to select..."
                icon="calendar-today"
                trap-focus>
            </b-datepicker>
        </b-field>
       </div>
               </div>

                <div class="modal-footer">
        <button @click="filterBooking" type="button" class="btn btn-primary" data-dismiss="modal">Filter</button>
        <button style="float:left" @click="getBookings" type="button" class="btn btn-primary" data-dismiss="modal">Get All Bookings</button>
      </div>
               
              <!-- <button type="button" class="btn subheader_button"  data-toggle="modal" data-target="#exampleModal">Add Booking</button> -->
      </div>
     
             
    <b-table
            :data="bookings"
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
                <b-table-column class="padding"  label="Doctor Name" sortable>
                    {{ props.row.user.first_name }}  {{ props.row.user.last_name }}
                </b-table-column>
                <b-table-column class="padding"  label="Patient Name" sortable>
                    {{ props.row.patient_name }}
                </b-table-column>
                <b-table-column class="padding"  label="Appointment Time" sortable>
                    {{ props.row.appointment_time }}
                </b-table-column>
                <b-table-column class="padding"  label="Appointment Date" sortable>
                    {{ props.row.appointment_date }}
                </b-table-column>
                <b-table-column class="padding"  label="Charges" sortable>
                    {{ props.row.charges }}
                </b-table-column>
                <b-table-column class="padding"  label="Status" sortable>
                    {{ props.row.status }}
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
        
            
            
       <div>
        <b-field>
           
        </b-field>
        <b-field>
            
        </b-field>
        <b-notification ref="element" :closable="false">
         
        </b-notification>
    </div>
      

  </div>
  
</template>
<script>
import moment from 'moment'

export default {
   data() {
            return {
                
                bookings: [],
                isEmpty: false,
                isPaginated: true,
                isPaginationSimple: false,
                defaultSortDirection: 'desc',
                total: 0,
                page: parseInt(this.$route.hash.split('/')[1]),
                perPage: 10,
                isLoading: false,
                isFullPage: true,
                paginationPosition: 'bottom',
                currentPage: 1,
                status:'',
                charge:'',
                dateFrom:'',
                dateTo:''
               
            
            
                
            }
        },
        mounted() {
            this.getBookings()
        },
        
        components: {
            
        },
       
         methods: {
          
            getBookings() {
             const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2* 1000)
             
      this.$http.get("/user/bookings").then(response => {
        
        this.bookings = response.data.data;
        this.perPage = response.data.meta.per_page
        
      });
             
      
      
       
    },
    filterBooking(){
       const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2* 1000)
                if(this.dateTo && this.dateFrom){
                this.dateFrom =  moment(String(this.dateFrom)).format('YYYY-MM-DD')
                this.dateTo =  moment(String(this.dateTo)).format('YYYY-MM-DD')
                }
                 if ( (!this.dateTo && this.dateFrom) || (!this.dateFrom && this.dateTo)  ) {
         this.$buefy.dialog.confirm({
                    
                    message: ' Please Insert the other date to filter By Date',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
        this.$http.get("/user/bookings?page=1&status="+ this.status+"&charges="+this.charge+"&from_date="+this.dateFrom+"&to_date="+this.dateTo
        ).then(response => {
           
            this.bookings = response.data.data;
      });
    
       
    },
     format_date(){
        
            console.log( moment(String(this.dateFrom)).format('YYYY-MM-DD') )
          
        
      },
    
         }
}
</script>