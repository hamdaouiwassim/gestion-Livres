import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-publications-admin',
  templateUrl: './publications-admin.component.html',
  styleUrls: ['./publications-admin.component.css']
})
export class PublicationsAdminComponent implements OnInit {
  posts :any;
  token  = null
  //formateur = localStorage.getItem('userid')
  
  constructor(private router : Router,private modalService: NgbModal,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.getPosts()
    console.log(localStorage.getItem('token'))
    //this.token = localStorage.getItem('token')
    if ( localStorage.getItem('token') == undefined ){
      this.router.navigate(['/login'])

    }
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


  deletePost(id){
    if(confirm('Voulez-vous vraiment suppimer cette publication?')){
      axios.get('http://127.0.0.1:8000/api/post/'+id+'/delete',{ headers: {"Authorization" : `Bearer ${this.token}`}}).then(res=>{
        this.toastr.success('Publication supprimer avec succes ...!','Notification')
    this.getPosts()        //this.getAllBooks()
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
