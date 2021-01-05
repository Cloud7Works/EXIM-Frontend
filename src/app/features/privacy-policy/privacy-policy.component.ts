import { Path } from './../../models/url.path';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }


  nav(agree?:boolean){
    if(agree){            
      this.router.navigate([Path.RegistrationCheckpoint]);
    }else{
      this.router.navigate([Path.Home]);
    }    
  }

}
