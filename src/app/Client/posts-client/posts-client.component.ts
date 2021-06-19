import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts-client',
  templateUrl: './posts-client.component.html',
  styleUrls: ['./posts-client.component.css']
})
export class PostsClientComponent implements OnInit {

  posts :any;
  token  = null
  //formateur = localStorage.getItem('userid')
  UpdatedPost = {
    id : '',
    title : '',
    description :''
  }
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
    axios.get('http://127.0.0.1:8000/api/my/posts',{ headers: {"Authorization" : `Bearer ${this.token}`}}).then(res=>{
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
  openEdit(content,p) {
   this.UpdatedPost.id = p.id
   this.UpdatedPost.title = p.title
   this.UpdatedPost.description = p.description
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  updatePost(f : NgForm){
    console.log(f.value)
    const data = {
      idpost : this.UpdatedPost.id,
      title : f.controls.title.value,
      description : f.controls.description.value 
    }
    axios.post('http://127.0.0.1:8000/api/post/update',data,{ headers: {"Authorization" : `Bearer ${this.token}`}}).then(res=>{
      this.toastr.success('Publication mis a jour ...!','Notification')
      this.modalService.dismissAll()
      this.getPosts()        //this.getAllBooks()
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })
 
    

  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

}
