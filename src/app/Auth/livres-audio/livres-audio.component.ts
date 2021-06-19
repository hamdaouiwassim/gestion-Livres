import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-livres-audio',
  templateUrl: './livres-audio.component.html',
  styleUrls: ['./livres-audio.component.css']
})
export class LivresAudioComponent implements OnInit {
books : any;
  constructor() { }

  ngOnInit(): void {
    this.getAllBooks()
  }
  getAllBooks(){
    //const id = localStorage.getItem('userid')
     axios.get('http://127.0.0.1:8000/api/books/audio').then(res=>{
       this.books = res.data;
     }).catch(err=>{
       console.log(err);
     })
 
   }
   filtreBooks( f : NgForm){
    axios.post('http://127.0.0.1:8000/api/books/audio/search',f.value).then(res=>{
      this.books = res.data;
    }).catch(err=>{
      console.log(err);
    })
   }

}
