import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    if ( localStorage.getItem('token') != undefined ){
      if( localStorage.getItem('role') == "admin" ){
        this.router.navigate(['/admin/profile'])
      }else{
        this.router.navigate(['/client/profile'])
      }
     
    }
  
  }
  addUser(f : NgForm){

    console.log(f.value);
    axios.post('http://127.0.0.1:8000/api/auth/register',f.value).then(res=>{
      //console.log(res.data.message)
    if(res.status == 200 ){
      this.toastr.success('Compte creer avec succes','Notification')
      f.resetForm()
    }else{
      this.toastr.success('Verifier vos cordonnes','Notification')
    }
      
          
    }).catch(err=>{
          console.log(err)
          this.toastr.error(err,'Notification')
    })
  }

}
