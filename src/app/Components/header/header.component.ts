import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.Authenticated()
  }

  Authenticated(){
    console.log(localStorage.getItem('token'))
    if ( localStorage.getItem('token') == undefined || localStorage.getItem('token') == null  ){
      return false;
      
    }else{
      return true;
    }

  }

}
