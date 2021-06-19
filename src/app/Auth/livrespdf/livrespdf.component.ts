import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-livrespdf',
  templateUrl: './livrespdf.component.html',
  styleUrls: ['./livrespdf.component.css']
})
export class LivrespdfComponent implements OnInit {
  books : any;
  constructor() { }

  ngOnInit(): void {
    this.getAllBooks()
  }
  getAllBooks(){
    //const id = localStorage.getItem('userid')
     axios.get('http://127.0.0.1:8000/api/books/pdf').then(res=>{
       this.books = res.data;
     }).catch(err=>{
       console.log(err);
     })
 
   }
   filtreBooks( f : NgForm){
    axios.post('http://127.0.0.1:8000/api/books/pdf/search',f.value).then(res=>{
      this.books = res.data;
    }).catch(err=>{
      console.log(err);
    })
   }

}