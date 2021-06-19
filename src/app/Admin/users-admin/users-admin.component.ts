import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

 
  users :any;
  token  = null
  //formateur = localStorage.getItem('userid')
  
  constructor(private router : Router,private modalService: NgbModal,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.getUsers()
    console.log(localStorage.getItem('token'))
    //this.token = localStorage.getItem('token')
    if ( localStorage.getItem('token') == undefined ){
      this.router.navigate(['/login'])

    }
  }
  getUsers(){
    axios.get('http://127.0.0.1:8000/api/users',{ headers: {"Authorization" : `Bearer ${this.token}`}}).then(res=>{
      this.users = res.data;
    }).catch(err=>{

    })
  }

  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }


  deleteUser(id){
    if(confirm('Voulez-vous vraiment suppimer cette utilisateur?')){
      axios.get('http://127.0.0.1:8000/api/user/'+id+'/delete',{ headers: {"Authorization" : `Bearer ${this.token}`}}).then(res=>{
        this.toastr.success('Utilisateur supprimer avec succes ...!','Notification Administrateur')
    this.getUsers()
        //this.getAllBooks()
        console.log(res.data)
      }).catch(err=>{
        console.log(err)
      })
    }

  }

  

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

}
