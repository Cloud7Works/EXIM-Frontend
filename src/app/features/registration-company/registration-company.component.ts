import { RegistrationStep } from './../../models/registration-steps';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { StepStatus } from './../../models/step-status';
import { Component, OnInit } from '@angular/core';
import { Source, Status } from '../../models/api.model';
import { Path } from '../../models/url.path';

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
    this.form.get('country').valueChanges.subscribe(data=>{
      this.countries.map(m=>{
        m.selected=false;
        if(m.name==data)m.selected=true;
      });
    });

    if(this.countries.length==0) this.service.invokeApi(Source.Coutries);           
  }

  get countries(){
    return this.service.retrieve(Source.Coutries).data;
  }

  get states(){
    return this.service.retrieve(Source.States).data;
  }

  get country(){
    return this.form.get('country').value;
  }

  next(){      
    this.step={name:RegistrationStep.Step2,status:true};    
    this.router.navigate([Path.RegistrationUser]);     
  }

}
