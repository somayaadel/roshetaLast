<template>
    <div class="dashboard"> 
         <b-field label="First Name">
            <b-input v-model="first_name" required></b-input>
        </b-field>
        <b-field label="Last Name">
            <b-input v-model="last_name" required></b-input>
        </b-field>
        <b-field label="Email">
            <b-input type="email" v-model="email" required></b-input>
        </b-field>
        <b-field label="Mobile">
            <b-input v-model="mobile" required></b-input>
        </b-field>
        <b-field label="Password">
            <b-input v-model="password" required></b-input>
        </b-field>
        <b-field label="Confirm Password">
            <b-input v-model="password_confirmation" required></b-input>
        </b-field>
        <div class="form-group">
            <label for="exampleFormControlSelect1">Location</label>

              <select  v-model="location" class="form-control" id="exampleFormControlSelect1">
                <option v-for="location in locations" :key="location.id" :value="location.id" required>{{location.title_english}}  {{location.title_arabic}}</option>
              </select>
      </div>
        <div class="form-group">
            <label for="exampleFormControlSelect1">speciality</label>

              <select  v-model="speciality_id" class="form-control" id="exampleFormControlSelect1">
                <option v-for="speciality in specialities" :key="speciality.id" :value="speciality.id" required>{{speciality.title_english}}  {{speciality.title_arabic}}</option>
              </select>
      </div>
       <div class="modal-footer">
        <button  @click="checkFormInputs" type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            first_name:"",
            last_name:"",
            mobile:"",
            email:"",
            password:"",
            password_confirmation:"",
            location:"",
            speciality_id:"",
            role_id:"",
            locations:[],
            specialities:[]

        }
    },
    mounted(){
        this.getLocations()
        this.getSpecilities()
  },
    methods:{
        getLocations() {
      this.$http.get("/user/locations").then(response => {
        this.locations = response.data.data;
      });
    },
    getSpecilities() {
      this.$http.get("/user/specilities").then(response => {
        this.specialities = response.data.data;
        console.log(this.specialities)
      });
    },
      checkFormInputs() {
      

      if (!this.first_name ) {
         this.$buefy.dialog.confirm({
                    
                    message: 'First Name Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      if (!this.last_name) {
         this.$buefy.dialog.confirm({
                    
                    message: 'Last Name Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      if(!this.email){
          this.$buefy.dialog.confirm({
                    
                    message: 'Email Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      if(!this.mobile){
          this.$buefy.dialog.confirm({
                    
                    message: 'Mobile Number Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      if(!this.password){
          this.$buefy.dialog.confirm({
                    
                    message: 'Password Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      if(!this.password_confirmation || (this.password!=this.password_confirmation)){
          this.$buefy.dialog.confirm({
                    
                    message: 'Confirm Your Password!',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      if(!this.location){
          this.$buefy.dialog.confirm({
                    
                    message: 'Location Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
       if(!this.speciality_id){
          this.$buefy.dialog.confirm({
                    
                    message: 'Speciality Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      
      else{
        this.addDoctor()
      }

      
    },
    
     addDoctor(){
      this.$http.post("/user/doctors" , { 
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          mobile: this.mobile,
          password:this.password,
          password_confirmation:this.password_confirmation,
          role_id:2,
          location:this.location,
          speciality_id:this.speciality_id
         
        },).then(response => {
            $(location).attr('href', '/doctors')
      });
    
    },
    }

    
    
}
</script>