import { DataService } from './../../services/data.service';
import { Path } from './../../models/url.path';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'registration-confirmation',
  templateUrl: './registration-confirmation.component.html',
  styleUrls: ['./registration-confirmation.component.scss']
})
export class RegistrationConfirmationComponent implements OnInit {

  constructor(private router : Router,private service: DataService) { }

  ngOnInit(): void {
  }

  get companyValue(){
      return this.service.companyForm.value;
  }

  get userValue(){
    return this.service.userForm.value;
  }
  get userAccountValue(){
    return this.service.userAccountForm.value;
  }

  userCtrlValue(name :string){
    return this.service.userForm.get(name).value;
  }

  userAcctCtrlValue(name :string){
    return this.service.userAccountForm.get(name).value;
  }

  login(){    
    this.router.navigate([Path.Home]);
    this.service.companyForm.reset();
    this.service.userForm.reset();
    this.service.userAccountForm.reset();
  }
}
