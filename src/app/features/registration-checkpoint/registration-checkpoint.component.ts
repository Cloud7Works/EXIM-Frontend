import { Path } from './../../models/url.path';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-checkpoint',
  templateUrl: './registration-checkpoint.component.html',
  styleUrls: ['./registration-checkpoint.component.scss']
})
export class RegistrationCheckpointComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  nav(hasExim?:boolean){
    if(hasExim){      
      this.router.navigate([Path.Home]);
    }else{      
      this.router.navigate([Path.RegistrationCompany]);
    }    
  }

}
