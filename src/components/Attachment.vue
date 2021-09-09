

<template>
  <div class="container">
    <div class="row">

<div class="col-md-3 upload">
    <input class="custom-file-input position-absolute" type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
    <button class="fas fa-briefcase fa-4x" v-on:click="addFiles()"></button>
</div>




  <div class="col-md-6 links" v-if="files.length >0">
         <div v-for="(file, index) in files" :key=index class="file-listing f-10" >{{ file.name }}
           <span class="remove-file" v-on:click="removeFile(index,file.id )">Remove</span>
          <span  v-if="Attachment.length>0"   class="pr-5"  ><a  class="remove-file text-danger"  :href="file.download_link">download</a></span>

         </div>
  </div>     
  

  <div class="col-md-3 " v-if="this.Attachment.length==0">
  <button class="btn btn-info mx text-center"  @click="submitFiles(id,url)">submit</button>
</div>
<div class="col-md-3 " v-else>
  <button class="btn btn-info mx text-center"  @click="update">update</button>
</div>

    </div>
  </div>
</template>
<style>
.upload {
  display: flex;
  justify-content: center;
  border: 1px dashed rgb(150, 148, 148);
  padding-top: 20px;
  padding-bottom: 20px;
}
.links {
  overflow-y: scroll;
  max-height: 170px;
}
div.file-listing {
  min-width: 200px;
  font-size: 13px;
  background-color: #09c;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px;
}

span.remove-file {
  color: red;
  cursor: pointer;
  float: right;
}
</style>

 
<script>
import { stringify } from "querystring";
export default {
  /*
      Defines the data used by the component
    */
    props: ["id","url"],

   
    data(){
      return {
        files: [],
        deletedFiles:[],
        Attachment:[],
        data:[],
      }
    },

    /*
      Defines the method used by the component
    */
   mounted (){
   if(this.url=="lead")
   this. getLeadFiles(this.id)
    else
   this. getCompanyFiles(this.id)

   },
    methods: {
     
     
      /*
        Adds a file
      */
    addFiles() {
      this.$refs.files.click();
    },

    /*
        Submits files to the server
      */
    submitFiles(id, type) {
      /*
          Initialize the form data
        */
      let formData = new FormData();

      /*
          Iteate over any file sent over appending the files
          to the form data.
        */
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];

        formData.append("files[" + i + "]", file);
      }

      /*
          Make the request to the POST /select-files URL
        */
      this.$http
        .post(type + "/" + id + "/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })

        .then(() => {
          // this.$http.post( type+'/'+id+'/upload')
          alertSuccess.fire({
            text: "Adeded succes"
          });
          for (var i = 0; i < this.files.length; i++) {
            this.files.splice(i);
          }
        });
    },

    //update files
    update() {
      const update = {
        media: {
          deletedFiles: this.deletedFiles
        }
      };
      console.log(update);
      this.$http.put("media/delete", update).then(() => {
        alertSuccess.fire({
          text: "Deleted succes"
        });
        for (var i = 0; i < this.deletedFiles.length; i++) {
          this.deletedFiles.splice(i);
        }
      });
    },

    /*
        Handles the uploading of files
      */
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;

      /*
          Adds the uploaded file to the files array
        */
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
    },

    /*
        Removes a select file the user has uploaded
      */
    removeFile(key, id) {
      if (typeof id !== "undefined") {
        this.deletedFiles.push(id);
      }
      this.files.splice(key, 1);
    },

    getLeadFiles(id) {
      this.$http
        .get("leads/" + id)
        .then(res => {
          this.data = res.data.data;
          this.Attachment = this.data.Files;
          for (var i = 0; i < this.Attachment.length; i++) {
            this.files.push(this.Attachment[i]);
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    getCompanyFiles(id) {
      this.$http
        .get("companies/" + id)
        .then(res => {
          this.data = res.data.data;
          this.Attachment = this.data.Files;
          for (var i = 0; i < this.Attachment.length; i++) {
            this.files.push(this.Attachment[i]);
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>