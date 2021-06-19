import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses : any;
  constructor(private router : Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  this.getAllCourses()
  }
  getAllCourses(){
 
      //const id = localStorage.getItem('userid')
       axios.get('http://127.0.0.1:8000/courses').then(res=>{
         this.courses = res.data;
       }).catch(err=>{
         console.log(err);
       })
   
    
  }
  searchCourse(event){
    console.log(event.target.value)
    axios.get('http://127.0.0.1:8000/courses/search/'+event.target.value).then(res=>{
      this.courses = res.data;
    }).catch(err=>{
      console.log(err);
    })
  }


  enrollCourse(course){
    if( localStorage.getItem('userid') == undefined || localStorage.getItem('userid') == null ){
        this.router.navigate(['/login'])
    }
    if( localStorage.getItem('role') != "Student"  ){
      this.toastr.error('Your account aren\'t Student','Course Notification')
    }else{
      const student = localStorage.getItem('userid')
      axios.get('http://127.0.0.1:8000/user/'+student+'/course/'+course).then(res=>{
        console.log(res.data);
        if( res.status == 200 ){
          this.toastr.success('Successfull Enrollement with this course','Course Notification')
        }else{
          this.toastr.error(res.data.message,'Course Notification')
        }
      }).catch(err=>{
        this.toastr.error(err,'Course Notification')
        //console.log(err);
      })
    }
    
  }

}
