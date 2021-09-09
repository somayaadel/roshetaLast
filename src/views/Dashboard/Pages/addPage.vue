<template>

    <div class="dashboard"> 
         <b-field   label="Arabic Title">
            <b-input v-model="title_arabic" required></b-input>
        </b-field>
        <b-field label="English Title">
            <b-input v-model="title_english" required></b-input>
        </b-field>
        <b-field label="Arabic Body ">
            <b-input  v-model="body_arabic" required></b-input>
        </b-field>
        <b-field label="English Body">
            <b-input v-model="body_english" required></b-input>
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
          
            title_arabic:"",
            title_english:"",
            body_arabic:"",
            body_english:"",
           
            

        }
    },
   
    methods:{

       checkFormInputs() {
      
      if (!this.title_arabic ) {
         this.$buefy.dialog.confirm({
                    
                    message: 'Arabic Title Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      if (!this.title_english) {
         this.$buefy.dialog.confirm({
                    
                    message: 'English Title Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      if(!this.body_arabic){
          this.$buefy.dialog.confirm({
                    
                    message: 'Arabic Body Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      if(!this.body_english){
          this.$buefy.dialog.confirm({
                    
                    message: 'English Body Is Required !',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$forceUpdate()
                })
      }
      else{
        this.addPage()
      }
     
     

     
    },
       
   
    
     addPage(){
      
      this.$http.post("/user/pages" , {
          
           title: 
                {
                    en:this.title_english,
                    ar:this.title_arabic
                }
      ,
          body: { 
                    en:this.body_english,
                    ar:this.body_arabic
                }
        },).then(response => {
             $(location).attr('href', '/pages')

      });
   
      this.$forceUpdate();
    
      
    },
    }

    
    
}
</script>