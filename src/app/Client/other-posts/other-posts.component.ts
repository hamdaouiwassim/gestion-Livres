import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-other-posts',
  templateUrl: './other-posts.component.html',
  styleUrls: ['./other-posts.component.css']
})
export class OtherPostsComponent implements OnInit {
users : any =[];
  posts :any;
  token  = null
  //formateur = localStorage.getItem('userid')
  
  constructor(private router : Router,private modalService: NgbModal,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.getPosts()
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
  getUserName(id){
    //console.log(id)
    var x : any;
    this.users.forEach(element => {
      if(element.id == id ){
        console.log(element.name)
        x = element.name
      }

    });
return x;
  }
  getPosts(){
    axios.get('http://127.0.0.1:8000/api/posts',{ headers: {"Authorization" : `Bearer ${this.token}`}}).then(res=>{
      this.posts = res.data;
    }).catch(err=>{

    })
  }

  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }



  

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

}
