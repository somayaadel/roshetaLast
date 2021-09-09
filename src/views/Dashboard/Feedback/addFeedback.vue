<template>
    <div class="dashboard"> 
         <div class="form-group">
            <label for="exampleFormControlSelect1">Doctor Name</label>

              <select  v-model="user_id" class="form-control" id="exampleFormControlSelect1">
                <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id" required>{{doctor.first_name}}  {{doctor.last_name}}</option>
              </select>
        </div>
       <div class="form-group">
            <label for="exampleFormControlSelect1">Patient Name</label>

              <select  v-model="patient_id" class="form-control" id="exampleFormControlSelect1">
                <option v-for="patient in patients" :key="patient.id" :value="patient.id" required>{{patient.first_name}}  {{patient.last_name}}</option>
              </select>
      </div>
       <b-field label="Rate">
            <b-input v-model="rating" required></b-input>
        </b-field>
        <b-field label="Comment">
            <b-input v-model="comment" required></b-input>
        </b-field>
       
       <div class="modal-footer">
        <button  @click="checkFormInputs" type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
               patient_id:"",
                comment:"",
                user_id:"",
                rating:"",
            doctors:[],
            patients:[]

        }
    },
    mounted(){
       
        this.getPatients()
        this.getDoctors()
  },
    methods:{
        
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
      checkFormInputs() {
      

      if (!this.patient_id ) {
         this.$buefy.dialog.confirm({
                    
                    message: 'Patient Name Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      if (!this.comment) {
         this.$buefy.dialog.confirm({
                    
                    message: 'Comment Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      if(!this.user_id){
          this.$buefy.dialog.confirm({
                    
                    message: 'Doctor Name Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      if(!this.rating){
          this.$buefy.dialog.confirm({
                    
                    message: 'Rate Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      
      
      
      else{
        this.addFeedback()
      }

      
    },
    
     addFeedback(){
      this.$http.post("/user/feedback" , { 
        
          user_id: this.user_id,
          rating: this.rating,
          comment: this.comment,
          patient_id: this.patient_id
         
        },).then(response => {
            $(location).attr('href', '/feedback')
      });
    
    },
    }

    
    
}
</script>