import { RegistrationStep } from './../../models/registration-steps';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { StepStatus } from './../../models/step-status';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-company',
  templateUrl: './registration-company.component.html',
  styleUrls: ['./registration-company.component.scss']
})
export class RegistrationCompanyComponent implements OnInit {
  form = this.service.companyForm;
  constructor(private router : Router, private service: DataService) { }  

  step : StepStatus = {name:RegistrationStep.Step1,status:true};
  ngOnInit(): void {       
  }

  next(){
    this.step={name:RegistrationStep.Step2,status:true};
    this.router.navigate(['registration-user']);
    this.service.companyForm = this.form;    
    // this.service.backend.createCompany(null).subscribe(data=>console.log(data));
  }



}
