import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
token = null
  constructor(private router : Router,private modalService: NgbModal,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    //this.getAllBooks()
    console.log(localStorage.getItem('token'))
    
    if ( localStorage.getItem('token') == undefined ){
      this.router.navigate(['/login'])

    }
    if (localStorage.getItem('role') == "admin"){
      this.router.navigate(['/home'])
      this.toastr.error('Profile Administrateur ouverte','Notification')

    }
  }

  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }

  AddPost( f : NgForm){
    console.log(f.value);
    //console.log(this.selectedFile);
    const data = new FormData();
    
    data.append('title',f.controls.title.value)
    data.append('description',f.controls.description.value)
   
    console.log(data)
    axios.post('http://127.0.0.1:8000/api/post/add',data,{ headers: {"Authorization" : `Bearer ${this.token}`}} ).then(res=>{
      this.toastr.success('Publication Ajouter avec succes ...!','Notification')
      f.resetForm()
      this.modalService.dismissAll()
      //this.getAllBooks()
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
