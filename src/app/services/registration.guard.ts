import { DataService } from './data.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Path } from '../models/url.path';


@Injectable()
export class CanProceedRegistration implements CanActivate {
  constructor(private router : Router, private service : DataService) {}

  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
  {  
      var shouldActivate = true;
      switch (state.url.replace('/','')) {
          case Path.RegistrationCompany:
              
            break;    
          case Path.RegistrationUser:
            shouldActivate = this.service.companyForm.valid;        
            break;  
          case Path.RegistrationUserAccount:
            shouldActivate = this.service.userForm.valid;        
            break;  
        case Path.RegistrationConfirmation:            
            shouldActivate =this.service.companyForm.valid && 
                            this.service.userForm.valid && 
                            this.service.userAccountForm.valid;        
            break;  
          default:
            break;
      } 
    if(!shouldActivate)
    {
        this.router.navigate(['/home']);
    }  
    return shouldActivate;
  }
}