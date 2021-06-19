import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    if ( localStorage.getItem('token') != null ){
      if( localStorage.getItem('role') == "admin" ){
        this.router.navigate(['/admin/profile'])
      }else{
        this.router.navigate(['/client/profile'])
      }
     
    }
  
  
  }
  LoginUser( f : NgForm){
    axios.post('http://127.0.0.1:8000/api/auth/login',f.value).then(res=>{
      localStorage.setItem('token',res.data.access_token)
      localStorage.setItem('userid',res.data.user.id)
      localStorage.setItem('email',res.data.user.email)
      localStorage.setItem('role',res.data.user.role)
      localStorage.setItem('username',res.data.user.name)
      localStorage.setItem('nom',res.data.user.nom)
      localStorage.setItem('prenom',res.data.user.prenom)
      localStorage.setItem('adresse',res.data.user.adresse)
      localStorage.setItem('image',res.data.user.avatar)
      if( localStorage.getItem('role') == "admin" ){
        this.router.navigate(['/admin/profile'])
      }else if( localStorage.getItem('role') == "client" ){
        this.router.navigate(['/client/profile'])
      }

  
    }).catch(err=>{
this.toastr.error('Verifier vos cordonnes','Notification')
    })

  }

}
