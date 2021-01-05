import { map, mergeMap } from 'rxjs/operators';
import { APIBackendService } from './api-backend.service';
import { Injectable } from "@angular/core";
import { NotificationService } from './notification.service';
import { Progress, Source, Status } from '../models/api.model';
import { CompanyResponse } from '../models/company.response';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { hasLowerCaseValidatorFn, hasNumericValidatorFn, hasSpecialCharValidatorFn, hasUpperCaseValidatorFn, passwordValidatorFn, userIdPasswordValidatorFn, whiteSpaceValidatorFn } from '../features/validators/form.validators';
import { UserResponse } from '../models/user.response';
const status = new Status(false,false,"",Progress.Idle);
@Injectable({
    providedIn:'root'
})
export class DataService{
    companyForm = new FormGroup({    
        companyName : new FormControl('',Validators.required),
        addressLine1 : new FormControl(''),
        addressLine2 : new FormControl(''),
        city : new FormControl(''),
        state : new FormControl(''),
        zipCode : new FormControl(''),
        country : new FormControl('',Validators.required),
        naicsCode : new FormControl('',Validators.required),
        dunsNumber : new FormControl('',Validators.required)
      });

    userForm = new FormGroup({        
        firstName : new FormControl('',Validators.required),
        lastName : new FormControl('',Validators.required),
        title : new FormControl(''),
        phoneNumber : new FormControl('',Validators.required),
        email: new FormControl('',[Validators.required, Validators.email])
      });

      userAccountForm = new FormGroup({        
        userId : new FormControl('',Validators.required),
        password : new FormControl('',[
            passwordValidatorFn('rePassword'),
            Validators.required,
            Validators.minLength(8),
            hasUpperCaseValidatorFn(),
            hasLowerCaseValidatorFn(),
            hasNumericValidatorFn(),
            hasSpecialCharValidatorFn(),
            userIdPasswordValidatorFn('userId'),whiteSpaceValidatorFn()]),
        rePassword : new FormControl('',[ 
            passwordValidatorFn('password') ,
            Validators.required,
            Validators.minLength(8),
            hasUpperCaseValidatorFn(),
            hasLowerCaseValidatorFn(),
            hasNumericValidatorFn(),
            hasSpecialCharValidatorFn(),
            userIdPasswordValidatorFn('userId'),whiteSpaceValidatorFn()]),
        challengeQuestion : new FormControl('',Validators.required),
        challengeResponse: new FormControl('',Validators.required)
      });


    constructor(public backend : APIBackendService, public notification : NotificationService ){        
        this.updateStore();                
    }    


    private dataStore = [
        {
            source: Source.CompanyCreation,
            data : [],
            status :status
        }, {
            source: Source.UserCreation,
            data : [],
            status :status
        }, {
            source: Source.UserAccountCreation,
            data : [],
            status :status
        }, {
            source: Source.Coutries,
            data : [],
            status :status
        }, {
            source: Source.States,
            data : [],
            status :status
        }
    ];

    private readonly _progress = this.notification.notify.pipe(map(d=>{
        return { source : d.source , status : d.status, success: d.status.isCompleted && !d.status.isError}
    }));
 
    retrieve(source : Source){
        return this.dataStore.find(f=>f.source==source);
    }

    updateStore(){               
        this.notification.notify.subscribe(g=>{
            var index = this.dataStore.findIndex(f=>f.source==g.source);
            this.dataStore[index].status = g.status;  
            if(g.status.isCompleted && !g.status.isError){                    
                this.dataStore[index].data =  
                Array.isArray(g.result)? [...g.result] : 
                        [...this.retrieve(g.source).data,g.result];                                  
            }                           
        });
    }

    submit(){  
        this.backend.createCompany(this.companyForm.value).pipe(
            mergeMap((data: CompanyResponse)=> this.backend.createUser(data.companyId,this.userForm.value)),
            mergeMap((data : UserResponse)=>this.backend.createUserAccount(data.userId,this.userAccountForm.value))).subscribe();
    }

    invokeApi(source : Source){
        switch (source) {           
            case Source.Coutries:
                this.backend.countries().subscribe();
                break;          
            default:
                break;
        }
    }

    get progress(){
        return this._progress;
    }
  
    
}