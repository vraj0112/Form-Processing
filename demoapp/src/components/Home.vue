<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Name</label>
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control" v-model="fname" placeholder="First Name" />
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control" v-model="lname" placeholder="Last Name" />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Email</label>
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control" placeholder="Email" v-model="email"/>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Contact No</label>
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control" placeholder="Contact No" v-model="contactno" />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Birth Date</label>
          </div>
          <div class="col-md-6">
            <input type="date" class="form-control" placeholder="Contact No" v-model="birthdate"/>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Semester</label>
          </div>
          <div class="col-md-6">
            <select name="" id="" class="form-select" v-model="semester">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Course</label>
          </div>
          <div class="col-md-6">
            <select name="" id="" class="form-select" v-model="course">
              <option value="B.Tech Computer Engineering">B.Tech Computer Engineering</option>
              <option value="B.Tech Information Technology">B.Tech Information Technology</option>
            </select>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <button class="btn btn-primary" @click="registerStudent">Register</button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <img src="../../public/Images/Nerd-rafiki.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Home",
  data() {
    return{
      fname: "",
      lname: "",
      email: "",
      contactno: "",
      birthdate: "",
      semester: "",
      course: ""
    }
  },
  methods: {
    registerStudent: function() {

      axios.post("/api/student", {
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        contactno: this.contactno,
        birthdate: this.birthdate,
        semester: this.semester,
        course: this.course
      }).then((res) => {
        if(res.data.msg === "Validation Failed"){
          let errors = res.data.errors;
          let errorMsg = "";
          if(errors.fname.length != 0){
            for(let i=0; i<errors.fname.length; i++){
              errorMsg += `${errors.fname[i]}\n`;
            }
          } 
          
          if(errors.lname.length != 0){
            for(let i=0; i<errors.lname.length; i++){
              errorMsg += `${errors.lname[i]}\n`;
            }
          }

          if(errors.email.length != 0){
            for(let i=0; i<errors.email.length; i++){
              errorMsg += `${errors.email[i]}\n`;
            }
          }

          if(errors.contactno.length != 0){
            for(let i=0; i<errors.contactno.length; i++){
              errorMsg += `${errors.contactno[i]}\n`;
            }
          }

          if(errors.birthdate.length != 0){
            for(let i=0; i<errors.birthdate.length; i++){
              errorMsg += `${errors.birthdate[i]}\n`;
            }
          }

          if(errors.semester.length != 0){
            for(let i=0; i<errors.semester.length; i++){
              errorMsg += `${errors.semester[i]}\n`;
            }
          }

          if(errors.course.length != 0){
            for(let i=0; i<errors.course.length; i++){
              errorMsg += `${errors.course[i]}\n`;
            }
          }

          alert(errorMsg);
        }
        else{
          alert("Successfully Saved");
        }

      }).catch(()=>{
        alert("Something Went Wrong");
      })
    }
  }
};
</script>

<style scoped>
img {
  height: 500px;
}
</style>
