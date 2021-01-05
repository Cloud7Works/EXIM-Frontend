import { ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';




  export function hasUpperCaseValidatorFn() : ValidatorFn{
    return(control:AbstractControl):ValidationErrors | null =>{  
        var reg=new RegExp('[A-Z]');            
        if(!reg.test(control.value)){         
        return {'atleastOneUpperCaseRequired':true};
      }
      return null;
    }
  }

  export function hasLowerCaseValidatorFn() : ValidatorFn{
    return(control:AbstractControl):ValidationErrors | null =>{  
      var reg=new RegExp('[a-z]');            
      if(!reg.test(control.value)){     
        return {'atleastOneLowerCaseRequired':true};
      }
      return null;
    }
  }

  export function hasNumericValidatorFn() : ValidatorFn{
    return(control:AbstractControl):ValidationErrors | null =>{  
      var reg=new RegExp('[0-9]');            
      if(!reg.test(control.value)){        
        return {'atleastOneNumericRequired':true};
      }
      return null;
    }
  }

  export function hasSpecialCharValidatorFn() : ValidatorFn{
    return(control:AbstractControl):ValidationErrors | null =>{  
      var reg=new RegExp('[!@#$%^&*(),.?":{}|<>]');            
      if(!reg.test(control.value)){        
        return {'atleastOneSpecialCharRequired':true};
      }
      return null;
    }
  }


export function passwordValidatorFn(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent && !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value ? null : { 'passwordNotMatch': true };
    };
}

export function userIdPasswordValidatorFn(matchTo: string) : (AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent && !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value ? { 'sameUserIdAndPasswordNotAllowed': true } : null;
  };
}

export function minLength(len:number) : ValidatorFn{
  return(control:AbstractControl):ValidationErrors | null =>{  
    if((control.value as string).length<len){
      return {'atleastOneSpecialCharRequired':true};
    }
    return null;
  }
}

export function whiteSpaceValidatorFn() : ValidatorFn{
  return(control:AbstractControl):ValidationErrors | null =>{  
    if((control.value as string)?.includes(' ')){
      return {'whiteSpaceNotAllowed':true};
    }
    return null;
  }
}

  
  
  