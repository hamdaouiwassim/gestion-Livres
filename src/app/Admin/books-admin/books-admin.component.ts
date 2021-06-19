import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books-admin',
  templateUrl: './books-admin.component.html',
  styleUrls: ['./books-admin.component.css']
})
export class BooksAdminComponent implements OnInit {

  books :any;
  token  =  null
  //formateur = localStorage.getItem('userid')
  selectedCover = null
  selectedPdf = null
  UpdatedLivre = {
    id : '',
    name :'',
    edition : '',
    langue : '',
    type :'',
    description : '',
    cover : '',
    pdf : ''
  }
  constructor(private router : Router,private modalService: NgbModal,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.getAllBooks()
    console.log(localStorage.getItem('token'))
    
    if ( localStorage.getItem('token') == undefined ){
      this.router.navigate(['/login'])

    }
  }
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
  getAllBooks(){
   //const id = localStorage.getItem('userid')
    axios.get('http://127.0.0.1:8000/api/books/pdf',{ headers: {"Authorization" : `Bearer ${this.token}`}} ).then(res=>{
      this.books = res.data;
    }).catch(err=>{
      console.log(err);
    })

  }
  AddBook( f : NgForm){
    console.log(f.value);
    //console.log(this.selectedFile);
    const data = new FormData();
    data.append('addType','pdf')
    data.append('name',f.controls.name.value)
    data.append('edition',f.controls.edition.value)
    data.append('langue',f.controls.langue.value)
    data.append('type',f.controls.type.value)
    data.append('description',f.controls.description.value)
    data.append('cover',this.selectedCover)
    data.append('pdf',this.selectedPdf)
    console.log(data)
    axios.post('http://127.0.0.1:8000/api/book/add',data,{ headers: {"Authorization" : `Bearer ${this.token}`}} ).then(res=>{
      this.toastr.success('Livre Ajouter avec succes ...!','Notification Administrateur')
      f.resetForm()
      this.modalService.dismissAll()
      this.getAllBooks()
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })

  }

 
  onSelectCover(event){
    console.log(event);
    this.selectedCover = event.target.files[0];
  }
  onSelectPDF(event){
    console.log(event);
    this.selectedPdf = event.target.files[0];
  }
  deleteBook(id){
    if(confirm('Voulez-vous vraiment suppimer cette livre?')){
      axios.get('http://127.0.0.1:8000/api/book/'+id+'/delete',{ headers: {"Authorization" : `Bearer ${this.token}`}}).then(res=>{
        this.toastr.success('Livre supprimer avec succes ...!','Notification Administrateur')
    
        this.getAllBooks()
        console.log(res.data)
      }).catch(err=>{
        console.log(err)
      })
    }

  }
  openEdit(content,l){
    this.UpdatedLivre.id = l.id
    this.UpdatedLivre.name = l.name
    this.UpdatedLivre.description = l.description
    this.UpdatedLivre.type = l.type
    this.UpdatedLivre.langue = l.langue
    this.UpdatedLivre.edition = l.edition


 this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  UpdateBook(f : NgForm){
    const data = new FormData();
    data.append('addType','pdf')
    data.append('id',this.UpdatedLivre.id)
    data.append('name',f.controls.name.value)
    data.append('edition',f.controls.edition.value)
    data.append('langue',f.controls.langue.value)
    data.append('type',f.controls.type.value)
    data.append('description',f.controls.description.value)
    data.append('cover',this.selectedCover)
    data.append('pdf',this.selectedPdf)
    console.log(data)
    axios.post('http://127.0.0.1:8000/api/book/update',data,{ headers: {"Authorization" : `Bearer ${this.token}`}}).then(res=>{
      this.toastr.success('Livre mis a jour ...!','Notification Administrateur')
      this.modalService.dismissAll()
      this.getAllBooks()
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
