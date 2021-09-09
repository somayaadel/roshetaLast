<template>
    <div class="dashboard"> 
         <b-field label="Arabic Title">
            <b-input v-model="ar_title" required></b-input>
        </b-field>
        <b-field label="English Title">
            <b-input v-model="en_title" required></b-input>
        </b-field>
        <b-field label="Arabic Description">
            <b-input  v-model="ar_description" required></b-input>
        </b-field>
        <b-field label="English Description">
            <b-input v-model="en_description" ></b-input>
        </b-field>
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
            ar_title:"",
            en_title:"",
            ar_description:"",
            en_description:"",
            speciality_id:"",
            specialities:[]

        }
    },
    mounted(){
       
        this.getSpecilities()
  },
    methods:{
        
    getSpecilities() {
      this.$http.get("/user/specilities").then(response => {
        this.specialities = response.data.data;
       
      });
    },
      checkFormInputs() {
      

      if (!this.ar_title ) {
         this.$buefy.dialog.confirm({
                    
                    message: 'Arabic Title Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      if (!this.en_title) {
         this.$buefy.dialog.confirm({
                    
                    message: 'English Title Is Required !',
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
        this.addService()
      }

      
    },
    
     addService(){
      this.$http.post("/user/services" , { 
         title: {
         en:this.en_title,
         ar:this.ar_title
       },
          description: {
            en:this.en_description,
            ar:this.ar_description
          },
       
          speciality: this.speciality_id
         
        },).then(response => {
            $(location).attr('href', '/services')
      });
    
    },
    }

    
    
}
</script>