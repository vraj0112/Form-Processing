<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Contact No</th>
        <th>Birthdate</th>
        <th>Semester</th>
        <th>Course</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{student.id}}</td>
          <td>{{student.fname}}</td>
          <td>{{student.lname}}</td>
          <td>{{student.email}}</td>
          <td>{{student.contactno}}</td>
          <td>{{student.birthdate}}</td>
          <td>{{student.semester}}</td>
          <td>{{student.course}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Show",
  data() {
    return {
      students: {}
    }
  },
  mounted(){
    this.loadStudentsTable();
  },
  methods: {
    loadStudentsTable: function(){
      axios.get("/api/students").then((res) => {
        this.students = res.data.data;
      })
      .catch(()=>{
        console.log("Something Went Wrong");
      })
    }
  }
};
</script>
