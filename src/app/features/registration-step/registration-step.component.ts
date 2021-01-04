import { RegistrationStep } from './../../models/registration-steps';
import { DataService } from './../../services/data.service';
import { StepStatus } from './../../models/step-status';
import { ResizeService } from './../../services/resize.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'registration-step',
  templateUrl: './registration-step.component.html',
  styleUrls: ['./registration-step.component.scss']
})
export class RegistrationStepComponent implements OnInit {

  constructor(public resizeSvc: ResizeService , public service : DataService) { 
    this.resizeSvc.onResize$.subscribe(x => {
      this.size =x;           
     });
  }
  size : string = this.resizeSvc.currentSize;
  steps : StepStatus[]= [{name:RegistrationStep.Step1,status:false},
                         {name:RegistrationStep.Step2,status:false},
                         {name:RegistrationStep.Step3,status:false}]
  @Input() step : StepStatus;

  stepStatus(stepName : string){
    return this.steps.find(f=>f.name==stepName).status;
  }

  get Step1(){
    return RegistrationStep.Step1;
  }
  get Step2(){
    return RegistrationStep.Step2;
  }
  get Step3(){
    return RegistrationStep.Step3;
  }

  ngOnChanges(changes: SimpleChanges): void {    
    if(changes){
      this.steps.map(m=>{
        if(m.name==changes['step'].currentValue.name){
            m.status=changes['step'].currentValue.status;
        }else{
          m.status=false;
        }
      });
    }
  }
  ngOnInit(): void {
    
  }

}
