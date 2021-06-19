import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-book-admin',
  templateUrl: './single-book-admin.component.html',
  styleUrls: ['./single-book-admin.component.css']
})
export class SingleBookAdminComponent implements OnInit {
  token  =  null
  
  constructor(private router:Router,private route:ActivatedRoute,private toastr: ToastrService) { }
  comments : any;
  idbook = null;
  book : any;
  users : any;
  ngOnInit(): void {
      this.idbook = this.route.snapshot.params.id;
      this.token = localStorage.getItem('token')
      this.getBook()
      this.getBookComments()
      this.getUsers()
  }
  getBook(){
    axios.get('http://127.0.0.1:8000/api/book/'+this.idbook+'/show',{ headers: {"Authorization" : `Bearer ${this.token}`}}).then(res=>{
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
        this.toastr.success('Commentaire supprimer ...','Notification Administrateur')
        this.getBookComments()
      }).catch(err=>{
  
      })
  
    }
    
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }

}
