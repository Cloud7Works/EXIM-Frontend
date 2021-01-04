import { RegistrationUserAccountComponent } from './features/registration-user-account/registration-user-account.component';
import { PrivacyPolicyComponent } from './features/privacy-policy/privacy-policy.component';
import { LoginComponent } from './features/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationCheckpointComponent } from './features/registration-checkpoint/registration-checkpoint.component';
import { RegistrationCompanyComponent } from './features/registration-company/registration-company.component';
import { RegistrationUserComponent } from './features/registration-user/registration-user.component';
import { RegistrationConfirmationComponent } from './features/registration-confirmation/registration-confirmation.component';
import { CanProceedRegistration } from './services/registration.guard';
import { Path } from './models/url.path';



const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:Path.Home,component:LoginComponent},
  {path:Path.RegistrationPrivacy,component:PrivacyPolicyComponent},
  {path:Path.RegistrationCheckpoint,component:RegistrationCheckpointComponent},
  {path:Path.RegistrationCompany,component:RegistrationCompanyComponent},
  {path:Path.RegistrationUser,component:RegistrationUserComponent, canActivate:[CanProceedRegistration]},
  {path:Path.RegistrationUserAccount,component:RegistrationUserAccountComponent, canActivate:[CanProceedRegistration]},
  {path:Path.RegistrationConfirmation,component:RegistrationConfirmationComponent, canActivate:[CanProceedRegistration]}]  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
