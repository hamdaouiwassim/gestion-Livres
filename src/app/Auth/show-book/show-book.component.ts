import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent implements OnInit {
  constructor(private router : Router,private route : ActivatedRoute,private modalService: NgbModal,private toastr: ToastrService){}
  token = null
  comments : any;
  idbook = null;
  book : any;
  users : any;
  userId = localStorage.getItem('userid')
  UpdatedComment = {
    idcomment : '',
    content : '' 
  }
  ngOnInit(): void {
      this.idbook = this.route.snapshot.params.id;
      this.token = localStorage.getItem('token')
      this.getBook()
      this.getBookComments()
      this.getUsers()
  }
  getBook(){
    axios.get('http://127.0.0.1:8000/api/book/'+this.idbook+'/show').then(res=>{
          this.book = res.data;
    }).catch(err=>{

    })

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
  getBookComments(){
    axios.get('http://127.0.0.1:8000/api/book/'+this.idbook+'/comments',{ headers: {"Authorization" : `Bearer ${this.token}`}}).then(res=>{
      this.comments = res.data;
      console.log(this.comments)
    }).catch(err=>{

    })
  }

  deleteComment(id){
    if( confirm('Voulez-vous vraiment supprimer cette commentaire?')){
      axios.get('http://127.0.0.1:8000/api/commentaire/'+id+'/delete',{ headers: {"Authorization" : `Bearer ${this.token}`}}).then(res=>{
        //this.comments = res.data;
        //console.log(this.comments)
        this.toastr.success('Commentaire supprimer ...','Notification')
        this.getBookComments()
      }).catch(err=>{
  
      })
  
    }
    
  }
  AddComment(f:NgForm){
    const data ={
      book : this.idbook,
      content : f.controls.content.value
    }
    axios.post('http://127.0.0.1:8000/api/comment/add',data,{ headers: {"Authorization" : `Bearer ${this.token}`}}).then(res=>{
      //.comments = res.data;
      this.toastr.success('Commentaire Ajouter ...','Notification Administrateur')
      this.getBookComments()
      console.log(this.comments)
    }).catch(err=>{
      this.toastr.error('Probleme lors de l\'ajout de cette commentaire...','Notification')
    })

  }

  openEdit(content,c){
    this.UpdatedComment.idcomment = c.id
    this.UpdatedComment.content = c.content

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });

  }
  UpdateComment(f:NgForm){
    console.log(f.value)
    const data = {
      idcomment : this.UpdatedComment.idcomment,
      content: f.controls.content.value
    }
    axios.post('http://127.0.0.1:8000/api/comment/update',data,{ headers: {"Authorization" : `Bearer ${this.token}`}}).then(res=>{
      //.comments = res.data;
      this.modalService.dismissAll()
      this.toastr.success('Commentaire Modifier ...','Notification')
      this.getBookComments()
      console.log(this.comments)
    }).catch(err=>{
      this.toastr.error('Probleme lors de l\'ajout de cette commentaire...','Notification')
    })

  }
}