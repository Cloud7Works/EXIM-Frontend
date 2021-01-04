import { DataService } from './../../services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationStep } from './../../models/registration-steps';
import { Router } from '@angular/router';
import { StepStatus } from './../../models/step-status';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'register-user',
  templateUrl: './registration-user.component.html',
  styleUrls: ['./registration-user.component.scss']
})
export class RegistrationUserComponent implements OnInit {
  step : StepStatus = {name:RegistrationStep.Step2,status:true};
  back = '<Back';
  next = 'Next>';
  constructor(private router : Router, private service : DataService) { }

  form=this.service.userForm;

  ngOnInit(): void {
    if(this.service.userForm){
      this.form.patchValue(this.service.userForm.value);
    }   
  }

  get Step1(){
    return RegistrationStep.Step1;
  }

  get Step3(){
    return RegistrationStep.Step3
  }
  
  nav(step:string){
    this.step={name:step,status:true};
    this.service.userForm = this.form;    
    if(step==RegistrationStep.Step1){
      this.router.navigate(['registration-company']);
    }else{
      this.router.navigate(['registration-user-account']);
    }
    
  }  

}
