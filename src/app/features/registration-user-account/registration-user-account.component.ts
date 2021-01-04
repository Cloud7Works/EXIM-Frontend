import { Validators } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { RegistrationStep } from './../../models/registration-steps';
import { StepStatus } from './../../models/step-status';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { hasLowerCaseValidatorFn, hasNumericValidatorFn, hasSpecialCharValidatorFn, hasUpperCaseValidatorFn, passwordValidatorFn } from '../validators/form.validators';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-registration-user-account',
  templateUrl: './registration-user-account.component.html',
  styleUrls: ['./registration-user-account.component.scss']
})
export class RegistrationUserAccountComponent implements OnInit {

  constructor(private router : Router,private service : DataService) { }
  step : StepStatus = {name:RegistrationStep.Step3,status:true};
  back = '<Back';
  next = 'Next>';
  form = this.service.userAccountForm;
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.control('password').valueChanges.pipe(debounceTime(400)).subscribe(data=>{     
      this.control('rePassword').updateValueAndValidity({onlySelf:true,emitEvent:true});      
    });
    this.control('rePassword').valueChanges.pipe(debounceTime(400)).subscribe(data=>{
      this.control('password').updateValueAndValidity({onlySelf:true,emitEvent:true});      
    });
  
  }

  control(name:string){      
    return this.service.userAccountForm.get(name);
  }

  hasError(ctrlName : string, errorName:string){
    return this.control(ctrlName).getError(errorName);
  }

  log(){
    console.log(this.service.userAccountForm);
    console.log(this.hasError('password','atleastOneLowerCaseRequired'))
  }

  nav(step:string){
    this.step={name:step,status:true};    
    this.router.navigate(['registration-user']);
  }  

  get Step2(){
    return RegistrationStep.Step2;
  }

  submit(){
    this.router.navigate(['registration-confirmation']);
  }

}
