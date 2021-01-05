import { Status } from './../../models/api.model';
import { Source } from 'src/app/models/api.model';
import { Path } from './../../models/url.path';
import { DataService } from './../../services/data.service';
import { RegistrationStep } from './../../models/registration-steps';
import { StepStatus } from './../../models/step-status';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.service.progress.subscribe(d=>this.navigate(d));
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

  navigate(d : {source: Source,status: Status,success: boolean}){
    if(d.source === Source.UserAccountCreation && d.success){      
      this.router.navigate(['registration-confirmation']);
    }
  }

  control(name:string){      
    return this.service.userAccountForm.get(name);
  }

  hasError(ctrlName : string, errorName:string){
    return this.control(ctrlName).getError(errorName);
  }

  nav(step:string){
    this.step={name:step,status:true};    
    this.router.navigate([Path.RegistrationUser]);
  }  

  get Step2(){
    return RegistrationStep.Step2;
  }

  submit(){    
    this.service.submit();
  }

}
