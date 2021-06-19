import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  constructor(private router : Router,private modalService: NgbModal,private toastr: ToastrService) {}
  connectedUser = {
    email : '' ,
    nom : '',
    prenom : '',
    username : '',
    adresse : '',
    image : null

  }
  token = null 
  selectedFile = null
  
  open(content) {
   
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }
  ngOnInit(): void {
    this.refreshUserData()
    console.log(localStorage.getItem('token'))
    this.token = localStorage.getItem('token')
    if ( localStorage.getItem('token') == undefined ){
      this.router.navigate(['/login'])

    }
   
  }
  refreshUserData(){
    this.connectedUser.email = localStorage.getItem('email')
    this.connectedUser.username = localStorage.getItem('username')
    this.connectedUser.nom = localStorage.getItem('nom')
    this.connectedUser.prenom = localStorage.getItem('prenom')
    this.connectedUser.adresse = localStorage.getItem('adresse')
    this.connectedUser.image = localStorage.getItem('image')
  }
  updateUser(f:NgForm){
   const data = new FormData();
   data.append('nom',f.controls.nom.value)
   data.append('prenom',f.controls.prenom.value)
   data.append('adresse',f.controls.adresse.value)
   data.append('email',f.controls.email.value)
   data.append('name',f.controls.username.value)
   if ( this.selectedFile != null){
    data.append('avatar',this.selectedFile)
   }
  
console.log(this.selectedFile)
    axios.post('http://127.0.0.1:8000/api/user/update',data,{ headers: {"Authorization" : `Bearer ${this.token}`}} ).then(res=>{
      this.toastr.success('Profile mis a jour','Notification')
      localStorage.setItem('email',f.controls.email.value)
      localStorage.setItem('nom',f.controls.nom.value)
      localStorage.setItem('prenom',f.controls.prenom.value)
      localStorage.setItem('username',f.controls.username.value)
      localStorage.setItem('adresse',f.controls.adresse.value)
    
      localStorage.setItem('image',res.data.avatar)
      
      this.refreshUserData()
      f.resetForm()
      this.modalService.dismissAll()
    }).catch(err=>{

    })

  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  onSelectFile(event){
    console.log(event);
    this.selectedFile = event.target.files[0];

  }

  updatePassword(f : NgForm){
    console.log(f.value)
    axios.post('http://127.0.0.1:8000/api/user/pw/update',f.value,{ headers: {"Authorization" : `Bearer ${this.token}`}} ).then(res=>{
      this.toastr.success('Mot de passe mis a jour','Notification')
   
      
      this.refreshUserData()
      f.resetForm()
      this.modalService.dismissAll()
    }).catch(err=>{

    })

  }
}
