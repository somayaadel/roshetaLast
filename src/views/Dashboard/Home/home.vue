<template>
  
<div class="dashboard">
<div class="row gutters-20">
  <div class="col-xl-3 col-sm-6 col-12">
    <div class="dashboard-summery-one" >
      <div class="row align-items-center">
        <div class="col-6">
          <div class="item-icon bg-light-green ">
                 <i class="fas fa-user-injured icon"></i>
          </div>
             
        </div>
        <div class="col-md-6">
          <div class="item-content">
            <div class="item-title"> Patients </div>
            <div class="item-number">
              <span class="counter" data-num="150000">{{ this.statistics.patients}}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
         
  </div>
 <div class="col-xl-3 col-sm-6 col-12">
    <div class="dashboard-summery-one" >
      <div class="row align-items-center">
        <div class="col-6">
          <div class="item-icon bg-light-green">
                <i class="fas fa-user-md icon"></i>
          </div>
             
        </div>
        <div class="col-md-6">
          <div class="item-content">
            <div class="item-title"> Doctors </div>
            <div class="item-number">
              <span class="counter" data-num="150000">{{ this.statistics.doctors}}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
         
  </div>
 <div class="col-xl-3 col-sm-6 col-12">
    <div class="dashboard-summery-one" >
      <div class="row align-items-center">
        <div class="col-6">
          <div class="item-icon bg-light-green ">
              <i class="fas fa-check icon"></i>
          </div>
             
        </div>
        <div class="col-md-6">
          <div class="item-content">
            <div class="item-title">Services </div>
            <div class="item-number">
              <span class="counter" data-num="150000">{{ this.statistics.services}}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
         
  </div>
  <div class="col-xl-3 col-sm-6 col-12">
    <div class="dashboard-summery-one" >
      <div class="row align-items-center">
        <div class="col-6">
          <div class="item-icon bg-light-green ">
              <i class="fas fa-check icon"></i>
          </div>
             
        </div>
        <div class="col-md-6">
          <div class="item-content">
            <div class="item-title">Specialities </div>
            <div class="item-number">
              <span class="counter" data-num="150000">{{ this.statistics.specialities}}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
         
  </div>
  <div class="col-xl-3 col-sm-6 col-12">
    <div class="dashboard-summery-one" >
      <div class="row align-items-center">
        <div class="col-6">
          <div class="item-icon bg-light-green ">
                <i class="fas fa-arrow-alt-circle-right icon"></i>
          </div>
             
        </div>
         <div class="col-md-6">
          <div class="item-content">
            <div class="item-title"> Bookings </div>
            <div class="item-number">
              <span class="counter" data-num="150000">{{ this.statistics.bookings}}</span>
            </div>
          </div>

        </div>
        
      </div>
    </div>
         
  </div>
  <div class="col-xl-3 col-sm-6 col-12">
    <div class="dashboard-summery-one" >
      <div class="row align-items-center">
        <div class="col-6">
          <div class="item-icon bg-light-green">
                <i class="fas fa-users icon"></i>
          </div>
             
        </div>
        <div class="col-md-6">
          <div class="item-content">
            <div class="item-title"> New Contacts </div>
            <div class="item-number">
              <span class="counter" data-num="150000">{{ this.statistics.contacts}}</span>
            </div>
          </div>

        </div>
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
              statistics :[],
               isLoading: true,
                isFullPage: true,
            }
  },
  mounted() {
            this.getStatistics()
            
            
        },
          methods: {
    getStatistics() {
        const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 2 * 1000)
      
      this.$http.get("/user/statistics").then(response => {
        this.statistics = response.data.data;
      
       
      });
    },
          },
  beforeCreate() {
    document.body.className = "home-layout";
  }
};
</script>

<style></style>
