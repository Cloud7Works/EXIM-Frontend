import { Path } from './../../models/url.path';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  isClick = false;
  login(){
    this.isClick=!this.isClick;
  }
  nav(){    
    this.router.navigate([Path.RegistrationPrivacy]);
  }
}
